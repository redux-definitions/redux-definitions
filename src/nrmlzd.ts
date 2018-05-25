import { isPlainObject, omit, union, without } from 'lodash'

export type Id = string
export type Ids = string[]

export interface Item {
  id: Id
}

export interface IData {
  [key: string]: Item
}

export interface INorm {
  ids: Ids,
  data: IData
}

export default {
  create: (): INorm => ({
    data: {},
    ids: [],
  }),
  fromArray: (array: Item[]) =>
    array.reduce(
      (acc: INorm, entity: Item) => ({
        data: {
          ...acc.data,
          [entity.id]: entity
        },
        ids: union(acc.ids, [entity.id]),
      }),
      {
        data: {},
        ids: [],
      }
    ),
  pickFrom: (norm: INorm, ids: Ids) => ({
    data: mapPickIds(ids, norm.data),
    ids,
  }),
  remove: (norm: INorm, entityIdOrIds: Id|Ids): INorm => ({
    data: omit(norm.data, entityIdOrIds) as IData,
    ids: without(norm.ids, entityIdOrIds) as Ids,
  }),
  toArray: (arg1: Ids|INorm, arg2?: IData) => {
    const { ids, data } = (arg2 ? { ids: arg1, data: arg2 } : arg1 as INorm)
    if (!ids || !data) {
      console.warn('Normalized.toArray: argument error') // tslint:disable-line
      return []
    }
    return (ids as Ids).map(id => data[id]) as Item[]
  },
  upsert: (norm: INorm, entityOrEntities: Item|Item[], { merge }: { merge?: boolean } = {}) => {
    const isSingle = isPlainObject(entityOrEntities)

    if (isSingle) {
      const entity = entityOrEntities as Item

      return {
        data: {
          ...norm.data,
          [entity.id]: merge ? mergeIntoExisting(norm, entity) : entity
        },
        ids: union(norm.ids, [entity.id]),
      }
    }

    const entities: Item[] = merge
      ? (entityOrEntities as Item[]).map((entity: Item) => mergeIntoExisting(norm, entity))
      : entityOrEntities as Item[]

    return {
      data: {
        ...norm.data,
        ...arrayToMap(entities)
      },
      ids: union(norm.ids, entities.map(({ id }) => id)),
    }
  },
}

const mergeIntoExisting = (norm: INorm, item: Item) =>
  Object.assign({}, norm.data[item.id] || {}, item)

const mapPickIds = (ids: Ids, map: IData) =>
  ids.reduce(
    (acc, id) => ({
      ...acc,
      [id]: map[id]
    }),
    {}
  )

const arrayToMap = (array: Item[]) =>
  array.reduce(
    (acc, entity) => ({
      ...acc,
      [entity.id]: entity
    }),
    {}
  )
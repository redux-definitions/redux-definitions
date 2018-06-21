import { isPlainObject, omit, union, without } from 'lodash'

export type Id = string
export type Ids = string[]

export interface IEntity {
  id: Id
}

export interface IEntityMap {
  [key: string]: IEntity
}

export interface INorm {
  ids: Ids,
  entities: IEntityMap
}

export default {
  create: (): INorm => ({
    entities: {},
    ids: [],
  }),
  fromArray: (array: IEntity[]) =>
    array.reduce(
      (acc: INorm, entity: IEntity) => ({
        entities: {
          ...acc.entities,
          [entity.id]: entity
        },
        ids: union(acc.ids, [entity.id]),
      }),
      {
        entities: {},
        ids: [],
      }
    ),
  pickFrom: (norm: INorm, ids: Ids) => ({
    entities: mapPickIds(ids, norm.entities),
    ids,
  }),
  remove: (norm: INorm, entityIdOrIds: Id|Ids): INorm => ({
    entities: omit(norm.entities, entityIdOrIds) as IEntityMap,
    ids: without(norm.ids, entityIdOrIds) as Ids,
  }),
  toArray: (arg1: Ids|INorm, arg2?: IEntityMap) => {
    const { ids, entities } = (arg2 ? { ids: arg1, entities: arg2 } : arg1 as INorm)
    if (!ids || !entities) {
      console.warn('Normalized.toArray: argument error') // tslint:disable-line
      return []
    }
    return (ids as Ids).map(id => entities[id]) as IEntity[]
  },
  upsert: (norm: INorm, entityOrEntities: IEntity|IEntity[], { merge }: { merge?: boolean } = {}) => {
    const isSingle = isPlainObject(entityOrEntities)

    if (isSingle) {
      const entity = entityOrEntities as IEntity

      return {
        entities: {
          ...norm.entities,
          [entity.id]: merge ? mergeIntoExisting(norm, entity) : entity
        },
        ids: union(norm.ids, [entity.id]),
      }
    }

    const entities: IEntity[] = merge
      ? (entityOrEntities as IEntity[]).map((entity: IEntity) => mergeIntoExisting(norm, entity))
      : entityOrEntities as IEntity[]

    return {
      entities: {
        ...norm.entities,
        ...arrayToMap(entities)
      },
      ids: union(norm.ids, entities.map(({ id }) => id)),
    }
  },
}

const mergeIntoExisting = (norm: INorm, item: IEntity) =>
  Object.assign({}, norm.entities[item.id] || {}, item)

const mapPickIds = (ids: Ids, map: IEntityMap) =>
  ids.reduce(
    (acc, id) => ({
      ...acc,
      [id]: map[id]
    }),
    {}
  )

const arrayToMap = (array: IEntity[]) =>
  array.reduce(
    (acc, entity) => ({
      ...acc,
      [entity.id]: entity
    }),
    {}
  )
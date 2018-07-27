import Normalized from '../../utils/nrmlzd'
import { clearAllReducers, Definitions } from '../../index'
import { makeStoreAndDefineState } from '../test-utils'

const { Collection } = Definitions

describe('collection', () => {
  beforeEach(() => {
    clearAllReducers()
  })


  it('basics', () => {
    const compiledDefinition = Definitions.Collection({})
    const modelDefinition = compiledDefinition.generate(['foo'], false)
    modelDefinition.selectors
  })

  it('state placement', () => {
    const { models, store } = makeStoreAndDefineState({
      space: {
        persons: Collection({})
      }
    })

    const { selectors } =  models.space

    expect(selectors.persons.all(store.getState())).toEqual([])
  })

  it('initialState', () => {
    const entity = { id: '1' }
    const { models, store } = makeStoreAndDefineState({
      space: {
        persons: Collection({
          initialState: [entity]
        })
      }
    })

    const { actions, selectors } = models.space

    expect(selectors.persons.all(store.getState())).toEqual([entity])
  })

  describe('actions', () => {
    it('api', () => {
      const { models } = makeStoreAndDefineState({
        space: {
          persons: Collection
        }
      })

      const { actions } = models.space

      expect(Object.keys(actions.persons)).toEqual([
        'create',
        'remove',
        'reset',
        'set',
        'update',
        'upsert',
      ])
    })

    describe('set', () => {
      it('valid', () => {
        const { models, store } = makeStoreAndDefineState({
          space: {
            persons: Collection
          }
        })

        const { actions, selectors } = models.space

        const collection = [{ id: '1', name: 'foo' }]
        store.dispatch(actions.persons.set(collection))

        expect(selectors.persons.get(store.getState())).toEqual(
          Normalized.fromArray(collection)
        )
      })

      it('invalid', () => {
        const { models, store } = makeStoreAndDefineState({
          space: {
            persons: Collection
          }
        })

        const { actions, selectors } = models.space

        const collection = [{ name: 'foo' }]
        expect(() => store.dispatch(actions.persons.set(collection))).toThrow()
      })
    })

    it('reset', () => {
      const { models, store } = makeStoreAndDefineState({
        space: {
          persons: Collection
        }
      })

      const { actions, selectors } = models.space

      const collection = [{ id: '1', name: 'foo' }]
      store.dispatch(actions.persons.set(collection))

      expect(selectors.persons.get(store.getState())).toEqual(
        Normalized.fromArray(collection)
      )

      store.dispatch(actions.persons.reset(1))

      expect(selectors.persons.all(store.getState())).toEqual([])
      expect(selectors.persons.ids(store.getState())).toEqual([])
    })

    describe('create', () => {
      it('valid', () => {
      const { models, store } = makeStoreAndDefineState({
        space: {
          persons: Collection
        }
      })

      const { actions, selectors } = models.space

        const entity1 = { id: '1', name: 'foo' }
        const entity2 = { id: '2', name: 'bar' }
        const collection = [entity1]

        store.dispatch(actions.persons.set(collection))

        expect(selectors.persons.get(store.getState())).toEqual(
          Normalized.fromArray(collection)
        )

        store.dispatch(actions.persons.create(entity2))

        expect(selectors.persons.all(store.getState())).toEqual(collection.concat(entity2))
        expect(selectors.persons.ids(store.getState())).toEqual([entity1.id, entity2.id])
      })

      it('invalid', () => {
        const { models, store } = makeStoreAndDefineState({
          space: {
            persons: Collection
          }
        })

        const { actions, selectors } = models.space

        const entity = { name: 'foo' }
        expect(() => store.dispatch(actions.persons.create(entity))).toThrow()
      })
    })

    describe('upsert', () => {
      it('valid', () => {
        const { models, store } = makeStoreAndDefineState({
          space: {
            persons: Collection
          }
        })

        const { actions, selectors } = models.space

        const entity1 = { id: '1', name: 'foo' }
        const collection = [entity1]

        store.dispatch(actions.persons.set(collection))

        expect(selectors.persons.get(store.getState())).toEqual(
          Normalized.fromArray(collection)
        )

        const updatedEntity1 = { id: '1', name: 'bar' }
        store.dispatch(actions.persons.upsert(updatedEntity1))

        expect(selectors.persons.all(store.getState())).toEqual([updatedEntity1])
        expect(selectors.persons.ids(store.getState())).toEqual([entity1.id])
      })

      it('invalid', () => {
      const { models, store } = makeStoreAndDefineState({
        space: {
          persons: Collection
        }
      })

        const { actions, selectors } = models.space

        const entity = { name: 'foo' }

        expect(() => store.dispatch(actions.persons.upsert(entity))).toThrow()
      })
    })

    describe('update', () => {
      it('valid', () => {
        const { models, store } = makeStoreAndDefineState({
          space: {
            persons: Collection
          }
        })

        const { actions, selectors } = models.space

        const entity1 = { id: '1', name: 'foo' }
        const collection = [entity1]

        store.dispatch(actions.persons.set(collection))

        expect(selectors.persons.get(store.getState())).toEqual(
          Normalized.fromArray(collection)
        )

        const updatedEntity1 = { id: '1', name: 'bar' }
        store.dispatch(actions.persons.update(updatedEntity1))

        expect(selectors.persons.all(store.getState())).toEqual([entity1])
        expect(selectors.persons.ids(store.getState())).toEqual([entity1.id])
      })

      it('invalid', () => {
        const { models, store } = makeStoreAndDefineState({
          space: {
            persons: Collection
          }
        })

        const { actions, selectors } = models.space

        const entity = { name: 'foo' }

        expect(() => store.dispatch(actions.persons.update(entity))).toThrow()
      })

      it('doesn\'t exist', () => {
        const { models, store } = makeStoreAndDefineState({
          space: {
            persons: Collection
          }
        })

        const { actions, selectors } = models.space

        const entity = { id: '1', name: 'foo' }

        expect(selectors.persons.all(store.getState())).toEqual([])
        expect(selectors.persons.ids(store.getState())).toEqual([])
      })
    })

    it('remove', () => {
      const { models, store } = makeStoreAndDefineState({
        space: {
          persons: Collection
        }
      })

      const { actions, selectors } = models.space

      const entity1 = {
        id: '1', name: 'foo'
      }
      const entity2 = {
        id: '2', name: 'bar'
      }

      const collection = [entity1, entity2]

      store.dispatch(actions.persons.set(collection))

      expect(selectors.persons.get(store.getState())).toEqual(
        Normalized.fromArray(collection)
      )

      store.dispatch(actions.persons.remove(entity1.id))

      expect(selectors.persons.all(store.getState())).toEqual([entity2])
      expect(selectors.persons.ids(store.getState())).toEqual([entity2.id])
    })
  })

  describe('selectors', () => {
    it('api', () => {
      const { models, store } = makeStoreAndDefineState({
        space: {
          persons: Collection
        }
      })

      const { selectors } = models.space

      expect(Object.keys(selectors.persons)).toEqual([
        'find',
        'get',
        'ids',
        'all',
      ])
    })

    it('get', () => {
      const { models, store } = makeStoreAndDefineState({
        space: {
          persons: Collection
        }
      })

      const { actions, selectors } = models.space

      const collection = [{ id: '1', name: 'foo' }]
      store.dispatch(actions.persons.set(collection))

      expect(selectors.persons.get(store.getState())).toEqual(Normalized.fromArray(collection))
    })

    it('ids', () => {
      const { models, store } = makeStoreAndDefineState({
        space: {
          persons: Collection
        }
      })

      const { actions, selectors } = models.space

      const entity1 = { id: '1', name: 'foo' }
      const collection = [entity1]
      store.dispatch(actions.persons.set(collection))

      expect(selectors.persons.ids(store.getState())).toEqual([entity1.id])
    })

    it('all', () => {
      const { models, store } = makeStoreAndDefineState({
        space: {
          persons: Collection
        }
      })

      const { actions, selectors } = models.space

      const entity1 = { id: '1', name: 'foo' }
      const collection = [entity1]
      store.dispatch(actions.persons.set(collection))

      expect(selectors.persons.all(store.getState())).toEqual(collection)
    })

    describe('find', () => {
      it('exists', () => {
        const { models, store } = makeStoreAndDefineState({
          space: {
            persons: Collection
          }
        })

        const { actions, selectors } = models.space

        const entity1 = { id: '1', name: 'foo' }
        const collection = [entity1]
        store.dispatch(actions.persons.set(collection))

        expect(selectors.persons.find(store.getState(), { id: entity1.id })).toEqual(entity1)
      })

      it('does not exist', () => {
        const { models, store } = makeStoreAndDefineState({
          space: {
            persons: Collection
          }
        })

        const { actions, selectors } = models.space

        const entity1 = { id: '1', name: 'foo' }
        const collection = [entity1]
        store.dispatch(actions.persons.set(collection))

        expect(selectors.persons.find(store.getState(), { id: '2' })).toEqual(undefined)
      })
    })
  })
})

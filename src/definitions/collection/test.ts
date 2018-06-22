import Normalized from '../../utils/nrmlzd'
import { clearAllReducers, Definitions } from '../../index'
import { makeStoreAndDefineState } from '../test-utils'

const { Collection } = Definitions

describe('collection', () => {
  beforeEach(() => {
    clearAllReducers()
  })

  it('state placement', () => {
    const { models, store } = makeStoreAndDefineState({
      space: Collection
    })

    const { selectors } =  models.space

    expect(selectors.all(store.getState())).toEqual([])
  })

  it('initialState', () => {
    const entity = { id: '1' }
    const { space, getState } = makeStoreAndDefineState({
      space: Collection({
        initialState: [entity]
      })
    })

    const { actions, selectors } = space

    expect(selectors.all(getState())).toEqual([entity])
  })

  describe('actions', () => {
    it('api', () => {
      const { space } = makeStoreAndDefineState({
        space: Collection
      })

      const { actions } = space

      expect(Object.keys(actions)).toEqual([
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
        const { space, dispatch, getState } = makeStoreAndDefineState({
          space: Collection
        })

        const { actions, selectors } = space

        const collection = [{ id: '1', name: 'foo' }]
        dispatch(actions.set(collection))

        expect(selectors.get(getState())).toEqual(
          Normalized.fromArray(collection)
        )
      })

      it('invalid', () => {
        const { space, dispatch, getState } = makeStoreAndDefineState({
          space: Collection
        })

        const { actions, selectors } = space

        const collection = [{ name: 'foo' }]
        expect(() => dispatch(actions.set(collection))).toThrow()
      })
    })

    it.only('reset', () => {
      const { space, dispatch, getState } = makeStoreAndDefineState({
        space: Collection
      })

      const { actions, selectors, model } = space

      const collection = [{ id: '1', name: 'foo' }]
      dispatch(actions.set(collection))

      expect(selectors.get(getState())).toEqual(
        Normalized.fromArray(collection)
      )

      dispatch(actions.reset())

      expect(selectors.all(getState())).toEqual([])
      expect(selectors.ids(getState())).toEqual([])
    })

    describe('create', () => {
      it('valid', () => {
        const { space, dispatch, getState } = makeStoreAndDefineState({
          space: Collection
        })

        const { actions, selectors } = space

        const entity1 = { id: '1', name: 'foo' }
        const entity2 = { id: '2', name: 'bar' }
        const collection = [entity1]

        dispatch(actions.set(collection))

        expect(selectors.get(getState())).toEqual(
          Normalized.fromArray(collection)
        )

        dispatch(actions.create(entity2))

        expect(selectors.all(getState())).toEqual(collection.concat(entity2))
        expect(selectors.ids(getState())).toEqual([entity1.id, entity2.id])
      })

      it('invalid', () => {
        const { space, dispatch, getState } = makeStoreAndDefineState({
          space: Collection
        })

        const { actions, selectors } = space

        const entity = { name: 'foo' }
        expect(() => dispatch(actions.create(entity))).toThrow()
      })
    })

    describe('upsert', () => {
      it('valid', () => {
        const { space, dispatch, getState } = makeStoreAndDefineState({
          space: Collection
        })

        const { actions, selectors } = space

        const entity1 = { id: '1', name: 'foo' }
        const collection = [entity1]

        dispatch(actions.set(collection))

        expect(selectors.get(getState())).toEqual(
          Normalized.fromArray(collection)
        )

        const updatedEntity1 = { id: '1', name: 'bar' }
        dispatch(actions.upsert(updatedEntity1))

        expect(selectors.all(getState())).toEqual([updatedEntity1])
        expect(selectors.ids(getState())).toEqual([entity1.id])
      })

      it('invalid', () => {
        const { space, dispatch, getState } = makeStoreAndDefineState({
          space: Collection
        })

        const { actions, selectors } = space

        const entity = { name: 'foo' }

        expect(() => dispatch(actions.upsert(entity))).toThrow()
      })
    })

    describe('update', () => {
      it('valid', () => {
        const { space, dispatch, getState } = makeStoreAndDefineState({
          space: Collection
        })

        const { actions, selectors } = space

        const entity1 = { id: '1', name: 'foo' }
        const collection = [entity1]

        dispatch(actions.set(collection))

        expect(selectors.get(getState())).toEqual(
          Normalized.fromArray(collection)
        )

        const updatedEntity1 = { id: '1', name: 'bar' }
        dispatch(actions.update(updatedEntity1))

        expect(selectors.all(getState())).toEqual([entity1])
        expect(selectors.ids(getState())).toEqual([entity1.id])
      })

      it('invalid', () => {
        const { space, dispatch, getState } = makeStoreAndDefineState({
          space: Collection
        })

        const { actions, selectors } = space

        const entity = { name: 'foo' }

        expect(() => dispatch(actions.update(entity))).toThrow()
      })

      it('doesn\'t exist', () => {
        const { space, dispatch, getState } = makeStoreAndDefineState({
          space: Collection
        })

        const { actions, selectors } = space

        const entity = { id: '1', name: 'foo' }

        expect(selectors.all(getState())).toEqual([])
        expect(selectors.ids(getState())).toEqual([])
      })
    })

    it('remove', () => {
      const { space, dispatch, getState } = makeStoreAndDefineState({
        space: Collection
      })

      const { actions, selectors } = space

      const entity1 = {
        id: '1', name: 'foo'
      }
      const entity2 = {
        id: '2', name: 'bar'
      }

      const collection = [entity1, entity2]

      dispatch(actions.set(collection))

      expect(selectors.get(getState())).toEqual(
        Normalized.fromArray(collection)
      )

      dispatch(actions.remove(entity1.id))

      expect(selectors.all(getState())).toEqual([entity2])
      expect(selectors.ids(getState())).toEqual([entity2.id])
    })
  })

  describe('selectors', () => {
    it('api', () => {
      const { space } = makeStoreAndDefineState({
        space: Collection
      })

      const { selectors } = space

      expect(Object.keys(selectors)).toEqual([
        'find',
        'get',
        'ids',
        'all',
      ])
    })

    it('get', () => {
      const { space, dispatch, getState } = makeStoreAndDefineState({
        space: Collection
      })

      const { actions, selectors } = space

      const collection = [{ id: '1', name: 'foo' }]
      dispatch(actions.set(collection))

      expect(selectors.get(getState())).toEqual(Normalized.fromArray(collection))
    })

    it('ids', () => {
      const { space, dispatch, getState } = makeStoreAndDefineState({
        space: Collection
      })

      const { actions, selectors } = space

      const entity1 = { id: '1', name: 'foo' }
      const collection = [entity1]
      dispatch(actions.set(collection))

      expect(selectors.ids(getState())).toEqual([entity1.id])
    })

    it('all', () => {
      const { space, dispatch, getState } = makeStoreAndDefineState({
        space: Collection
      })

      const { actions, selectors } = space

      const entity1 = { id: '1', name: 'foo' }
      const collection = [entity1]
      dispatch(actions.set(collection))

      expect(selectors.all(getState())).toEqual(collection)
    })

    describe('find', () => {
      it('exists', () => {
        const { space, dispatch, getState } = makeStoreAndDefineState({
          space: Collection
        })

        const { actions, selectors } = space

        const entity1 = { id: '1', name: 'foo' }
        const collection = [entity1]
        dispatch(actions.set(collection))

        expect(selectors.find(getState(), { id: entity1.id })).toEqual(entity1)
      })

      it('does not exist', () => {
        const { space, dispatch, getState } = makeStoreAndDefineState({
          space: Collection
        })

        const { actions, selectors } = space

        const entity1 = { id: '1', name: 'foo' }
        const collection = [entity1]
        dispatch(actions.set(collection))

        expect(selectors.find(getState(), { id: '2' })).toEqual(undefined)
      })
    })
  })

  it('nested', () => {
    const { space, dispatch, getState } = makeStoreAndDefineState({
      space: {
        foo: Collection
      }
    })

    const { actions, selectors } = space

    expect(selectors.foo.get(getState())).toEqual(Normalized.create())

    const entity1 = { id: '1', name: 'foo' }
    const collection = [entity1]
    dispatch(actions.foo.set(collection))

    expect(selectors.foo.get(getState())).toEqual(
      Normalized.fromArray(collection)
    )
  })

  it('double nested', () => {
    const { space, dispatch, getState } = makeStoreAndDefineState({
      space: {
        foo: {
          bar: Collection
        }
      }
    })

    const { actions, selectors } = space

    expect(selectors.foo.bar.all(getState())).toEqual([])

    const collection = [{ id: '1', name: 'foo' }]
    dispatch(actions.foo.bar.set(collection))

    expect(selectors.foo.bar.all(getState())).toEqual(collection)
  })
})

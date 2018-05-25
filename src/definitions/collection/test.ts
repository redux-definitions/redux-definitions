import Normalized from 'nrmlzd'
import { clearAllReducers, Definitions } from 'index'
import { makeStoreAndDefineState } from '../test-utils'

const { Collection } = Definitions

describe('collection', () => {
  beforeEach(() => {
    clearAllReducers()
  })

  it('state placement', () => {
    const { space, getState } = makeStoreAndDefineState({
      space: Collection
    })

    const { actions, selectors } = space

    expect(selectors.items(getState())).toEqual([])
  })

  it('initialState', () => {
    const item = { id: '1' }
    const { space, getState } = makeStoreAndDefineState({
      space: Collection({
        initialState: [item]
      })
    })

    const { actions, selectors } = space

    expect(selectors.items(getState())).toEqual([item])
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

      expect(selectors.items(getState())).toEqual([])
      expect(selectors.ids(getState())).toEqual([])
    })

    describe('create', () => {
      it('valid', () => {
        const { space, dispatch, getState } = makeStoreAndDefineState({
          space: Collection
        })

        const { actions, selectors } = space

        const item1 = { id: '1', name: 'foo' }
        const item2 = { id: '2', name: 'bar' }
        const collection = [item1]

        dispatch(actions.set(collection))

        expect(selectors.get(getState())).toEqual(
          Normalized.fromArray(collection)
        )

        dispatch(actions.create(item2))

        expect(selectors.items(getState())).toEqual(collection.concat(item2))
        expect(selectors.ids(getState())).toEqual([item1.id, item2.id])
      })

      it('invalid', () => {
        const { space, dispatch, getState } = makeStoreAndDefineState({
          space: Collection
        })

        const { actions, selectors } = space

        const item = { name: 'foo' }
        expect(() => dispatch(actions.create(item))).toThrow()
      })
    })

    describe('upsert', () => {
      it('valid', () => {
        const { space, dispatch, getState } = makeStoreAndDefineState({
          space: Collection
        })

        const { actions, selectors } = space

        const item1 = { id: '1', name: 'foo' }
        const collection = [item1]

        dispatch(actions.set(collection))

        expect(selectors.get(getState())).toEqual(
          Normalized.fromArray(collection)
        )

        const updatedItem1 = { id: '1', name: 'bar' }
        dispatch(actions.upsert(updatedItem1))

        expect(selectors.items(getState())).toEqual([updatedItem1])
        expect(selectors.ids(getState())).toEqual([item1.id])
      })

      it('invalid', () => {
        const { space, dispatch, getState } = makeStoreAndDefineState({
          space: Collection
        })

        const { actions, selectors } = space

        const item = { name: 'foo' }

        expect(() => dispatch(actions.upsert(item))).toThrow()
      })
    })

    describe('update', () => {
      it('valid', () => {
        const { space, dispatch, getState } = makeStoreAndDefineState({
          space: Collection
        })

        const { actions, selectors } = space

        const item1 = { id: '1', name: 'foo' }
        const collection = [item1]

        dispatch(actions.set(collection))

        expect(selectors.get(getState())).toEqual(
          Normalized.fromArray(collection)
        )

        const updatedItem1 = { id: '1', name: 'bar' }
        dispatch(actions.update(updatedItem1))

        expect(selectors.items(getState())).toEqual([item1])
        expect(selectors.ids(getState())).toEqual([item1.id])
      })

      it('invalid', () => {
        const { space, dispatch, getState } = makeStoreAndDefineState({
          space: Collection
        })

        const { actions, selectors } = space

        const item = { name: 'foo' }

        expect(() => dispatch(actions.update(item))).toThrow()
      })

      it('doesn\'t exist', () => {
        const { space, dispatch, getState } = makeStoreAndDefineState({
          space: Collection
        })

        const { actions, selectors } = space

        const item = { id: '1', name: 'foo' }

        expect(selectors.items(getState())).toEqual([])
        expect(selectors.ids(getState())).toEqual([])
      })
    })

    it('remove', () => {
      const { space, dispatch, getState } = makeStoreAndDefineState({
        space: Collection
      })

      const { actions, selectors } = space

      const item1 = {
        id: '1', name: 'foo'
      }
      const item2 = {
        id: '2', name: 'bar'
      }

      const collection = [item1, item2]

      dispatch(actions.set(collection))

      expect(selectors.get(getState())).toEqual(
        Normalized.fromArray(collection)
      )

      dispatch(actions.remove(item1.id))

      expect(selectors.items(getState())).toEqual([item2])
      expect(selectors.ids(getState())).toEqual([item2.id])
    })
  })

  describe('selectors', () => {
    it('api', () => {
      const { space } = makeStoreAndDefineState({
        space: Collection
      })

      const { selectors } = space

      expect(Object.keys(selectors)).toEqual([
        'byId',
        'get',
        'ids',
        'items',
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

      const item1 = { id: '1', name: 'foo' }
      const collection = [item1]
      dispatch(actions.set(collection))

      expect(selectors.ids(getState())).toEqual([item1.id])
    })

    it('items', () => {
      const { space, dispatch, getState } = makeStoreAndDefineState({
        space: Collection
      })

      const { actions, selectors } = space

      const item1 = { id: '1', name: 'foo' }
      const collection = [item1]
      dispatch(actions.set(collection))

      expect(selectors.items(getState())).toEqual(collection)
    })

    describe('byId', () => {
      it('exists', () => {
        const { space, dispatch, getState } = makeStoreAndDefineState({
          space: Collection
        })

        const { actions, selectors } = space

        const item1 = { id: '1', name: 'foo' }
        const collection = [item1]
        dispatch(actions.set(collection))

        expect(selectors.byId(getState(), { id: item1.id })).toEqual(item1)
      })

      it('does not exist', () => {
        const { space, dispatch, getState } = makeStoreAndDefineState({
          space: Collection
        })

        const { actions, selectors } = space

        const item1 = { id: '1', name: 'foo' }
        const collection = [item1]
        dispatch(actions.set(collection))

        expect(selectors.byId(getState(), { id: '2' })).toEqual(undefined)
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

    const item1 = { id: '1', name: 'foo' }
    const collection = [item1]
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

    expect(selectors.foo.bar.items(getState())).toEqual([])

    const collection = [{ id: '1', name: 'foo' }]
    dispatch(actions.foo.bar.set(collection))

    expect(selectors.foo.bar.items(getState())).toEqual(collection)
  })
})

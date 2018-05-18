import { expect } from 'chai'
import { createAction } from 'redux-actions'
import Normalized from 'nrmlzd'
import { defineState, clearAllState, StateTypes } from 'index'
import { makeStoreAndDefineState } from '../utils'

const { Collection } = StateTypes

describe('collection', () => {
  beforeEach(() => {
    clearAllState()
  })

  it('state placement', () => {
    const { space, getState } = makeStoreAndDefineState({
      space: Collection
    })

    const { actions, selectors } = space

    expect(getState().space).to.deep.equal(Normalized.create())
    expect(selectors.items(getState())).to.deep.equal([])
  })

  it('initialState', () => {
    const item = { id: '1' }
    const { space, getState } = makeStoreAndDefineState({
      space: Collection({
        initialState: [item]
      })
    })

    const { actions, selectors } = space

    expect(getState().space).to.deep.equal(Normalized.fromArray([item]))
    expect(selectors.items(getState())).to.deep.equal([item])
  })

  describe('actions', () => {
    it('api', () => {
      const { space } = makeStoreAndDefineState({
        space: Collection
      })

      const { actions } = space

      expect(Object.keys(actions)).to.deep.equal([
        'set',
        'reset',
        'create',
        'upsert',
        'remove',
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

        expect(selectors.get(getState())).to.deep.equal(
          Normalized.fromArray(collection)
        )
      })

      it('invalid', () => {
        const { space, dispatch, getState } = makeStoreAndDefineState({
          space: Collection
        })

        const { actions, selectors } = space

        const collection = [{ name: 'foo' }]
        expect(() => dispatch(actions.set(collection))).to.throw()
      })
    })

    it('reset', () => {
      const { space, dispatch, getState } = makeStoreAndDefineState({
        space: Collection
      })

      const { actions, selectors } = space

      const collection = [{ id: '1', name: 'foo' }]
      dispatch(actions.set(collection))

      expect(selectors.get(getState())).to.deep.equal(
        Normalized.fromArray(collection)
      )

      dispatch(actions.reset())

      expect(selectors.items(getState())).to.deep.equal([])
      expect(selectors.ids(getState())).to.deep.equal([])
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

        expect(selectors.get(getState())).to.deep.equal(
          Normalized.fromArray(collection)
        )

        dispatch(actions.create(item2))

        expect(selectors.items(getState())).to.deep.equal(collection.concat(item2))
        expect(selectors.ids(getState())).to.deep.equal([item1.id, item2.id])
      })

      it('invalid', () => {
        const { space, dispatch, getState } = makeStoreAndDefineState({
          space: Collection
        })

        const { actions, selectors } = space

        const item = { name: 'foo' }
        expect(() => dispatch(actions.create(item))).to.throw()
      })
    })

    describe('upsert', () => {
      it('upsert', () => {
        const { space, dispatch, getState } = makeStoreAndDefineState({
          space: Collection
        })

        const { actions, selectors } = space

        const item1 = { id: '1', name: 'foo' }
        const collection = [item1]

        dispatch(actions.set(collection))

        expect(selectors.get(getState())).to.deep.equal(
          Normalized.fromArray(collection)
        )

        const updatedItem1 = { id: '1', name: 'bar' }
        dispatch(actions.upsert(updatedItem1))

        expect(selectors.items(getState())).to.deep.equal([updatedItem1])
        expect(selectors.ids(getState())).to.deep.equal([item1.id])
      })

      it('invalid', () => {
        const { space, dispatch, getState } = makeStoreAndDefineState({
          space: Collection
        })

        const { actions, selectors } = space

        const item = { name: 'foo' }

        expect(() => dispatch(actions.upsert(item))).to.throw()
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

      expect(selectors.get(getState())).to.deep.equal(
        Normalized.fromArray(collection)
      )

      dispatch(actions.remove(item1.id))

      expect(selectors.items(getState())).to.deep.equal([item2])
      expect(selectors.ids(getState())).to.deep.equal([item2.id])
    })
  })

  describe('selectors', () => {
    it('api', () => {
      const { space } = makeStoreAndDefineState({
        space: Collection
      })

      const { selectors } = space

      expect(Object.keys(selectors)).to.deep.equal([
        'get',
        'items',
        'ids',
        'byId',
      ])
    })

    it('get', () => {
      const { space, dispatch, getState } = makeStoreAndDefineState({
        space: Collection
      })

      const { actions, selectors } = space

      const collection = [{ id: '1', name: 'foo' }]
      dispatch(actions.set(collection))

      expect(selectors.get(getState())).to.deep.equal(Normalized.fromArray(collection))
    })

    it('ids', () => {
      const { space, dispatch, getState } = makeStoreAndDefineState({
        space: Collection
      })

      const { actions, selectors } = space

      const item1 = { id: '1', name: 'foo' }
      const collection = [item1]
      dispatch(actions.set(collection))

      expect(selectors.ids(getState())).to.deep.equal([item1.id])
    })

    it('items', () => {
      const { space, dispatch, getState } = makeStoreAndDefineState({
        space: Collection
      })

      const { actions, selectors } = space

      const item1 = { id: '1', name: 'foo' }
      const collection = [item1]
      dispatch(actions.set(collection))

      expect(selectors.items(getState())).to.deep.equal(collection)
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

        expect(selectors.byId(getState(), { id: item1.id })).to.deep.equal(item1)
      })

      it('does not exist', () => {
        const { space, dispatch, getState } = makeStoreAndDefineState({
          space: Collection
        })

        const { actions, selectors } = space

        const item1 = { id: '1', name: 'foo' }
        const collection = [item1]
        dispatch(actions.set(collection))

        expect(selectors.byId(getState(), { id: '2' })).to.deep.equal(null)
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

    expect(selectors.foo.get(getState())).to.deep.equal(Normalized.create())

    const item1 = { id: '1', name: 'foo' }
    const collection = [item1]
    dispatch(actions.foo.set(collection))

    expect(selectors.foo.get(getState())).to.deep.equal(
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

    expect(selectors.foo.bar.items(getState())).to.deep.equal([])

    const collection = [{ id: '1', name: 'foo' }]
    dispatch(actions.foo.bar.set(collection))

    expect(selectors.foo.bar.items(getState())).to.deep.equal(collection)
  })
})

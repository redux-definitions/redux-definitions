import { expect } from 'chai'
import Normalized from 'nrmlzd'
import { defineState, clearAllState, StateDefinitions } from '../../../../src'
import { makeStoreAndDefineState } from '../utils'

const { Collection } = StateDefinitions

describe('definition - collection', () => {
  beforeEach(() => {
    clearAllState()
  })

  describe('flat', () => {
    it('state placement', () => {
      const { space, getState } = makeStoreAndDefineState({
        space: Collection
      })

      const { actions, selectors } = space

      expect(getState().space).to.deep.equal(Normalized.create())
      expect(selectors.items(getState())).to.deep.equal([])
    })

    it('receives action', () => {
      const { space, dispatch, getState } = makeStoreAndDefineState({
        space: Collection
      })

      const { actions, selectors } = space

      const collection = [{ id: '1', name: 'foo' }]
      dispatch(actions.set(collection))

      expect(selectors.get(getState())).to.deep.equal(
        Normalized.fromArray(collection)
      )
      expect(selectors.items(getState())).to.deep.equal(collection)
      expect(selectors.ids(getState())).to.deep.equal(['1'])
    })
  })

  describe('nested', () => {
    it('state placement', () => {
      const { space, dispatch, getState } = makeStoreAndDefineState({
        space: {
          foo: Collection
        }
      })

      expect(getState().space.foo).to.deep.equal(Normalized.create())
    })

    it('receives action', () => {
      const { space, dispatch, getState } = makeStoreAndDefineState({
        space: {
          foo: Collection
        }
      })

      const { actions, selectors } = space

      const collection = [{ id: '1', name: 'foo' }]
      dispatch(actions.foo.set(collection))

      expect(selectors.foo.get(getState())).to.deep.equal(
        Normalized.fromArray(collection)
      )
    })
  })

  describe('double nested', () => {
    it('state placement', () => {
      const { space, dispatch, getState } = makeStoreAndDefineState({
        space: {
          foo: {
            bar: Collection
          }
        }
      })

      const { actions, selectors } = space

      expect(selectors.foo.bar.items(getState())).to.deep.equal([])
    })

    it('receives action', () => {
      const { space, dispatch, getState } = makeStoreAndDefineState({
        space: {
          foo: {
            bar: Collection
          }
        }
      })

      const { actions, selectors } = space

      const collection = [{ id: '1', name: 'foo' }]
      dispatch(actions.foo.bar.set(collection))

      expect(selectors.foo.bar.items(getState())).to.deep.equal(collection)
    })
  })
})

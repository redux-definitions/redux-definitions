import { expect } from 'chai'
import Normalized from 'nrmlzd'
import { defineState, clearAllState, StateDefinitions } from '../../../../src'
import { makeStoreAndDefineState } from '../utils'

const { Set } = StateDefinitions

describe('definition - set', () => {
  beforeEach(() => {
    clearAllState()
  })

  describe('flat', () => {
    it('state placement', () => {
      expect(() => makeStoreAndDefineState({
        space: Set
      })).to.throw('Redux Enterprise: State Definition cannot be used at the reducer top level. Redux reducers do not support entire state being this initialState value.')
    })
  })

  describe('nested', () => {
    it('state placement', () => {
      const { space, dispatch, getState } = makeStoreAndDefineState({
        space: {
          foo: Set
        }
      })

      expect(getState().space.foo).to.deep.equal([])
    })

    it('receives action', () => {
      const { space, dispatch, getState } = makeStoreAndDefineState({
        space: {
          foo: Set
        }
      })

      const { actions, selectors } = space

      const set = [1, 2, 3]
      dispatch(actions.foo.set(set))

      expect(getState().space.foo).to.deep.equal(set)
    })
  })

  describe('double nested', () => {
    it('state placement', () => {
      const { space, dispatch, getState } = makeStoreAndDefineState({
        space: {
          foo: {
            bar: Set
          }
        }
      })

      const { actions, selectors } = space

      expect(selectors.foo.bar.get(getState())).to.deep.equal([])
    })

    it('receives action', () => {
      const { space, dispatch, getState } = makeStoreAndDefineState({
        space: {
          foo: {
            bar: Set
          }
        }
      })

      const { actions, selectors } = space

      const set = [1, 2, 3]
      dispatch(actions.foo.bar.set(set))

      expect(selectors.foo.bar.get(getState())).to.deep.equal(set)
    })
  })
})

import { expect } from 'chai'
import Normalized from 'nrmlzd'
import { defineState, clearAllState, StateDefinitions } from '../../../../src'
import { makeStoreAndDefineState } from '../utils'

const { Flag } = StateDefinitions

describe('defintion - flag', () => {
  beforeEach(() => {
    clearAllState()
  })

  describe('flat', () => {
    it('state placement', () => {
      expect(() => makeStoreAndDefineState({
        space: Flag
      })).to.throw('Redux Enterprise: State Definition cannot be used at the reducer top level. Redux reducers do not support entire state being this initialState value.')
    })
  })

  describe('nested', () => {
    it('state placement', () => {
      const { space, dispatch, getState } = makeStoreAndDefineState({
        space: {
          foo: Flag
        }
      })

      const { actions, selectors } = space

      expect(selectors.foo.get(getState())).to.equal(false)
    })

    it('receives action', () => {
      const { space, dispatch, getState } = makeStoreAndDefineState({
        space: {
          foo: Flag
        }
      })

      const { actions, selectors } = space

      dispatch(actions.foo.set())

      expect(selectors.foo.get(getState())).to.equal(true)
    })
  })

  describe('double nested', () => {
    it('state placement', () => {
      const { space, dispatch, getState } = makeStoreAndDefineState({
        space: {
          foo: {
            bar: Flag
          }
        }
      })

      const { actions, selectors } = space

      expect(selectors.foo.bar.get(getState())).to.equal(false)
    })

    it('receives action', () => {
      const { space, dispatch, getState } = makeStoreAndDefineState({
        space: {
          foo: {
            bar: Flag
          }
        }
      })

      const { actions, selectors } = space

      dispatch(actions.foo.bar.set())

      expect(selectors.foo.bar.get(getState())).to.equal(true)
    })
  })
})

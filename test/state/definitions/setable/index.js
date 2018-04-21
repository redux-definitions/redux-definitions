import { expect } from 'chai'
import Normalized from 'nrmlzd'
import { defineState, clearAllState, StateDefinitions } from '../../../../src'
import { makeStoreAndDefineState } from '../utils'

const { Setable } = StateDefinitions

describe('definition - setable', () => {
  beforeEach(() => {
    clearAllState()
  })

  describe('flat', () => {
    it('state placement', () => {
      expect(() => makeStoreAndDefineState({
        space: Setable
      })).to.throw('Redux Enterprise: State Definition cannot be used at the reducer top level. Redux reducers do not support entire state being this initialState value.')
    })
  })

  describe('nested', () => {
    it('state placement', () => {
      const { space, dispatch, getState } = makeStoreAndDefineState({
        space: {
          foo: Setable
        }
      })

      const { actions, selectors } = space

      expect(selectors.foo.get(getState())).to.equal(undefined)
    })

    it('receives action', () => {
      const { space, dispatch, getState } = makeStoreAndDefineState({
        space: {
          foo: Setable
        }
      })

      const { actions, selectors } = space

      dispatch(actions.foo.set('foo'))

      expect(selectors.foo.get(getState())).to.equal('foo')
    })
  })

  describe('double nested', () => {
    it('state placement', () => {
      const { space, dispatch, getState } = makeStoreAndDefineState({
        space: {
          foo: {
            bar: Setable
          }
        }
      })

      const { actions, selectors } = space

      expect(selectors.foo.bar.get(getState())).to.equal(undefined)
    })

    it('receives action', () => {
      const { space, dispatch, getState } = makeStoreAndDefineState({
        space: {
          foo: {
            bar: Setable
          }
        }
      })

      const { actions, selectors } = space

      dispatch(actions.foo.bar.set('foo'))

      expect(selectors.foo.bar.get(getState())).to.equal('foo')
    })
  })
})

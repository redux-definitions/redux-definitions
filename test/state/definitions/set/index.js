import { expect } from 'chai'
import Normalized from 'nrmlzd'
import { defineState, clearAllState, StateDefinitions } from '../../../../src'
import { makeStore } from '../utils'

const { Set } = StateDefinitions

describe('definition - set', () => {
  beforeEach(() => {
    clearAllState()
  })

  describe('flat', () => {
    it('state placement', () => {
      expect(() => defineState({
        space: Set
      })).to.throw('Redux Enterprise: State Definition cannot be used at the reducer top level. Redux reducers do not support entire state being this initialState value.')
    })
  })

  describe('nested', () => {
    it('state placement', () => {
      defineState({
        space: {
          foo: Set
        }
      })
      const store = makeStore()

      expect(store.getState().space.foo).to.deep.equal([])
    })

    it('receives action', () => {
      defineState({
        space: {
          foo: Set
        }
      })
      const store = makeStore()

      const set = [1, 2, 3]
      global.Space.foo.set(set)

      expect(store.getState().space.foo).to.deep.equal(set)
    })
  })

  describe('double nested', () => {
    it('state placement', () => {
      defineState({
        space: {
          foo: {
            bar: Set
          }
        }
      })
      const store = makeStore()

      expect(store.getState().space.foo.bar).to.deep.equal([])
    })

    it('receives action', () => {
      defineState({
        space: {
          foo: {
            bar: Set
          }
        }
      })
      const store = makeStore()

      const set = [1, 2, 3]
      global.Space.foo.bar.set(set)
      expect(store.getState().space.foo.bar).to.deep.equal(set)
    })
  })
})

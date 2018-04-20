import { expect } from 'chai'
import Normalized from 'nrmlzd'
import { defineState, StateDefinitions } from '../../../../src'
import { makeStore } from '../utils'

const { Flag } = StateDefinitions

describe('defintion - flag', () => {
  describe('flat', () => {
    it('state placement', () => {
      expect(() => defineState({
        space: Flag
      })).to.throw('Redux Enterprise: State Definition `Flag` cannot be used at the reducer top level. Redux reducers do not support entire state being a boolean value.')
    })
  })

  describe('nested', () => {
    it('state placement', () => {
      defineState({
        space: {
          foo: Flag
        }
      })
      const store = makeStore()

      expect(store.getState().space.foo).to.equal(false)
    })

    it('receives action', () => {
      defineState({
        space: {
          foo: Flag
        }
      })
      const store = makeStore()

      expect(store.getState().space.foo).to.equal(false)
    })
  })

  describe('double nested', () => {
    it('state placement', () => {
      defineState({
        space: {
          foo: {
            bar: Flag
          }
        }
      })
      const store = makeStore()

      expect(store.getState().space.foo.bar).to.equal(false)
    })

    it('receives action', () => {
      defineState({
        space: {
          foo: {
            bar: Flag
          }
        }
      })
      const store = makeStore()

      global.Space.foo.bar.set()

      expect(store.getState().space.foo.bar).to.equal(true)
    })
  })
})

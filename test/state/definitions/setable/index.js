import { expect } from 'chai'
import Normalized from 'nrmlzd'
import { defineState } from '../../../../src'
import { makeStore } from '../utils'

describe('definition - setable', () => {
  describe('flat', () => {
    it('state placement', () => {
      expect(() => defineState({
        space: 'setable'
      })).to.throw('Redux Enterprise: State Definition `Setable` cannot be used at the reducer top level. Redux reducers do not support entire state being a boolean value.')
    })
  })

  describe('nested', () => {
    it('state placement', () => {
      defineState({
        space: {
          foo: 'setable'
        }
      })
      const store = makeStore()

      expect(store.getState().space.foo).to.equal(undefined)
    })

    it('receives action', () => {
      defineState({
        space: {
          foo: 'setable'
        }
      })
      const store = makeStore()

      global.Space.foo.set('foo')

      expect(store.getState().space.foo).to.equal('foo')
    })
  })

  describe('double nested', () => {
    it('state placement', () => {
      defineState({
        space: {
          foo: {
            bar: 'setable'
          }
        }
      })
      const store = makeStore()

      expect(store.getState().space.foo.bar).to.equal(undefined)
    })

    it('receives action', () => {
      defineState({
        space: {
          foo: {
            bar: 'setable'
          }
        }
      })
      const store = makeStore()

      global.Space.foo.bar.set('foo')
      expect(store.getState().space.foo.bar).to.equal('foo')
    })
  })
})

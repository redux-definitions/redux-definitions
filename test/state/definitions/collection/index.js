import { expect } from 'chai'
import Normalized from 'nrmlzd'
import { defineState } from '../../../../src'
import { makeStore } from '../utils'

describe('definition - collection', () => {
  describe('flat', () => {
    it('state placement', () => {
      defineState({
        space: 'collection'
      })
      const store = makeStore()

      expect(store.getState().space).to.deep.equal(Normalized.create())
    })

    it('receives action', () => {
      defineState({
        space: 'collection'
      })
      const store = makeStore()

      // set entire collection
      const collection = [{ id: '1', name: 'foo' }]
      global.Space.set(collection)

      expect(store.getState().space).to.deep.equal(
        Normalized.fromArray(collection)
      )
    })
  })

  describe('nested', () => {
    it('state placement', () => {
      defineState({
        space: {
          foo: 'collection'
        }
      })
      const store = makeStore()

      expect(store.getState().space.foo).to.deep.equal(Normalized.create())
    })

    it('receives action', () => {
      defineState({
        space: {
          foo: 'collection'
        }
      })
      const store = makeStore()

      // set entire collection
      const collection = [{ id: '1', name: 'foo' }]
      global.Space.foo.set(collection)

      expect(store.getState().space.foo).to.deep.equal(
        Normalized.fromArray(collection)
      )
    })
  })

  describe('double nested', () => {
    it('state placement', () => {
      defineState({
        space: {
          foo: {
            bar: 'collection'
          }
        }
      })
      const store = makeStore()

      expect(store.getState().space.foo.bar).to.deep.equal(Normalized.create())
    })

    it('receives action', () => {
      defineState({
        space: {
          foo: {
            bar: 'collection'
          }
        }
      })
      const store = makeStore()

      // set entire collection
      const collection = [{ id: '1', name: 'foo' }]
      global.Space.foo.bar.set(collection)
      expect(store.getState().space.foo.bar).to.deep.equal(
        Normalized.fromArray(collection)
      )
    })
  })
})

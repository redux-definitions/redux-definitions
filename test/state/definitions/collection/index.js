import { expect } from 'chai'
import Normalized from 'nrmlzd'
import { defineState, clearAllState, StateDefinitions } from '../../../../src'
import { makeStore } from '../utils'

const { Collection } = StateDefinitions

describe('definition - collection', () => {
  beforeEach(() => {
    clearAllState()
  })

  describe('flat', () => {
    it('state placement', () => {
      defineState({
        space: Collection
      })
      const store = makeStore()

      expect(store.getState().space).to.deep.equal(Normalized.create())
    })

    it('receives action', () => {
      const m = defineState({
        space: Collection
      })
      const store = makeStore()

      // set entire collection
      const collection = [{ id: '1', name: 'foo' }]
      global.Space.set(collection)

      expect(store.getState().space).to.deep.equal(
        Normalized.fromArray(collection)
      )

      expect(m.space.selectors.items(store.getState())).to.deep.equal(collection)
      expect(m.space.selectors.ids(store.getState())).to.deep.equal(['1'])
    })
  })

  describe('nested', () => {
    it('state placement', () => {
      defineState({
        space: {
          foo: Collection
        }
      })
      const store = makeStore()

      expect(store.getState().space.foo).to.deep.equal(Normalized.create())
    })

    it('receives action', () => {
      defineState({
        space: {
          foo: Collection
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
            bar: Collection
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
            bar: Collection
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

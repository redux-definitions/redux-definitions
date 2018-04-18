import { expect } from 'chai'
import { get } from 'lodash'
import { createAction } from 'redux-actions'
import { createLogger } from 'redux-logger'
import Normalized from 'nrmlzd'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { defineState, startRepl, reducers } from '../../src'

const makeStore = () => {
  const store = createStore(
    combineReducers(reducers),
    {},
    // applyMiddleware(createLogger())
    applyMiddleware()
  )
  return startRepl(store)
}

describe('model', () => {
  beforeEach(() => {
  })

  it('initialized data types', () => {
    defineState({
      space: {
        foo: 'collection'
      }
    })
    const store = makeStore()

    expect(store.getState().space.foo).to.deep.equal(Normalized.create())
  })

  it('nests data', () => {
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

  describe('collection', () => {
    it('reducer receives action', () => {
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

    it('reducer receives nested action', () => {
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

  describe('flag', () => {
    it('reducer receives action', () => {
      defineState({
        space: {
          foo: 'flag'
        }
      })
      const store = makeStore()

      global.Space.foo.set()
      expect(store.getState().space.foo).to.equal(true)
    })

    it('reducer receives nested action', () => {
      defineState({
        space: {
          foo: {
            bar: 'flag'
          }
        }
      })
      const store = makeStore()

      global.Space.foo.bar.set()
      expect(store.getState().space.foo.bar).to.equal(true)
    })
  })

  describe('setable', () => {
    it('reducer receives setable action', () => {
      defineState({
        space: {
          foo: 'setable'
        }
      })
      const store = makeStore()

      global.Space.foo.set('flim')
      expect(store.getState().space.foo).to.equal('flim')
    })

    it('reducer receives nested setable action', () => {
      defineState({
        space: {
          foo: {
            bar: 'setable'
          }
        }
      })
      const store = makeStore()

      global.Space.foo.bar.set('flam')
      expect(store.getState().space.foo.bar).to.equal('flam')
    })
  })
})

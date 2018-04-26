import { expect } from 'chai'
import Normalized from 'nrmlzd'
import { defineState, clearAllState, StateTypes } from '../../../../src'
import { makeStoreAndDefineState } from '../utils'

const { Setable } = StateTypes

describe('setable', () => {
  beforeEach(() => {
    clearAllState()
  })

  it('state placement', () => {
    expect(() => makeStoreAndDefineState({
      space: Setable
    })).to.throw('Redux Enterprise: State Type cannot be used at the reducer top level. Redux reducers do not support entire state being this initialState value.')
  })

  describe('actions', () => {
    it('api', () => {
      const { space } = makeStoreAndDefineState({
        space: {
          foo: Setable
        }
      })

      const { actions } = space

      expect(Object.keys(actions.foo)).to.deep.equal([
        'set',
        'unset',
      ])
    })

    it('set', () => {
      const { space, dispatch, getState } = makeStoreAndDefineState({
        space: {
          foo: Setable
        }
      })

      const { actions, selectors } = space

      expect(selectors.foo.get(getState())).to.equal(undefined)
      dispatch(actions.foo.set('bar'))
      expect(selectors.foo.get(getState())).to.equal('bar')
    })

    it('unset', () => {
      const { space, dispatch, getState } = makeStoreAndDefineState({
        space: {
          foo: Setable
        }
      })

      const { actions, selectors } = space

      dispatch(actions.foo.set('bar'))
      expect(selectors.foo.get(getState())).to.equal('bar')
      dispatch(actions.foo.unset())
      expect(selectors.foo.get(getState())).to.equal(null)
    })
  })

  describe('selectors', () => {
    it('api', () => {
      const { space } = makeStoreAndDefineState({
        space: {
          foo: Setable
        }
      })

      const { selectors } = space

      expect(Object.keys(selectors.foo)).to.deep.equal([
        'isSet',
        'get',
      ])
    })

    it('isSet', () => {
      const { space, dispatch, getState } = makeStoreAndDefineState({
        space: {
          foo: Setable
        }
      })

      const { actions, selectors } = space

      const collection = [{ id: '1', name: 'foo' }]
      dispatch(actions.foo.set('bar'))
      expect(selectors.foo.isSet(getState())).to.equal(true)
      dispatch(actions.foo.unset())
      expect(selectors.foo.isSet(getState())).to.equal(false)
    })

    it('get', () => {
      const { space, dispatch, getState } = makeStoreAndDefineState({
        space: {
          foo: Setable
        }
      })

      const { actions, selectors } = space

      const collection = [{ id: '1', name: 'foo' }]
      dispatch(actions.foo.set('bar'))

      expect(selectors.foo.get(getState())).to.equal('bar')
    })
  })

  describe('nested', () => {
    const { space, dispatch, getState } = makeStoreAndDefineState({
      space: {
        foo: Setable
      }
    })

    const { actions, selectors } = space

    expect(selectors.foo.get(getState())).to.equal(undefined)
    dispatch(actions.foo.set('foo'))
    expect(selectors.foo.get(getState())).to.equal('foo')
  })

  describe('double nested', () => {
    const { space, dispatch, getState } = makeStoreAndDefineState({
      space: {
        foo: {
          bar: Setable
        }
      }
    })

    const { actions, selectors } = space

    expect(selectors.foo.bar.get(getState())).to.equal(undefined)
    dispatch(actions.foo.bar.set('foo'))
    expect(selectors.foo.bar.get(getState())).to.equal('foo')
  })
})

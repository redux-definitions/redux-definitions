import { expect } from 'chai'
import Normalized from 'nrmlzd'
import { defineState, clearAllState, StateTypes } from '../../../../src'
import { makeStoreAndDefineState } from '../utils'

const { Flag } = StateTypes

describe('defintion - flag', () => {
  beforeEach(() => {
    clearAllState()
  })

  it('state placement', () => {
    expect(() => makeStoreAndDefineState({
      space: Flag
    })).to.throw('Redux Enterprise: State Type cannot be used at the reducer top level. Redux reducers do not support entire state being this initialState value.')
  })

  describe('actions', () => {
    it('api', () => {
      const { space } = makeStoreAndDefineState({
        space: {
          foo: Flag
        }
      })

      const { actions } = space

      expect(Object.keys(actions.foo)).to.deep.equal([
        'set',
        'unset',
        'toggle',
      ])
    })

    it('set', () => {
      const { space, dispatch, getState } = makeStoreAndDefineState({
        space: {
          foo: Flag
        }
      })

      const { actions, selectors } = space

      dispatch(actions.foo.set())
      expect(selectors.foo.get(getState())).to.equal(true)
    })

    it('unset', () => {
      const { space, dispatch, getState } = makeStoreAndDefineState({
        space: {
          foo: Flag
        }
      })

      const { actions, selectors } = space

      dispatch(actions.foo.set())
      expect(selectors.foo.get(getState())).to.equal(true)
      dispatch(actions.foo.unset())
      expect(selectors.foo.get(getState())).to.equal(false)
    })

    it('toggle', () => {
      const { space, dispatch, getState } = makeStoreAndDefineState({
        space: {
          foo: Flag
        }
      })

      const { actions, selectors } = space

      dispatch(actions.foo.toggle())
      expect(selectors.foo.get(getState())).to.equal(true)
      dispatch(actions.foo.toggle())
      expect(selectors.foo.get(getState())).to.equal(false)
    })
  })

  describe('selectors', () => {
    it('api', () => {
      const { space } = makeStoreAndDefineState({
        space: {
          foo: Flag
        }
      })

      const { selectors } = space

      expect(Object.keys(selectors.foo)).to.deep.equal([
        'get',
      ])
    })

    it('get', () => {
      const { space, dispatch, getState } = makeStoreAndDefineState({
        space: {
          foo: Flag
        }
      })

      const { actions, selectors } = space

      const collection = [{ id: '1', name: 'foo' }]
      dispatch(actions.foo.set())

      expect(selectors.foo.get(getState())).to.equal(true)
    })
  })

  it('nested', () => {
    const { space, dispatch, getState } = makeStoreAndDefineState({
      space: {
        foo: Flag
      }
    })

    const { actions, selectors } = space

    expect(selectors.foo.get(getState())).to.equal(false)
    dispatch(actions.foo.set())
    expect(selectors.foo.get(getState())).to.equal(true)
  })

  it('double nested', () => {
    const { space, dispatch, getState } = makeStoreAndDefineState({
      space: {
        foo: {
          bar: Flag
        }
      }
    })

    const { actions, selectors } = space

    expect(selectors.foo.bar.get(getState())).to.equal(false)
    dispatch(actions.foo.bar.set())
    expect(selectors.foo.bar.get(getState())).to.equal(true)
  })
})

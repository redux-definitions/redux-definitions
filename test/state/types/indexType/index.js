import { expect } from 'chai'
import Normalized from 'nrmlzd'
import { defineState, clearAllState, StateTypes } from '../../../../src'
import { makeStoreAndDefineState } from '../utils'

const { Index } = StateTypes

describe('index', () => {
  beforeEach(() => {
    clearAllState()
  })

  it('state placement', () => {
    const { space, getState } = makeStoreAndDefineState({
      space: Index
    })

    const { actions, selectors } = space

    expect(selectors.get(getState())).to.deep.equal([])
  })

  describe('actions', () => {
    it('api', () => {
      const { space } = makeStoreAndDefineState({
        space: {
          foo: Index
        }
      })

      const { actions } = space

      expect(Object.keys(actions.foo)).to.deep.equal([
        'set',
        'reset',
        'toggle',
        'add',
        'remove',
      ])
    })

    it('set', () => {
      const { space, dispatch, getState } = makeStoreAndDefineState({
        space: {
          foo: Index
        }
      })

      const { actions, selectors } = space

      const set = [1,2,3]
      expect(selectors.foo.get(getState())).to.deep.equal([])
      dispatch(actions.foo.set(set))
      expect(selectors.foo.get(getState())).to.deep.equal(set)
    })

    it('toggle', () => {
      const { space, dispatch, getState } = makeStoreAndDefineState({
        space: {
          foo: Index
        }
      })

      const { actions, selectors } = space

      const set = [1,2,3]
      expect(selectors.foo.get(getState())).to.deep.equal([])
      dispatch(actions.foo.set(set))
      dispatch(actions.foo.toggle(3))
      expect(selectors.foo.get(getState())).to.deep.equal([1,2])
      dispatch(actions.foo.toggle(3))
      expect(selectors.foo.get(getState())).to.deep.equal(set)
    })

    it('add', () => {
      const { space, dispatch, getState } = makeStoreAndDefineState({
        space: {
          foo: Index
        }
      })

      const { actions, selectors } = space

      const set = [1,2,3]
      expect(selectors.foo.get(getState())).to.deep.equal([])
      dispatch(actions.foo.set(set))
      dispatch(actions.foo.add(3))
      expect(selectors.foo.get(getState())).to.deep.equal(set)
      dispatch(actions.foo.add(4))
      expect(selectors.foo.get(getState())).to.deep.equal([...set, 4])
    })

    it('remove', () => {
      const { space, dispatch, getState } = makeStoreAndDefineState({
        space: {
          foo: Index
        }
      })

      const { actions, selectors } = space

      const set = [1,2,3]
      expect(selectors.foo.get(getState())).to.deep.equal([])
      dispatch(actions.foo.set(set))
      dispatch(actions.foo.remove(4))
      expect(selectors.foo.get(getState())).to.deep.equal(set)
      dispatch(actions.foo.remove(2))
      expect(selectors.foo.get(getState())).to.deep.equal([1,3])
    })

    it('reset', () => {
      const { space, dispatch, getState } = makeStoreAndDefineState({
        space: {
          foo: Index
        }
      })

      const { actions, selectors } = space

      const set = [1,2,3]
      dispatch(actions.foo.set(set))
      expect(selectors.foo.get(getState())).to.deep.equal(set)
      dispatch(actions.foo.reset())
      expect(selectors.foo.get(getState())).to.deep.equal([])
    })
  })

  describe('selectors', () => {
    it('api', () => {
      const { space } = makeStoreAndDefineState({
        space: {
          foo: Index
        }
      })

      const { selectors } = space

      expect(Object.keys(selectors.foo)).to.deep.equal([
        'get',
        'includes',
      ])
    })

    it('includes', () => {
      const { space, dispatch, getState } = makeStoreAndDefineState({
        space: {
          foo: Index
        }
      })

      const { actions, selectors } = space

      const set = [1,2,3]
      dispatch(actions.foo.set(set))
      expect(selectors.foo.includes(getState(), { id: 1 })).to.equal(true)
      expect(selectors.foo.includes(getState(), { id: 4 })).to.equal(false)
    })

    it('get', () => {
      const { space, dispatch, getState } = makeStoreAndDefineState({
        space: {
          foo: Index
        }
      })

      const { actions, selectors } = space

      const set = [1,2,3]
      dispatch(actions.foo.set(set))
      expect(selectors.foo.get(getState())).to.deep.equal(set)
    })
  })

  it('nested', () => {
    const { space, dispatch, getState } = makeStoreAndDefineState({
      space: {
        foo: Index
      }
    })

    const { actions, selectors } = space

    expect(selectors.foo.get(getState())).to.deep.equal([])
    const set = [1, 2, 3]
    dispatch(actions.foo.set(set))
    expect(selectors.foo.get(getState())).to.deep.equal(set)
  })

  it('double nested', () => {
    const { space, dispatch, getState } = makeStoreAndDefineState({
      space: {
        foo: {
          bar: Index
        }
      }
    })

    const { actions, selectors } = space

    const set = [1, 2, 3]
    expect(selectors.foo.bar.get(getState())).to.deep.equal([])
    dispatch(actions.foo.bar.set(set))
    expect(selectors.foo.bar.get(getState())).to.deep.equal(set)
  })
})

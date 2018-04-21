import { expect } from 'chai'
import Normalized from 'nrmlzd'
import { defineState, clearAllState, StateDefinitions } from '../../../../src'
import { makeStoreAndDefineState } from '../utils'

const { FormField } = StateDefinitions

const formField = FormField({
  validators: [
    [(val) => typeof val === 'string', 'str heh'],
    [(val) => val.length > 4, 'not long'],
  ],
  value: 'flim'
})

describe('definition - formField', () => {
  beforeEach(() => {
    clearAllState()
  })

  describe('flat', () => {
    it('state placement', () => {
      expect(() => makeStoreAndDefineState({
        space: formField
      })).to.throw('Redux Enterprise: State Definition cannot be used at the reducer top level. Redux reducers do not support entire state being this initialState value.')
    })
  })

  describe('nested', () => {
    it('state placement', () => {
      const { space, dispatch, getState } =makeStoreAndDefineState({
        space: {
          foo: formField
        }
      })

      expect(space.selectors.foo.value(getState())).to.equal('flim')
    })

    it('receives action', () => {
      const { space, dispatch, getState } =makeStoreAndDefineState({
        space: {
          foo: formField
        }
      })

      dispatch(space.actions.foo.set('foobar'))

      expect(space.selectors.foo.value(getState())).to.equal('foobar')
    })
  })

  describe('double nested', () => {
    it('state placement', () => {
      const { space, dispatch, getState } =makeStoreAndDefineState({
        space: {
          foo: {
            bar: formField
          }
        }
      })

      expect(space.selectors.foo.bar.value(getState())).to.equal('flim')
    })

    it('receives action', () => {
      const { space, dispatch, getState } =makeStoreAndDefineState({
        space: {
          foo: {
            bar: formField
          }
        }
      })

      dispatch(space.actions.foo.bar.set('foo'))
      expect(space.selectors.foo.bar.value(getState())).to.equal('foo')
    })
  })
})

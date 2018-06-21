import Normalized from 'utils/nrmlzd'
import { Action } from 'redux-actions'
import { createAction } from 'redux-actions'
import { Definitions } from '../../index'
import { traverse } from './index'

const { Collection, Field, Flag } = Definitions

describe('traverse', () => {
  it('nested structure', () => {
    const sampleSchema = {
      a: Flag,
      b: Collection,
      c: {
        d: Flag,
        e: {
          f: Collection,
        },
      },
    }

    const { actions, selectors, reducers } = traverse(sampleSchema, ['namespace'])
    const state = { namespace: { c: { e: { f: Normalized.fromArray([{ id: '1' }]) } } } }

    expect(selectors.c.e.f.all(state))
      .toEqual([{ id: '1' }])
    expect(selectors.c.e.f.ids(state))
      .toEqual(['1'])
    expect(selectors.c.e.f.find(state, { id: '1' }))
      .toEqual({ id: '1' })
    expect(selectors.c.e.f.find(state, { id: '2' }))
      .toEqual(undefined)

    expect(Object.keys(actions.a).length).toEqual(3)
    expect(Object.keys(actions.b).length).toEqual(6)
    expect(Object.keys(actions.c.d).length).toEqual(3)
    expect(Object.keys(actions.c.e.f).length).toEqual(6)
  })

  it('reducer custom function', () => {
    const sampleObj = {
      c: (state: any, action: Action<any>) => {
        return action.payload
      },
      g: Field,
    }

    const { actions, reducers, initialState } = traverse(sampleObj, ['namespace'])

    expect(reducers['namespace/c'](initialState, actions.c({ x: 1 })))
      .toEqual({ x: 1 })
  })

  it('reducer custom nested function', () => {
    const sampleObj = {
      c: {
        d: Flag,
        e: (state: any, action: Action<any>) => {
          return action.payload
        },
        f: Flag,
      },
      g: Field,
    }

    const { actions, reducers, initialState } = traverse(sampleObj, ['namespace'])

    expect(reducers['namespace/c/e'](initialState, actions.c.e({ x: 1 })))
      .toEqual({ c: { x: 1 }, g: undefined })
  })

  it('entire reducer as function - maybe restrict', () => {
    const fn = (state: any, action: Action<any>) => {
      return action.payload
    }

    expect(() => traverse(fn, ['namespace'])).toThrow()
  })
})

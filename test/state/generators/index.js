import { expect } from 'chai'
import Normalized from 'nrmlzd'
import { createAction } from 'redux-actions'
import { generateStateMap } from '../../../src/state/generators'
import { StateDefinitions } from '../../../src'

const { Collection, Setable, Flag } = StateDefinitions

describe('generateStateMap', () => {
  it('nested structure', () => {
    const sampleObj = {
      a: Flag,
      b: Collection,
      c: {
        d: Flag,
        e: {
          f: Collection,
        },
      },
    }

    const { actions, selectors, reducers } = generateStateMap(sampleObj, ['namespace'])
    const state = { namespace: { c: { e: { f: Normalized.fromArray([{ id: 1 }]) } } } }

    expect(selectors.c.e.f.all(state))
      .to.deep.equal([{ id: 1 }])
    expect(selectors.c.e.f.byId(state, { id: 1 }))
      .to.deep.equal({ id: 1 })
    expect(selectors.c.e.f.byId(state, { id: 2 }))
      .to.deep.equal(null)

    expect(Object.keys(actions.a).length).to.equal(3)
    expect(Object.keys(actions.b).length).to.equal(5)
    expect(Object.keys(actions.c.d).length).to.equal(3)
    expect(Object.keys(actions.c.e.f).length).to.equal(5)
  })

  it('reducer custom function', () => {
    const sampleObj = {
      c: (state, action) => {
        return action.payload
      },
      g: Setable,
    }

    const { actions, reducers, initialState } = generateStateMap(sampleObj, ['namespace'])

    expect(reducers['namespace/c'](initialState, actions.c({ x: 1 })))
      .to.deep.equal({ x: 1 })
  })

  it('reducer custom nested function', () => {
    const sampleObj = {
      c: {
        d: Flag,
        e: (state, action) => {
          return action.payload
        },
        f: Flag,
      },
      g: Setable,
    }

    const { actions, reducers, initialState } = generateStateMap(sampleObj, ['namespace'])

    expect(reducers['namespace/c/e'](initialState, actions.c.e({ x: 1 })))
      .to.deep.equal({ c: { x: 1 }, g: undefined })
  })

  it('entire reducer as function - maybe restrict', () => {
    const fn = (state, action) => {
      return action.payload
    }

    const { actions, reducers, initialState } = generateStateMap(fn, ['namespace'])

    expect(reducers['namespace'](initialState, actions({ x: 1 })))
      .to.deep.equal({ x: 1 })
  })
})

import { expect } from 'chai'
import { createAction } from 'redux-actions'
import { generateTypeMap } from '../../../src/state/generators'
import { StateDefinitions } from '../../../src'

const { Collection, Flag } = StateDefinitions

describe('generators', () => {
  it('generateTypeMap', () => {
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

    const { actions, reducers } = generateTypeMap(sampleObj, ['namespace'])

    expect(Object.keys(actions.a).length).to.equal(3)
    expect(Object.keys(actions.b).length).to.equal(4)
    expect(Object.keys(actions.c.d).length).to.equal(3)
    expect(Object.keys(actions.c.e.f).length).to.equal(4)
  })
})

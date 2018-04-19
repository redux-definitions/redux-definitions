import { expect } from 'chai'
import { createAction } from 'redux-actions'
import {
  generateReducerMap,
  generateTypeMap,
} from '../../../src/state/generators'

describe('generators', () => {
  it('generateReducerMap', () => {
    const sampleObj = {
      a: {
        b: {
          c: 'c',
          d: 'd',
        },
        f: 'f',
      },
      e: 'e'
    }

    const { actions, reducers } = generateReducerMap(sampleObj, 'namespace/')

    expect(actions.a.b.c()).to.deep.equal(createAction('namespace/a/b/c')())
    expect(actions.a.b.d()).to.deep.equal(createAction('namespace/a/b/d')())
    expect(actions.a.f()).to.deep.equal(createAction('namespace/a/f')())
    expect(actions.e()).to.deep.equal(createAction('namespace/e')())

    expect(reducers).to.deep.equal({
      'namespace/a/b/c': 'c',
      'namespace/a/b/d': 'd',
      'namespace/a/f': 'f',
      'namespace/e': 'e',
    })
  })

  it('generateTypeMap', () => {
    const sampleObj = {
      a: 'flag',
      b: 'collection',
      c: {
        d: 'flag',
        e: {
          f: 'collection',
        },
      },
    }

    const { actions, reducers } = generateTypeMap(sampleObj, 'namespace/')

    expect(Object.keys(actions.a).length).to.equal(3)
    expect(Object.keys(actions.b).length).to.equal(4)
    expect(Object.keys(actions.c.d).length).to.equal(3)
    expect(Object.keys(actions.c.e.f).length).to.equal(4)
  })
})

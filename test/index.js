import { expect } from 'chai'
import { get } from 'lodash'
import { createAction } from 'redux-actions'
import {
  generateActionMap,
  generateReducerMap,
  generateTypeMap,
} from '../src/model/generate-updaters'

describe('generate', () => {
  it('generateActionMap', () => {
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

    const actionMap = generateActionMap(sampleObj, 'namespace/')

    expect(actionMap.a.b.c()).to.deep.equal(createAction('namespace/a/b/c')())
    expect(actionMap.a.b.d()).to.deep.equal(createAction('namespace/a/b/d')())
    expect(actionMap.a.f()).to.deep.equal(createAction('namespace/a/f')())
    expect(actionMap.e()).to.deep.equal(createAction('namespace/e')())
  })

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

    const reducerMap = generateReducerMap(sampleObj, 'namespace/')

    expect(reducerMap).to.deep.equal({
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

    const actions = {}
    const reducerFns = {}

    generateTypeMap(sampleObj, 'namespace', actions, reducerFns)
    console.log(actions)
    console.log(reducerFns)

    expect(actions.length).to.equal(5)
  })
})

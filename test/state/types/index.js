import { expect } from 'chai'
import Normalized from 'nrmlzd'
import { defineState, clearAllState, StateTypes } from '../../../src'
import { makeStoreAndDefineState } from './utils'

const { Collection, Flag, Setable } = StateTypes

describe('multiple types', () => {
  beforeEach(() => {
    clearAllState()
  })

  it('crazy', () => {
    const { foo, dispatch, getState } = makeStoreAndDefineState({
      space: Collection,
      foo: {
        bar: {
          nested: {
            beep: Collection,
            bloop: Flag,
          },
          flim: Setable,
          flam: Flag,
        },
        justTestingEmpty: {},
      }
    })

    expect(getState().foo.bar.justTestingEmpty).to.equal(undefined)
  })

  it('realistic', () => {
    const { getState } = makeStoreAndDefineState({
      todos: Collection,
      notes: Collection,
      friends: Collection,
      editor: {
        isOpen: Flag,
        isPending: Flag,
        firstname: Setable,
        lastname: Setable,
        clearFullName: (state, action) => {
          return {
            ...state,
            firstname: null,
            lastname: null,
          }
        },
        dob: Setable,
      },
      config: {
        isAdmin: Flag,
        isBetaUser: Flag,
      }
    }, true)

    const { Todos, Notes, Editor, Config } = global.Actions

    Todos.create({ id: 1 })
    Todos.create({ id: 2 })
    Todos.create({ id: 3 })
    Todos.reset()
    Todos.create({ id: 4 })
    Todos.create({ id: 5 })

    Notes.create({ id: 1 })
    Notes.remove({ id: 1 })
    Notes.create({ id: 2 })
    Notes.upsert({ id: 2, message: 'foo' })
    Notes.create({ id: 5 })
    Notes.remove(5)

    Editor.isOpen.unset()
    Editor.firstname.set('jon')
    Editor.lastname.set('snowden')
    Editor.clearFullName()
    Editor.firstname.set('john')
    Editor.isOpen.unset()
    Editor.isPending.set()

    Config.isAdmin.set()
    Config.isBetaUser.set()

    expect(getState()).to.deep.equal({
      todos: { ids: [4, 5], data: { 4: { id: 4 }, 5: { id: 5 }, }},
      notes: { ids: [1, 2], data: { 1: { id: 1 }, 2: { id: 2, message: 'foo' }, }},
      friends: { ids: [], data: {} },
      editor: {
        firstname: 'john',
        lastname: null,
        dob: undefined,
        isOpen: false,
        isPending: true,
      },
      config: {
        isAdmin: true,
        isBetaUser: true,
      },
    })
  })
})


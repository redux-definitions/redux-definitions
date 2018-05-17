import { expect } from 'chai'
import Normalized from 'nrmlzd'
import { defineState, clearAllState, StateTypes } from '../../../src'
import { makeStoreAndDefineState } from './utils'

const { Collection, Flag, Field } = StateTypes

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
          flim: Field,
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
        firstname: Field,
        lastname: Field,
        clearFullName: (state, action) => {
          return {
            ...state,
            firstname: null,
            lastname: null,
          }
        },
        dob: Field,
      },
      config: {
        isAdmin: Flag,
        isBetaUser: Flag,
      }
    }, true)

    const { todos, notes, editor, config } = global.Actions

    todos.create({ id: 1 })
    todos.create({ id: 2 })
    todos.create({ id: 3 })
    todos.reset()
    todos.create({ id: 4 })
    todos.create({ id: 5 })

    notes.create({ id: 1 })
    notes.remove({ id: 1 })
    notes.create({ id: 2 })
    notes.upsert({ id: 2, message: 'foo' })
    notes.create({ id: 5 })
    notes.remove(5)

    editor.isOpen.unset()
    editor.firstname.set('jon')
    editor.lastname.set('snowden')
    editor.clearFullName()
    editor.firstname.set('john')
    editor.isOpen.unset()
    editor.isPending.set()

    config.isAdmin.set()
    config.isBetaUser.set()

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


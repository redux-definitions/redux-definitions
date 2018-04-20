import { expect } from 'chai'
import Normalized from 'nrmlzd'
import { defineState, clearAllState, StateDefinitions } from '../../../src'
import { makeStore } from './utils'

const { Collection, Flag, Setable } = StateDefinitions

describe('multiple definitions', () => {
  beforeEach(() => {
    clearAllState()
  })

  it('crazy', () => {
    defineState({
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
    const store = makeStore()

    expect(global.Foo.bar.justTestingEmpty).to.equal(undefined)
  })

  it('realistic', () => {
    defineState({
      todos: Collection,
      notes: Collection,
      friends: Collection,
      editor: {
        isOpen: Flag,
        isPending: Flag,
        firstname: Setable,
        lastname: Setable,
        dob: Setable,
      },
      config: {
        isAdmin: Flag,
        isBetaUser: Flag,
      }
    })

    const store = makeStore()
    const { Todos, Notes, Editor, Config } = global

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
    Editor.lastname.set('snow')
    Editor.isOpen.unset()
    Editor.isPending.set()

    Config.isAdmin.set()
    Config.isBetaUser.set()

    expect(store.getState()).to.deep.equal({
      todos: { ids: [4, 5], data: { 4: { id: 4 }, 5: { id: 5 }, }},
      notes: { ids: [1, 2], data: { 1: { id: 1 }, 2: { id: 2, message: 'foo' }, }},
      friends: { ids: [], data: {} },
      editor: {
        firstname: 'jon',
        lastname: 'snow',
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


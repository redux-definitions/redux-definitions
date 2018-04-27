import { defineState, StateTypes } from '../src'

const { Collection, Field, Flag, Index } = StateTypes

export default defineState({
  todos: Collection,
  todoEditor: {
    editingId: Field,
    isEditing: Flag,
  },
  selected: Index
})

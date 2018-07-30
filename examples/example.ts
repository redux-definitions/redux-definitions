import { createReducers, Definitions } from '../src'

const { Collection, Field, Flag, Index } = Definitions

const x = createReducers({
  selected: {
    selected: Index(),
  },
  todoEditor: {
    editingId: Field(),
    isEditing: Flag(),
  },
  todos: {
    todos: Collection(),
  }
})

export default x

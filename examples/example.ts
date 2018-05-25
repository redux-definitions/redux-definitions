import { createReducers, Definitions } from '../src'

const { Collection, Field, Flag, Index } = Definitions

export default createReducers({
  selected: Index(),
  todoEditor: {
    editingId: Field(),
    isEditing: Flag(),
  },
  todos: Collection(),
})

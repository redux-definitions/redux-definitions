import { createReducers, Definitions } from '../src'

const { Collection, Field, Flag, Index } = Definitions

export default createReducers({
  todoList: {
    todos: Collection,
    selectedIds: Index,
    completedIds: Index
  },
  todoEditor: {
    editingId: Field,
    isEditing: Flag
  }
})

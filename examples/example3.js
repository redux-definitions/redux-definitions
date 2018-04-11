import { Model, Types } from 'redux-enterprise'
const { Collection, Flag } = Types

Model({
  todos: {
    todos: Collection(['selected']),
    isEditing: Flag
  },
  comments: Collection
})

Todos.isEditing.set()
Todos.comments.add({ id: '1', message: 'Hey there' })

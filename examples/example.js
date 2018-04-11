import Re from '../src'
const { Collection, Setable, Flag, State } = Re

Re.createModel({
  search: {
    query: Setable,
    // Actions.searchText.set
    // Actions.searchText.unset
    // Actions.searchText.reset
    //
    // Selectors.searchText.get
  },

  todos: Collection(['selected']),
  // Actions.todos.set
  // Actions.todos.upsert
  // Actions.todos.remove
  // Actions.todos.reset
  //
  // Selectors.todos.all.list
  // Selectors.todos.all.ids
  // Selectors.todos.all.get(id)
  // Selectors.todos.selected.list
  // Selectors.todos.selected.ids
  // Selectors.todos.selected.get(id)
  // Selectors.todos.get(id)

  // Adding custom reducers
  videos: {
    set: (state, actions) {
      // state here should be `normalStuff` object scope?
      return state
    },
    // Actions.normalStuff.hello
    //
    // No selectors
    removeOldVideos: (state, actions) {
      // state here should be `normalStuff` object scope?
      return state
    },
  },
  },
})

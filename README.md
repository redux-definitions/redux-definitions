<br>
<p align="center"><img height="55px" src="https://github.com/redux-enterprise/redux-enterprise/blob/master/images/logo-pad-right.png?raw=true" alt="🚀"></p>
<h1 align="center">
  Redux Enterprise
  <br>
  <br>
</h1>

<p align="center">
  <a href="https://travis-ci.org/redux-enterprise/redux-enterprise"><img src="https://img.shields.io/travis/redux-enterprise/redux-enterprise/master.svg" alt="travis"></a>
  <a href="https://www.npmjs.com/package/redux-enterprise"><img src="https://img.shields.io/npm/v/redux-enterprise.svg" alt="npm version"></a>
  <a href="https://spectrum.chat/redux-enterprise"><img src="https://withspectrum.github.io/badge/badge.svg" alt="Join the community on Spectrum"></a>
  <a href="https://www.npmjs.com/package/redux-enterprise"><img src="https://img.shields.io/npm/dm/redux-enterprise.svg" alt="npm downloads"></a>
  <a href="https://standardjs.com"><img src="https://img.shields.io/badge/code_style-standard-brightgreen.svg" alt="Standard - JavaScript Style Guide"></a>
</p>

> Welcome 👋 Make sure to explore our [issues](https://github.com/redux-enterprise/redux-enterprise/issues), and feel free to ask any questions you may have!

> [Learn how to get up and running in 5 minutes below 👇🏽](#user-content-add-it-to-your-project-in-under-5-minutes)

## Overview

Redux Enterprise is a library for **scaling development on Redux-based projects** through the use of **consistent and standardized** reducers and actions generated from **[higher-order state types](#state-types)**.

As projects grow it quickly becomes critical to keep reducers lean and to map very specific actions to these reducers. Reducers housing state of similar data structure (eg, Collection, Flag, Form, Request, Inbox) should always share identical standardized action/reducer interfaces when used multiple times in a project or even across projects. We can achieive this by generating our reducers and their actions from a library of reusable state types. State types are high-level enough to promote a focus on business logic, but simple enough to be reusable and composable. The core Redux patterns of message passing, data immutibility, unidirectional flow, and all associated benefits remain; Redux Enterprise simply adds a layer of standarization and tooling so developers can **stay productive and ship features at a consistent pace even as projects grow to dozens or hundreds of reducers**. Best of all, Redux Enterprise can be gradually introduced into existing projects without any refactoring.

## Generate reducers, actions, and selectors from a higher-order state model
Redux Enterprise allows you to describe your core application state using a library of [State Types](#state-types):
```js
import { defineState, StateTypes } from 'redux-enterprise'
const { Collection, Flag, Setable, Inbox } = StateTypes

const { actions, reducers, selectors } = defineState({
  todos: Collection,
  todoEditor: {
    isEditing: Flag,
    editingId: Setable,
  },
  notifications: Inbox
})
```
> each top-level key in the `defineState` schema generates a separate reducer

### Actions
The standardized `actions` are returned from the `defineState` definition. The State Type determines what actions are available. For example a `Collection` has actions `create`, `update`, `upsert`, `remove`, `set`, `reset`, `clear`. Learn more in the [State Types](#state-types) section.
```js
const { Todos, TodoEditor, Notifications } = actions

Todos.create({ id: 13, message: 'Hello Burp Morty' })
// { type: 'todos/create', payload: { id: 13, message: 'Hello Burp Morty' } }
Todos.upsert({ id: 13, message: 'Hello Morty' })
// { type: 'todos/upsert', payload: { id: 13, message: 'Hello Morty' } }
TodoEditor.editingId.set(37)
// { type: 'todoEditor/editingId/set', payload: 37 }
Todos.remove(37)
// { type: 'todos/remove', payload: 37 }
Notifications.push({ id: 37, title: 'Bob has edited a todo' })
// { type: 'notifications/push', payload: { id: 37, message: 'Bob has edited a todo' } }
Notifications.clear()
// { type: 'notifications/clear' }
```

> ⚠️ Remember that these are action creators. The actions must be dispatched just like any other actions!

For your convenience all actions are also automatically available on the library's `Actions` object:
```js
import { Actions } from 'redux-enterprise'
```

### Selectors
Selectors ([from the ubiquitous reselect library](https://github.com/reactjs/reselect)) are also returned from `defineState`. A `Collection` has `all`, `byId`, and `ids`:

```js
const { Todos, TodoEditor, Notifications } = selectors

Todos.all(state) // returns a collection of todos
Todos.byId(state, { id }) // returns a todo with matching `id`
Todos.ids(state) // returns an array of ids
```

## Automatic Redux-REPL right in your browser console
When in dev mode Redux Enterprise also automatically provides an in-browser REPL for dispatching prebound actions.


<img  width="100%" src="images/repl.gif" />
> For your convenience unlike normal actions, calls to actions in the browser console are prebound to `store.dispatch`. Remember, only in the console!
```js
> TodoEditor.isEditing.toggle() // is bound to `store.dispatch(TodoEditor.isEditing.toggle())`
// store.dispatch({ type: 'todoEditor/isEditing/toggle' })
```

## Add it to your project in under 5 minutes

#### Install
```sh
yarn add redux-enterprise
```

#### Model some state
Open your `reducers/index.js` file or create a new file and use Redux Enterprise to model some new state.
```js
import { defineState, StateTypes } from 'redux-enterprise'
const { Collection, Flag, Setable, Inbox } = StateTypes

const { reducers } = defineState({
  todos: Collection,
  todoEditor: {
    isEditing: Flag,
    editingId: Setable
  },
  notifications: Inbox
})
// `reducers` contains three reducers:
// { todos: fn, todoEditor: fn, notifications: fn }
```

#### Add the new reducers
Take the `reducers` from the call to `defineState` and add them into your `combineReducers` call - your existing reducers will not be affected:
```js
const rootReducer = combineReducers({
  otherExistingReducer,
  anotherReducer,
  ...reducers
})
```

#### Start the REPL with your store
Right after your call to Redux's createStore start the Redux Enterprise REPL:
```js
import { startRepl } from 'redux-enterprise'

...

const store = createStore(rootReducer, initialState, applyMiddleware(..))

startRepl(store)
```
> Note: when server-side rendering this call will be a no-op.

#### All done! Play with the new actions in your browser console
```js
> Todos.create({ id: 89, message: 'Do laundry' })
// prev state { todos: {..0}, todoEditor: { isEditing: false, editingId: null }, notifications: {..0} }
action {type: "todos/create", payload: { id: 89, message: "Do laundry" } }
// next state { todos: {..1}, todoEditor: { isEditing: false, editingId: null }, notifications: {..0} }

> Notifications.push({ id: 47, message: 'New todo has been added' })
// prev state { todos: {..1}, todoEditor: { isEditing: false, editingId: null }, notifications: {..0} }
action {type: "notifications/push", payload: { id: 47, message: "Hello there!" } }
// next state { todos: {..1}, todoEditor: { isEditing: false, editingId: null }, notifications: {..1} }

> TodoEditor.isEditing.toggle()
// prev state { todos: {..1}, todoEditor: { isEditing: false, editingId: null }, notifications: {..1} }
action {type: "todos/isEditing/toggle"}
// next state { todos: {..1}, todoEditor: { isEditing: true, editingId: null }, notifications: {..1} }
```

### Custom reducer functions
Redux Enterprise also allows you to create custom reducer functions. Anywhere in the state map if a function is added, `defineState` passes the function the reducer's `state` and incoming `action`:
```js
import { defineState, StateTypes } from 'redux-enterprise'
const { Collection, Flag, Setable } = StateTypes

const { reducers, actions } = defineState({
  todos: {
    todos: Collection,
    isEditing: Flag,
    editingId: Setable,
    customerReducer: (state, action) => {
      // do anything I please with the `todos` reducer
      return state
    }
  }
})

actions.todos.customReducer('morty')
// { type: 'todos/customReducer', payload: 'morty' }
```
As shown above, the corresponding action creator is automatically available on the actions object.

#### Nesting
If you nest a function, the `state` passed in will be scoped to that level of state automatically:
```js
const { reducers } = defineState({
  nested: {
    stuff: {
      someId: Setable,
      aontherId: Setable,
      anotherCustomReducer: (state, action) => {
        // here `state` is scoped to `nested.stuff`,
        // so we are reducing: { someId, anotherId }
        return state
      }
    }
  }
})
```

## Boilerplates and Examples

Create React App - Enterprise

Nextjs `examples/with-redux-enterprise`

## State Types

#### Collection
#### Flag
#### Setable

### Composing models

## Contributing

Please check out the [Contributing](https://github.com/redux-enterprise/redux-enterprise/blob/master/CONTRIBUTING.md) page to learn how to get involved. TLDR the [Github issues tab](https://github.com/redux-enterprise/redux-enterprise/issues) is your friend.

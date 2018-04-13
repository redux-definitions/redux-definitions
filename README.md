<br>
<p align="center"><img height="50px" src="https://github.com/redux-enterprise/redux-enterprise/blob/master/images/logo.png?raw=true" alt="🚀"></p>
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

Redux Enterprise is a library for **scaling Redux-based projects** that helps enforce the use of **consistent and standardized** reducers and actions by generating them from **[higher-order state types](#state-types)**.

As projects grow it quickly becomes critical to keep reducers lean and to map very specific actions to these reducers. Reducers housing state of similar data structure (eg, Collection, Flag, Form, Queue, Inbox) should always share identical standardized action/reducer interfaces when used multiple times in a project or even across projects. We can achieive this by generating our reducers and their actions from a library of reusable state types. State types are high-level enough to promote a focus on business logic, but simple enough to be reusable and composable. The core Redux patterns of message passing, data immutibility, unidirectional flow, and all associated benefits remain; Redux Enterprise simply adds a layer of standarization and tooling so developers can stay productive and ship features at a consistent pace even as projects grow to dozens or hundreds of reducers. Best of all, Redux Enterprise can be gradually introduced into existing projects without any refactoring.

### Generate reducers actions and selectors from a data model
Redux Enterprise allows you to describe your core application state using a library of data structures, or [state types](#state-types):
```js
import { defineState, StateTypes } from 'redux-enterprise'
const { Collection, Flag, Queue } = StateTypes

const { actions, reducers } = defineState({
  todos: {
    todos: Collection,
    isEditing: Flag
  },
  comments: Collection,
  notifications: Queue
})
```
### Fully compatible with any Redux based project - gradually introduce consistency
The library generates reducers and actions that can seamlessly be introduced into existing Redux projects. The standardized `actions` are returned from a `defineState` definition:
```js
actions.Todos.todos.create({ id: 1, message: 'Hello Burp Morty' })
// { type: 'todos/todos/create', payload: { id: 1, message: 'Hello Burp Morty' } }
actions.Comments.create({ id: 6, message: 'please add some todos' })
// { type: 'comments/create', payload: { id: 6, message: 'please add some todos' } }
actions.Notifications.push({ id: 1, title: 'Bob has edited a todo' })
// { type: 'notifications/push', payload: { id: 1, message: 'Bob has edited a todo' } }
```

...but also for your convenience automatically available on the library's `Actions` object:
```js
import { Actions } from 'redux-enterprise'

Actions.Todos.isEditing.set()
// { type: 'todos/isEditing/set' }
Actions.Todos.todos.create({ id: 1, message: 'Hello Burp Morty' })
// { type: 'todos/todos/create', payload: { id: 1, message: 'Hello Burp Morty' } }
Actions.Todos.todos.upsert({ id: 1, message: 'Hello Morty' })
// { type: 'todos/todos/upsert', payload: { id: 1, message: 'Hello Morty' } }
Actions.Todos.todos.remove(1)
// { type: 'todos/todos/remove', payload: 1 }
Actions.Comments.create({ id: 7, message: 'I like your todo list' })
// { type: 'todos/todos/remove', payload: 1 }
Actions.Notifications.clear()
// { type: 'notifications/clear' }
```

> Remember  these are action creators that return an action object, they must be dispatched just like any other actions!

### Automagically get a Redux-REPL right in your browser console
When in dev mode Redux Enterprise also automatically provides an in-browser REPL for dispatching prebound actions:
<img  width="100%" src="images/repl.gif" />
> Unlike the above actions, these actions are prebound for your convenience. Remember only in the console!
```js
> Todos.isEditing.toggle() // is bound to `store.dispatch(Todos.isEditing.toggle())`
// store.dispatch({ type: 'todos/isEditing/toggle' })
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
const { Collection, Flag, Setable } = StateTypes

const { reducers } = defineState({
  todos: {
    todos: Collection,
    isEditing: Flag,
    editingId: Setable
  },
  comments: Collection,
  notifications: Queue
})
// `reducers` contains two reducers:
// { todos: fn, comments: fn, notifications: fn }
```

#### Configure your store
Take the `reducers` from the call to `defineState` and add them into your `combineReducers` call - your existing reducers are completely unaffected:
```js
const rootReducer = combineReducers({
  otherExistingReducer,
  anotherReducer,
  ...reducers
})
```

#### Play with the new reducers in your browser console
```js
> Todos.isEditing.toggle()
prev state {todos: { todos: {..0}, isEditing: false, editingId: null }, comments: {..0}, notifications: {...} }
action {type: "todos/isEditing/toggle"}
next state {todos: { todos: {..0}, isEditing: true, editingId: null }, comments: {..0}, notifications: {...} }
> Comments.create({ id: 5, message: 'new comment' })
prev state {todos: { todos: {..0}, isEditing: true, editingId: null }, comments: {...}, notifications: {...} }
action {type: "comments/create", payload: { id: 5, message: "new comment" } }
next state {todos: { todos: {..0}, isEditing: true, editingId: null }, comments: {..1}, notifications: {...} }
```

### Custom reducer functions
Redux Enterprise `defineState` also allows you to create custom reducers. Anywhere in the state map if a function is added Redux Enterprise passes the function the reducer `state` and `action`:
```js
import { defineState, StateTypes } from 'redux-enterprise'
const { Collection, Flag, Setable } = StateTypes

const { reducers } = defineState({
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
```
If you nest a function, the `state` passed in will be scoped to that level of state automatically:
```js
  nested: {
    stuff: {
      someId: Setable,
      anotherCustomReducer: (state, action) => {
        // here state is scoped to `nested.stuff`
        return state
      }
    }
  }
})
```

## Boilerplates and Examples

Create React App - Enterprise

Nextjs `examples/with-redux-enterprise`

## Usage: how to model your state

### State types

#### Collection
#### Flag
#### Setable

### Composing models

### Custom reducer functions

## Contributing

Please check out the [Contributing](https://github.com/redux-enterprise/redux-enterprise/blob/master/CONTRIBUTING.md) page to learn how to get involved. TLDR the [Github issues tab](https://github.com/redux-enterprise/redux-enterprise/issues) is your friend.

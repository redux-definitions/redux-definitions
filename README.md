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
  <a href="https://www.npmjs.com/package/redux-enterprise"><img src="https://img.shields.io/npm/dm/redux-enterprise.svg" alt="npm downloads"></a>
  <a href="https://standardjs.com"><img src="https://img.shields.io/badge/code_style-standard-brightgreen.svg" alt="Standard - JavaScript Style Guide"></a>
</p>

## Overview

Redux Enterprise is a library for scaling Redux-based projects that enforces the use of consistent and standardized reducers and actions by generating them from a state description. As projects grow it quickly becomes critical to keep reducers lean, map actions to specific reducers. It is also critical to standardize the way reducers update state and the naming of their actions. Reducers housing state of similar data structure should always share identical action/reducer interfaces, we can get this by describing our state and generating everything else. The core Redux pattern of message passing, data immutibility, unidirectional flow, and all associated benefits remain, Redux Enterprise simply adds a layer of standarization and tooling so developers can be productive and continue moving quickly even as projects grow to dozens or hundreds of reducers and detailed pieces of state. Best of all, Redux Enterprise can be gradually introduced into existing projects without any refactoring.

### Generate reducers actions and selectors from a data model
Redux Enterprise allows you to describe your core application state using a collection of high level data structures, or "state types":
```js
import { State, Types } from 'redux-enterprise'
const { Collection, Flag } = Types

const { actions, reducers } = State({
  todos: {
    todos: Collection,
    isEditing: Flag
  },
  comments: Collection
})
```
### Fully compatible with any Redux based project - gradually introduce consistency
The library generates reducers and actions that can seamlessly be introduced into existing Redux projects. The standardized `actions` are returned from a `State` definition:
```js
actions.Todos.todos.create({ id: 1, message: 'Hello Burp Morty' })
// { type: 'todos/todos/create', payload: { id: 1, message: 'Hello Burp Morty' } }
Actions.Comments.create({ id: 6, message: 'please add some todos' })
// { type: 'comments/create', payload: { id: 6, message: 'please add some todos' } }
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
import { State, Types } from 'redux-enterprise'
const { Collection, Flag, Setable } = Types

const { reducers } = State({
  todos: {
    todos: Collection,
    isEditing: Flag,
    EditingId: Setable
  },
  comments: Collection
})
// `reducers` contains two reducers:
// { todos: fn, comments: fn }
```

#### Configure your store
Take the `reducers` from the call to `State` and add them into your `combineReducers` call - your existing reducers are completely unaffected:
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
prev state {todos: { todos: {..0}, isEditing: false, editingId: null }, comments: {..0} }
action {type: "todos/isEditing/toggle"}
next state {todos: { todos: {..0}, isEditing: true, editingId: null }, comments: {..0} }
> Comments.create({ id: 5, message: 'new comment' })
prev state {todos: { todos: {..0}, isEditing: true, editingId: null }, comments: {...} }
action {type: "comments/create", payload: { id: 5, message: "new comment" } }
next state {todos: { todos: {..0}, isEditing: true, editingId: null }, comments: {..1} }
```

### Custom reducer functions
hello

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

## Community

Feel free to tweet your questions, concerns, ideas, or appreciation to @alexfreska.
We also plan to create a Spectrum community chat.


<br>
<p align="center"><img height="55px" src="https://raw.githubusercontent.com/redux-enterprise/redux-enterprise/master/images/logo-pad-right.png" alt="🚀"></p>
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
  <a href="http://www.typescriptlang.org/index.html"><img src="https://badges.frapsoft.com/typescript/version/typescript-next.svg" alt="Standard - JavaScript Style Guide"></a>
</p>

>👋 Welcome! Make sure to explore our [issues](https://github.com/redux-enterprise/redux-enterprise/issues), and feel free to ask any questions you may have!

<br>

**TLDR**

Automatically create standard reducers, actions, and selectors by describing your core application state using a library of [reducer definitions](#reducer-definitions). _The 12 lines of code below replaces 500+ lines of typical Redux code_
```sh
yarn add redux-enterprise
```
```js
import { createReducers, Definitions } from 'redux-enterprise'
const { Collection, Flag, Field, Index } = Definitions

const { actions, reducers, selectors } = createReducers({
  todos: Collection,
  selectedIds: Index,
  todoEditor: {
    isEditing: Flag,
    editingId: Field
  }
})
```

+ [**Overview**](#overview)
  + [Whats the mission?](#whats-the-mission)
  + [Whats included?](#whats-included)
+ [**👇🏽Get up and running in 5 minutes!**](#get-up-and-running-in-5-minutes)
+ [**Concepts**](#concepts)
  + [createReducers](#createreducers)
  + [Actions](#actions)
  + [Selectors](#selectors)
  + [REPL](#redux-repl)
  + [InitialState & Parameters](#initialstate--parameters)
  + [Custom reducer functions](#custom-reducer-functions)
    + [Nesting & scoping](#nesting--scoping)
  + [Shortcut globals](#shortcut-globals)
 + [**Reducer Definitions**](#reducer-definitions)
   + [Collection](#collection)
   + [Field](#field)
   + [Flag](#flag)
   + [Index](#index)
   + [Custom Reducer Definitions](#custom-reducer-definitions)
+ [**Appendix**](#appendix)
  + [Typescript](#typescript)
  + [Boilerplates & Examples](#boilerplates--examples)
  + [FAQ](#faq)
  + [Contributing](#contributing)
 
## Overview
Inspired by lessons learned building enterprise UIs, Redux Enterprise is a library that **abstracts common Redux reducer patterns into a library of reusable reducer definitions** that can be composed to describe and automatically create completely standardized actions, reducers, and selectors.

### Whats the mission?
To help teams and organizations scale development, maintainability, and velocity on Redux-based projects.

> Redux Enterprise is 100% compatible with any existing Redux-based project.

### Whats included?
- Library of reusable reducer definitions (Flag, Field, Collection, Index, etc)
- Standard way to describe, name, scope, update, and derive application state
- In-browser Redux-REPL for interacting with running application

## Get up and running in 5 minutes!

### Install the package
```sh
yarn add redux-enterprise
```

### Model your state
Use Redux Enterprise's reducer definitions to model your reducers. Definitions can be nested to provide logical grouping and scope. Create a new file (eg: `reducers.js`) and paste the code below into your project. 

```js
import { createReducers, Definitions } from 'redux-enterprise'
const { Collection, Flag, Field, Index } = Definitions

const { reducers } = createReducers({
  todos: Collection,
  selected: Index,
  todoEditor: {
    isEditing: Flag,
    editingId: Field
  }
})
// `reducers` contains three reducers:
// { todos: fn, todoEditor: fn, selected: fn }

export { reducers }
```

### Add the new reducers
Import the `reducers` from the call to `createReducers` and add them into your `combineReducers` call.
```js
import { reducers } from './reducers.js'

const rootReducer = combineReducers({
  existingReducer,
  anotherReducer,
  ...reducers // <-- add them
})
```

### Setup the REPL with your store
Right after your call to Redux's `createStore` start the Redux Enterprise REPL:
```js
import { startRepl } from 'redux-enterprise'

...

const store = createStore(rootReducer, initialState, applyMiddleware(..))

startRepl(store)
```
> Note: when server-side rendering this call will be a no-op.

### All done! Try things in your browser console
<img  width="100%" src="https://raw.githubusercontent.com/redux-enterprise/redux-enterprise/typescript/images/test-repl.png" />

# Concepts

## createReducers
As shown above your core application state is described using a library of [reducer definitions](#reducer-definitions). `createReducers` takes these definitions and creates reducers for you with corresponding actions and selectors. Definitions can be nested to provide logical grouping and scope.
```js
import { createReducers, Definitions } from 'redux-enterprise'
const { Collection, Flag, Field, Index } = Definitions

const { actions, reducers, selectors } = createReducers({
  todos: Collection,
  selected: Index,
  todoEditor: {
    isEditing: Flag,
    editingId: Field
  }
})
```
> Each top-level key in the `createReducers` schema generates a separate reducer.

## Actions
Standardized [FSA](https://github.com/redux-utilities/flux-standard-action) `actions` are returned from `createReducers` calls. The reducer definition determines what actions are available. For example a `Collection` has actions `create`, `upsert`, `remove`, `set`, `reset`, `clear`. Learn more about what actions are available and what their expected payloads look like the [reducer definitions](#reducer-definitions) section.

```js
const { todos, todoEditor, notifications } = actions

todos.create({ id: 13, message: 'Do thee laundry' })
// { type: 'todos/create', payload: { id: 13, message: 'Do thee laundry' } }

todos.update({ id: 13, message: 'Do the laundry' })
// { type: 'todos/update', payload: { id: 13, message: 'Do the laundry' } }

todoEditor.editingId.set(37)
// { type: 'todoEditor/editingId/set', payload: 37 }

todos.remove(37)
// { type: 'todos/remove', payload: 37 }

selected.add(13)
// { type: 'selected/add', payload: 13 } }

selected.clear()
// { type: 'selected/clear' }
```

> ⚠️ Remember that these are action creators. The actions must be dispatched just like any other actions!

## Selectors
Selectors are also returned from `createReducers`. For example a `Collection` has `items`, `find`, and `ids`:
```js
const { todos, todoEditor, selected } = selectors

todos.items(state) // returns a collection of todos
todos.find(state, { id }) // returns a todo with matching `id`
todos.ids(state) // returns an array of ids
```
> These selectors are perfect for feeding into [Reselect](https://github.com/reactjs/reselect)

## Redux-REPL
When in dev-mode Redux Enterprise automatically provides a REPL-like experience in the browser console for dispatching pre-bound actions and selectors. Actions and selectors from all `createReducers` calls are available in the REPL.

<img  width="100%" src="https://raw.githubusercontent.com/redux-enterprise/redux-enterprise/typescript/images/repl.gif" />

> For your convenience unlike normal actions and selectors, calls to actions and selectors in the browser console are pre-bound to `store.dispatch` and `store.getState`. Remember, only in the console!

To setup the REPL, import `startRepl` and call it on your project's `store` object.
```js
import { startRepl } from 'redux-enterprise'

...

const store = createStore(rootReducer, initialState, applyMiddleware(..))

startRepl(store)
```

## InitialState & Parameters
Reducer definitions can also be invoked to provide any parameters. All definitions accept `initialState`.
```js
import { createReducers, Definitions } from 'redux-enterprise'
const { Collection, Flag, Field } = Definitions

const { reducers } = createReducers({
  todoEditor: {
    isEditing: Flag({
	  initialState: true
	}),
    editingId: Field({
      initialState: 'fooId'
    })
  }
})
```

## Custom reducer functions
Redux Enterprise also allows you to create custom reducer functions. If a function is added anywhere in the reducer map, `createReducers` passes the function the reducer's `state` and incoming `action`:
```js
import { createReducers, Definitions } from 'redux-enterprise'
const { Collection, Flag, Field } = Definitions

const { reducers, actions } = createReducers({
  todoEditor: {
    isEditing: Flag,
    editingId: Field,
    customReducerFunction: (state, action) => {
      // do anything I please with the `todoEditor` reducer
      return state
    }
  }
})

actions.todoEditor.customReducerFunction('morty')
// { type: 'todoEditor/customReducerFunction', payload: 'morty' }
```
As shown above, the corresponding action creator is available on the actions object.

### Nesting & scoping
If you nest a function, the `state` passed in will be scoped to that level of state automatically:
```js
const { reducers } = createReducers({
  nested: {
    stuff: {
      someId: Field,
      aontherId: Field,
      nestedCustomReducerFunction: (state, action) => {
        // here `state` is scoped to `nested.stuff`,
        // so we are reducing: ({ someId, anotherId }, action)
        return state
      }
    }
  }
})
```

## Shortcut globals
For your convenience, Redux Enterprise also exports `Actions` and `Selectors` objects which hold actions and selectors from all `createReducers` calls.

```js
import { Actions, Selectors } from 'redux-enterprise'

Actions.todoEditor.editingId.set(37)
// { type: 'todoEditor/editingId/set', payload: 37 }
```

# Reducer Definitions
Redux Enterprise provides a handful of reducer definitions that can be found by importing the `Definitions` object. Reducer definitions aim to be low-level enough to be generic but high level enough to abstract state patterns common to all applications.

## Collection
Collection of `Entities`. `Entities` are objects with `id` properties. Entities can take any form as long as they at least have an id. Collection is internally stored in normalized form: `{ ids, entities }` where `ids` is an array of unique `id` keys and `entities` is an `id`-based lookup map.

`Id = string`
`Entity = { id: Id }`

### Actions
`set(payload: Entity[])`
Takes an array of entities. Resets entire Collection to the payload of entities.

`reset(void)` 
Resets the entire Collection to empty state.

`create(payload: Entity)` 
Takes an Entity and adds it to the collection. Warning will be logged if an entity with the `id` already exists.

`update(payload: Entity)`
Takes an Entity and updates it in the collection. Warning will be logged if an entity with the `id` did not exist.

`upsert(payload: Entity)`
Takes an Entity and updates it in the collection. The entity will be added if an entity with the `id` does not exist.

`remove(payload: Id)`
Takes an Id and removes any existing entity with the `id`.

### Selectors
`all(state: {}): Entity[]`
Returns array of entities.

`ids(state: {}): Id[]`
Returns array of ids.

`find(state: {}, params: { id: Id }): Entity`
Returns entity that matches id parameter.

`get(state: {}) => Normalized`
Returns the full underlying data structure of ids and entities.

## Field
A basic value of any type.

### Actions
`set(payload: any)`
Takes a value and sets it.

`clear(void)`
Clears any currently set value.

### Selectors
`get(state: {}): any`
Returns the value.

`isSet(state: {}): boolean`
Returns a boolean specifying whether a value is set.

## Flag
A boolean value that can be toggled.

### Actions
`set(payload?: boolean)`
Sets value to true or optional payload's boolean value.

`unset(void)`
Sets value to false.

`toggle(void)`
Toggles current value.

### Selectors
`get(state: {}): boolean`
Returns the current boolean value.

## Index
A set of unique identifying values.

`Id = string`

### Actions
`set(payload: Id[])`
Takes an array of identifiers. Resets entire Index to the payload.

`reset(void)`
Resets entire Index to empty.

`toggle(payload: Id)`
Takes an identifier and toggles its presence in the Index.

`add(payload: Id)`
Takes an identifier and ensures its presence in the Index.

`remove(payload: Id)`
Takes an identifier and ensures its removal from the Index.

### Selectors
`get(state: {}): Ids[]`
Returns the entire Index array.

`includes(state: {}, { id: Id }): boolean`
Takes id parameter and checks whether the identifier is present in the Index, returns boolean value.

### Example Usage
- Keeping track of what Todos are multi-selected.
- What emails are unread.


## Custom Reducer Definitions
Create new Reducer Definitions with the `createDefinition` function. The resulting object is a valid reducer definition that can be used.
```js
import { createDefinition } from 'redux-enterprise'

const Morty = createDefinition({
  defaultState: 'morty',
  reducers: {
    set: (state, { payload }) => payload,
    clear: () => undefined,
  },
  selectors: {
    get: (state) => state
  }
})

export Morty
```
<details>
<summary><b>Typescript version</b></summary>

```ts
import { createDefinition } from 'redux-enterprise'

type State = string

const Morty = createDefinition({
  defaultState: 'morty' as State,
  reducers: {
    set: (state: State, { payload }: { payload: string }): State => payload,
    clear: (state: State) => undefined,
  },
  selectors: {
    get: (state: State): State => state
  }
})

export Morty
```
</p>
</details>

### Usage
```js
import { createDefinition } from 'redux-enterprise'
import { Morty } from './morty'

const { reducers } = createReducers({
  rick: Morty
})
```

# Appendix

## Typescript
Redux Enterprise is written in Typescript and comes with type declarations.

Coming in version 0.0.7 all actions returned from `createReducers` will have typed payloads! ✨

## Boilerplates & Examples
- [NextJS](https://github.com/redux-enterprise/redux-enterprise-nextjs-example)
- NextJS Typescript  [Help with this](https://github.com/redux-enterprise/redux-enterprise/issues/17)
- Create React App [Help with this](https://github.com/redux-enterprise/redux-enterprise/issues/16)
- Create React App Typescript [Help with this](https://github.com/redux-enterprise/redux-enterprise/issues/18)


PRs with other examples are appreciated!

## FAQ
Coming soon!

## Contributing

Please check out the [Contributing](https://github.com/redux-enterprise/redux-enterprise/blob/master/CONTRIBUTING.md) page to learn how to get involved.


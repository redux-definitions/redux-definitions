
<br>
<p align="center"><img height="55px" src="https://raw.githubusercontent.com/redux-definitions/redux-definitions/master/images/logo-pad-right.png" alt="🚀"></p>
<h1 align="center">
  Redux Definitions
  <br>
  <br>
</h1>

<p align="center">
  <a href="https://travis-ci.org/redux-definitions/redux-definitions"><img src="https://img.shields.io/travis/redux-definitions/redux-definitions/master.svg" alt="travis"></a>
  <a href="https://www.npmjs.com/package/redux-definitions"><img src="https://img.shields.io/npm/v/redux-definitions.svg" alt="npm version"></a>
  <a href="https://spectrum.chat/redux-enterprise"><img src="https://withspectrum.github.io/badge/badge.svg" alt="Join the community on Spectrum"></a>
  <a href="https://www.npmjs.com/package/redux-definitions"><img src="https://img.shields.io/npm/dm/redux-definitions.svg" alt="npm downloads"></a>
  <a href="http://www.typescriptlang.org/index.html"><img src="https://badges.frapsoft.com/typescript/version/typescript-next.svg" alt="Typescript - Next"></a>
</p>

```sh
yarn add redux-definitions
```

**TLDR - Define and share reusable slices of Redux.**

Common reducer patterns always get recycled, write them once and then never repeat yourself again! Use new and existing [definitions](#reducer-definitions) to automatically generate namespaced reducers, actions, and selectors.

> _The example below implements the Redux code necessary for a basic shopping experience in 12 lines of code. This is achieved by leveraging an existing Collection definition and creating a custom Cart definition._
```js
import { createReducers, createDefinition, Definitions } from 'redux-definitions'
const { Collection } = Definitions

const Cart = createDefinition({
  defaultState: [],
  reducers: {
    addItem: (state, { payload }) => state.push(payload),
    clearItems: () => [],
  },
  selectors: {
    getTotal: (state) => state.reduce((total, item) => total + item.price, 0)
  }
})

const { actions, reducers, selectors } = createReducers({
  shopping: {
    items: Collection,
    cart: Cart
  }
})
```
**BONUS**

Use the browser console to call actions and selectors against the running Redux application.
  
<img  width="100%" src="https://raw.githubusercontent.com/redux-definitions/redux-definitions/master/images/repl-and-app-small.gif" />

# Table of Contents
+ [**Overview**](#overview)
  + [Objective](#objective)
  + [Whats included?](#whats-included)
+ [**Installation**](#installation)
+ [**Concepts**](#concepts)
  + [createReducers](#createreducers)
  + [Actions](#actions)
  + [Selectors](#selectors)
  + [REPL](#redux-repl)
  + [InitialState](#initialstate)
 + [**Reducer Definitions**](#reducer-definitions)
   + [Field](#field)
   + [Flag](#flag)
   + [Record](#record)
   + [Collection](#collection)
   + [Index](#index)
   + [Custom Reducer Definitions](#custom-reducer-definitions)
+ [**Roadmap**](#roadmap)
+ [**Appendix**](#appendix)
  + [Typescript](#typescript)
  + [Examples](#examples)
  + [FAQ](#faq)
  + [Contributing](#contributing)
 
# Overview
Inspired by lessons learned building countless UIs, Redux Definitions is a library that **abstracts common Redux reducer patterns into reusable definitions** that can be shared and used to generate standardized and logically related actions, reducers, and selectors.

> Redux Definitions is 100% compatible with any existing Redux-based project.

## Objective
To help organizations scale development, maintainability, and velocity on Redux-based projects.

## Whats included?
- Library of reusable reducer definitions (Flag, Field, Collection, Index, etc)
- Automatically generated actions, reducers, and selectors.
- In-browser Redux-REPL for interacting with running application.


## Installation
```sh
yarn add redux-definitions
```

# Concepts

## createReducers
As shown above your core application state is described using a library of [reducer definitions](#reducer-definitions). `createReducers` takes these definitions and creates reducers for you with corresponding actions and selectors.
```js
import { createReducers, Definitions } from 'redux-definitions'
const { Collection, Flag, Field, Index } = Definitions

const { actions, reducers, selectors } = createReducers({
  todoList: {
    todos: Collection,
    completedIds: Index,
    selectedIds: Index
  },
  todoEditor: {
    isEditing: Flag,
    editingId: Field
  }
})
```
> Each top-level key in the `createReducers` schema generates a separate reducer.

## Actions
Action creator functions are returned from `createReducers` calls as `actions`. The reducer definition determines what actions are available. For example a `Collection` has actions `create`, `upsert`, `remove`, `set`, `reset`, `clear`. Learn more about what actions are available and what their expected payloads look like the [reducer definitions](#reducer-definitions) section.

```js
const { todoList, todoEditor } = actions

todoList.todos.create({ id: '1', message: 'Do thee laundry' })
// { type: 'todos/create', payload: { id: '1', message: 'Do thee laundry' } }

todosList.todos.update({ id: '1', message: 'Do the laundry' })
// { type: 'todos/update', payload: { id: '1', message: 'Do the laundry' } }

todoEditor.editingId.set('1')
// { type: 'todoEditor/editingId/set', payload: '1' }

todoList.todos.remove('1')
// { type: 'todos/remove', payload: '1' }

todoList.selectedIds.add('1')
// { type: 'selected/add', payload: '1' } }

todoList.selectedIds.clear()
// { type: 'selected/clear' }
```

## Selectors
Selectors are also returned from `createReducers`. For example a `Collection` has `all`, `find`, `ids`, and `count`:
```js
const { todoList, todoEditor } = selectors

todoList.todos.all(state) // returns a collection of todos
todoList.todos.find(state, { id }) // returns a todo with matching `id`
todoList.todos.ids(state) // returns an array of ids
```

> These selectors are perfect for feeding into [Reselect](https://github.com/reactjs/reselect)

## Redux-REPL
When in dev-mode Redux Definitions automatically provides a REPL-like experience in the browser console for dispatching pre-bound actions and selectors. Actions and selectors from all `createReducers` calls are available in the REPL.

<img  width="100%" src="https://raw.githubusercontent.com/redux-definitions/redux-definitions/master/images/repl-and-app-small.gif" />

> For your convenience unlike normal actions and selectors, calls to actions and selectors in the browser console are pre-bound to `store.dispatch` and `store.getState`. Remember, only in the console!

To setup the REPL, import `startRepl` and call it on your project's `store` object.
```js
import { startRepl } from 'redux-definitions'

...

const store = createStore(rootReducer, initialState, applyMiddleware(..))

startRepl(store)
```
> Note: when server-side rendering this call will be a no-op.

## InitialState
All reducer definitions accept `initialState` values.
```js
import { createReducers, Definitions } from 'redux-definitions'
const { Collection, Flag, Field } = Definitions

const { reducers } = createReducers({
  todoList: {
    todos: Collection({
      initialState: [{ id: '1', message: 'Do the laundry' }]
    }),
    completedIds: Index({
      initialState: ['1']
    }),
    selectedIds: Index
  },
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

# Reducer Definitions
Redux Definitions provides an assortment of reducer definitions that can be found by importing the `Definitions` object. Reducer definitions aim to be low-level enough to be generic but high level enough to abstract state patterns common to all applications.

## Field
Field creates a simple reducer that stores any value and comes with action types that set and clear.

### Actions
`set(payload: any)`
Sets Field to payload value.

`clear(void)`
Clears current Field state.

### Selectors
`get(state: {}): any`
Returns the Field state.

`isSet(state: {}): boolean`
Returns a boolean specifying whether a Field value is set.

## Record
Record creates a reducer that stores an object. The object can be set or updated (similar to setState).

### Actions
`set(payload: {})`
Sets Record state to payload object.

`update(payload: {})`
Merges payload object into the current Record state.

`clear(void)`
Clears Record and sets it to an empty object.

### Selectors
`get(state: {}, keys?: string|string[]): {}`
Returns the Record object, optionally takes keys to return a subset of the Record.

`keys(state: {}): string[]`
Returns an array of the Record's existing key names.

## Flag
Flag creates a reducer that stores a boolean value and comes with actions for setting and toggling.

### Actions
`set(payload?: boolean)`
Sets Flag to true or to the optional payload's boolean value.

`unset(void)`
Sets Flag to false.

`toggle(void)`
Toggles Flag value.

### Selectors
`get(state: {}): boolean`
Returns the current Flag value.

## Collection
Collection creates a reducer that stores `Entities`. `Entities` are objects with `id` properties. Entities can take any form as long as they at least have an id. 

`Id = string`
`Entity = { id: Id }`

### Actions
`set(payload: Entity[])`
Takes an array of entities. Resets entire Collection to the payload of entities.

`reset(void)` 
Resets the entire Collection to empty.

`create(payload: Entity)` 
Takes an Entity and adds it to the Collection. Warning will be logged if an entity with the `id` already exists.

`update(payload: Entity)`
Takes an Entity and updates it in the Collection. Entity is not added unless an entity with the `id` already exist.

`upsert(payload: Entity)`
Takes an Entity and updates it in the Collection. The entity will be added if an entity with the `id` does not exist.

`remove(payload: Id|Id[])`
Takes an Id and removes any existing entity with the `id`.

### Selectors
`all(state: {}): Entity[]`
Returns array of entities.

`ids(state: {}): Id[]`
Returns array of ids.

`find(state: {}, params: { id: Id }): Entity`
Returns entity that matches id parameter.

`count(state: {}) => number`
Returns the number of entities in the Collection.

`get(state: {}) => Normalized`
Returns the full underlying data structure which takes the form: `{ ids, entities }` where `ids` is an array of unique `id` keys and `entities` is an `id`-based lookup map.of ids and entities.

## Index
Index creates a reducer that stores a unique set of ids. Ids can be added, removed, and toggled. An Index is perfect for 

`Id = string`

### Actions
`set(payload: Id[])`
Takes an array of identifiers. Resets entire Index to the payload.

`reset(void)`
Resets entire Index to empty.

`toggle(payload: Id)`
Takes an identifier and toggles its presence in the Index.

`add(payload: Id|Id[])`
Takes an identifier(s) and ensures its presence in the Index.

`remove(payload: Id|Id[])`
Takes an identifier(s) and ensures its removal from the Index.

### Selectors
`get(state: {}): Ids[]`
Returns the entire Index array.

`includes(state: {}, { id: Id }): boolean`
Takes id parameter and checks whether the identifier is present in the Index, returns boolean value.

`count(state: {}) => number`
Returns the number of Ids in the Index.

## Custom Reducer Definitions
Create new reducer definitions with the `createDefinition` function. The resulting object is a valid definition that can be used.
```js
import { createDefinition } from 'redux-definitions'

const SpecialField = createDefinition({
  defaultState: 'morty',
  reducers: {
    set: (state, { payload }) => payload,
    clear: () => undefined,
  },
  selectors: {
    get: (state) => state
  }
})

export { SpecialField }
```

### Usage
```js
import { createReducers } from 'redux-definitions'
import { SpecialField } from './specialField'

const { reducers } = createReducers({
  people: {
    rick: SpecialField
  }
})
```

# Roadmap
1. Full TypeScript support
   - typed action and selector maps
   - typed action and selector payloads
2. Support for adding additional user created actions to the REPL
   - Helpful for making existing actions/reducers accessible by the REPL
3. createSagas helper for creating actions that initiate sagas and add actions to REPL
4. Research how to best add async saga support within definitions
   - Most asynchronous business logic will involve multiple reducers and therefore should not be associated with a single reducer or definition. Business logic should use createSagas and live in its own user defined directory/file. That being said the library should support adding basic asynchronous code to definitions.

# Appendix

## Typescript
Redux Definitions is written in TypeScript. Due to the generative nature of the library fully typed actions, reducers, and selectors have proven difficult to implement. The goal is to get to the point where all actions and reducers have fully typed payloads. ✨Contributions from anyone with ideas on how to achieve this are very appreciated! Feel free to open a Github [issue](https://github.com/redux-definitions/redux-definitions/issues/new) or start a conversation on [Spectrum](https://spectrum.chat/redux-definitions) with any thoughts or ideas.

## Examples
- [NextJS](https://github.com/redux-definitions/redux-definitions-nextjs-example)
- NextJS Typescript  [Help with this](https://github.com/redux-definitions/redux-definitions/issues/17)
- Create React App [Help with this](https://github.com/redux-definitions/redux-definitions/issues/16)
- Create React App Typescript [Help with this](https://github.com/redux-definitions/redux-definitions/issues/18)

PRs with other examples are appreciated!

## FAQ
Coming soon!

## Contributing

Please check out the [Contributing](https://github.com/redux-definitions/redux-definitions/blob/master/CONTRIBUTING.md) page to learn how to get involved.

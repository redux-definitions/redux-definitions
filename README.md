# 🚀  Redux Enterprise [![Build Status](https://travis-ci.org/redux-enterprise/redux-enterprise.svg?branch=master)](https://travis-ci.org/redux-enterprise/redux-enterprise)

### Overview

Library for scaling Redux based projects by promoting the use of consistent and standardized reducer and actions. As projects grow it quickly becomes critical to keep reducers lean, map actions to specific reducer handlers, and to standardize handling and naming for the typical best data structures found in redux.

Redux Enterprise allows you to describe your core application state using a collection of high level data structures:
```js
import { Model, Types } from 'redux-enterprise'
const { Collection, Flag } = Types

Model({
  todos: {
    todos: Collection,
    isEditing: Flag
  },
  comments: Collection
})
```

The library generates reducers and actions that can seamlessly be introduced into existing Redux projects. The standardized actions are automatically available on the Actions object:
```js
import { Actions } from 'redux-enterprise'

Actions.Todos.isEditing.set()
Actions.Todos.todos.add({ id: 1, message: 'Hello Burp Morty' })
Actions.Todos.todos.upsert({ id: 1, message: 'Hello Morty' })
```

When in dev mode Redux Enterprise also automagically provides an in-browser REPL for dispatching prebound actions or exploring data selectors:
<img src="images/repl.gif" />

### Installation

```sh
yarn add redux-enterprise
```



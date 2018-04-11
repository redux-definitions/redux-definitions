import Re from '../src'
const { Collection, Setable, Flag, State } = Re

Re.Model({
  layout: {
    blocks: SetableMap,
  },
  search: {
    query: Setable,
    pagination: Paginator,
  },
  videos: Collection,
  ads: Collection,
})

export const isFunction = (i: any): boolean => typeof i === 'function'
export const isObject = (i: any): boolean => typeof i === 'object'
export const isReducerDefinition = (i: any) => i.generate && (typeof i.generate === 'function')

export const getActionType = (namespacing: string[], key?: string): string => {
  const namespace = namespacing.join('/')

  if (key) {
    return `${namespace}/${key}`
  } else {
    return namespace
  }
}

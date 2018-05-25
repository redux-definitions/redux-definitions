/* tslint:disable */
export const makeError = (message: string): Error =>
  Error(`Redux Enterprise\n\n${message}`)
export const logWarning = (message: string): void =>
  console.warn(`Redux Enterprise\n\n${message}\n`)
export const log = (message: string): void =>
  console.log(`Redux Enterprise\n\n${message}\n`)
/* tslint:enable */

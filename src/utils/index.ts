export const isTest: boolean = process && process.env.NODE_ENV === 'test'
export const isDev: boolean = process && process.env.NODE_ENV === 'development'
export const isProduction: boolean = process && process.env.NODE_ENV === 'production'
export const isBrowser: boolean = process && process.title === 'browser'

/* tslint:disable */
export const makeError = (message: string): Error =>
  Error(`Redux Definitions\n\n${message}`)
export const logWarning = (message: string): void => {
  if (!isProduction) {
    console.warn(`Redux Definitions\n\n${message}\n`)
  }
}
export const log = (message: string): void => {
  if (!isProduction) {
    console.log(`Redux Definitions\n\n${message}\n`)
  }
}
/* tslint:enable */
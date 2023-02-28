class DhnUiError extends Error {
  constructor (m: string) {
    super(m)
    this.name = 'CDhnActUIError'
  }
}
export default (scope: string, m: string) => {
  throw new DhnUiError(`[${scope}] ${m}`)
}

export function warn (scope: string, m: string) {
  console.warn(new DhnUiError(`[${scope}] ${m}`))
}

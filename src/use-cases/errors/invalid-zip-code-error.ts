export class InvalidZipCodeError extends Error {
  constructor() {
    super('ZIP code not found.')
  }
}

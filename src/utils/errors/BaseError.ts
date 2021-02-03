export class BaseError extends Error {
  readonly code: number;

  constructor(code: number, msg: string) {
    super(msg);

    this.code = 400;
  }
}


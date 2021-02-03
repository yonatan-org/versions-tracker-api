import { BaseError } from "./BaseError";

export class BadRequestError extends BaseError {
  constructor(msg: string) {
    super(400, msg);

    this.name = this.constructor.name;
    this.message = msg;
  }
}


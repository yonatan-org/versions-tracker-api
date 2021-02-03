import { BaseError } from "./BaseError";

export class UnauthorizedError extends BaseError {
  constructor(msg: string) {
    super(401, msg);

    this.name = this.constructor.name;
    this.message = msg;
  }
}


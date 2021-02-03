import { BaseError } from "./BaseError";

export class NotFoundError extends BaseError {
  constructor(msg: string) {
    super(404, msg);

    this.name = this.constructor.name;
    this.message = msg;
  }
}


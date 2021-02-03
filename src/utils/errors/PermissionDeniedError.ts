import { BaseError } from "./BaseError";

export class PermissionDeniedError extends BaseError {

  constructor(msg: string) {
    super(403, msg);

    this.name = this.constructor.name;
    this.message = msg;
  }
}


import { MongoServerError } from "mongodb";

class ErrorMessage {
  success: boolean;
  error: any;
  status: number;

  constructor(success: boolean, error: any, status: number) {
    this.success = success;
    this.error = error;
    this.status = status;
  }
}

export class ErrorHandler {
  static sendErrorMessage(error: MongoServerError) {
    if (error.code === 11000) {
      return new ErrorMessage(false, "This username is already in use!", 400);
    } else {
      return new ErrorMessage(false, error, 400);
    }
  }
}

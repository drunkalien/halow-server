import { MongoServerError } from "mongodb";

export class ErrorHandler {
  static sendErrorMessage(error: MongoServerError) {
    if (error.code === 11000) {
      return {
        success: false,
        error: "This username is already in use!",
        status: 400,
      };
    } else {
      return {
        success: false,
        error: error,
        status: 400,
      };
    }
  }
}

exports.OslashException = class OslashException extends Error {
    constructor(errorCode, errorMessage) {
      super();  
      this.errorCode = errorCode;
      this.errorMessage = errorMessage;
    }
  };
  
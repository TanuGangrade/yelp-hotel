class ExpressError extends Error { //ExpressEroor inherits from Error
    constructor(message, statusCode) {
        super();// super is used to gain access to the parent class functions
        this.message = message;
        this.statusCode = statusCode;
    }
}

module.exports = ExpressError;
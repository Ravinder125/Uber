class ApiResponse {
    constructor(status, data = null, error = [], message = '') {
        this.success = status >= 200 && status < 300;
        this.status = status;
        this.data = data;
        this.error = Array.isArray(error) ? error : [error]; // Always an array
        this.message = message;
    }

    static success(status, data, message = 'Success') {
        return new ApiResponse(status, data, [], message);
    }

    static error(status, error, message = 'Error') {
        return new ApiResponse(status, null, error, message);
    }
}

module.exports = { ApiResponse };

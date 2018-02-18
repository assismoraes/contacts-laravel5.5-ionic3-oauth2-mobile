export class ErrorsHandler {
    public static handler(error): string {
        switch (error.status) {
            case 401: {
                return 'Not authorized. Try again.';
            };
            case 400: {
                return 'The server cannot or will not process the request due to an apparent client error. Verify your data you are trying to send and try again.';
            };
            default: {
                return 'Server error. Try again later.';
            }
        }
    }
}
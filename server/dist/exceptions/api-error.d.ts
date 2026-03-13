declare class ApiError extends Error {
    status: number;
    errors: any[];
    constructor(status: number, message: string, errors?: any[]);
    static UnauthorizedError(): ApiError;
    static BadRequest(message: string, errors?: any[]): ApiError;
}
export default ApiError;
//# sourceMappingURL=api-error.d.ts.map
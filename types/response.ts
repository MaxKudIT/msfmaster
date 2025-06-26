export type SuccessResponse<T> = {
    data: T
    success: boolean
}

export type ErrorResponse = {
    error: string
}
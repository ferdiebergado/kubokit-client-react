export interface APIResponse<T, E> {
    message: string
    data?: T
    error?: E
}

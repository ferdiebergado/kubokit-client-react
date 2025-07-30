export type APIResponse<T, E> = {
    message: string
    data?: T
    error?: E
}

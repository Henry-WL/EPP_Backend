class HttpError extends Error {
    constructor(message:string, errorCode:number) {
        super(message)
         // @ts-ignore
        this.code = errorCode
    }
}

export default HttpError;
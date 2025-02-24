export class API_Result {
    message: string;
    status: "success" | "error";
    data: any;

    constructor(data: any) {
        this.message = data.message;
        this.status = data.status;
        this.data = data.data;
    }

    isSuccess(): boolean {
        return this.status === "success";
    }

    isError(): boolean {
        return this.status === "error";
    }
}

export function responseSuccess(message: string, data: any = {}, status = HTTP.OK): Response {
    return new Response(JSON.stringify({
        message: message,
        status: "success",
        data: data
    }), { status: status });
}

export function responseError(message: string, status: number): Response {
    return new Response(JSON.stringify({
        message: message,
        status: "error"
    }), { status: status });
}

export async function post(route: string, data: any): Promise<API_Result> {
    const json = await fetch(route, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => res.json());
    console.log("Got the result: " + json);
    return new API_Result(json);
}

export async function get(route: string): Promise<API_Result> {
    const json = await fetch(route, {
        method: "GET"
    }).then(res => res.json());
    return new API_Result(json);
}

export namespace HTTP {
    export const OK = 200;
    export const CREATED = 201;
    export const BAD_REQUEST = 400;
    export const UNAUTHORIZED = 401;
    export const NOT_FOUND = 404;
    export const INTERNAL_SERVER_ERROR = 500;
    export const NOT_IMPLEMENTED = 501;
}
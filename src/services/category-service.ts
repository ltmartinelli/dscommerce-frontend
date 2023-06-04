import { AxiosRequestConfig } from "axios";
import { requestBackEnd } from "../utils/requests";

export function findAllRequest()
{
    const config: AxiosRequestConfig = {
        method: "GET",
        url: "/categories",
    }

    return requestBackEnd(config);
}
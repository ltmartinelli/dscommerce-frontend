import axios, { AxiosRequestConfig } from "axios";
import { requestBackEnd } from "../utils/requests";

export function findPageRequest(page: number, name: string, size = 12, sort = "name")
{
    const config: AxiosRequestConfig = {
        method: "GET",
        url: "/products",
        params: {
            page,
            name,
            size,
            sort,
        }
    }

    return requestBackEnd(config);
}

export function findById(id: number)
{
    return requestBackEnd({ url: `/products/${id}` })
}

export function deleteById(id: number)
{

    const config: AxiosRequestConfig = {
        method: "DELETE",
        url: `products/${id}`,
        withCredentials: true,
    }

    return requestBackEnd(config);
}

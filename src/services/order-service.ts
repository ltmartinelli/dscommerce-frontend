import { AxiosRequestConfig } from "axios";
import { requestBackEnd } from "../utils/requests";
import { OrderDTO } from "../models/order";

export function findByIdRequest(id: number)
{
    const config: AxiosRequestConfig = {
        url: `/orders/${id}`,
        withCredentials: true,
    }

    return requestBackEnd(config);
}

export function placeOrderRequest(cart: OrderDTO)
{
    const config: AxiosRequestConfig = {
        url: `/orders`,
        method: "POST",
        withCredentials: true,
        data: cart,
    }

    return requestBackEnd(config);
}
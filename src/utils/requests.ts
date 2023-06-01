import axios, { AxiosRequestConfig } from "axios";
import { BASE_URL } from "./system";

export function requestBackEnd(config: AxiosRequestConfig)
{
    return axios({ ...config, baseURL: BASE_URL });
}
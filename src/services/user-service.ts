import { requestBackEnd } from "../utils/requests";
import * as authService from './auth-service.ts'

export function findMe()
{
    const headers = {
        Authorization: "Bearer " + authService.getAccessToken(),
    }

    return requestBackEnd({ url: `/users/me`, headers: headers });
}

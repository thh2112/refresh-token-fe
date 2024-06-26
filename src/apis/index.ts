import axiosClient from "~/utils/authorizedAxios"
import { API_ROOT } from "~/utils/constants"

export const refreshTokenAPI = (refreshToken: string) => {
    return axiosClient.put(`${API_ROOT}/v1/users/refresh_token`, {refreshToken})
} 
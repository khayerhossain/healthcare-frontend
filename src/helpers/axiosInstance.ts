import { authKey } from "@/constance/authKey";
import { IGenericErrorResponse, ResponseSuccessType } from "@/types";
import { getFromLocalStorage } from "@/utils/local-storage";
import axios from "axios"; // fixed: import axios instead of instance

const instance = axios.create(); // now this works correctly

// set default headers
instance.defaults.headers.post["Content-Type"] = "application/json";
instance.defaults.headers["Accept"] = "application/json";
instance.defaults.timeout = 60000;

// request interceptor
instance.interceptors.request.use(
    function (config) {
        const accessToken = getFromLocalStorage(authKey);
        if (accessToken) {
            config.headers.Authorization = accessToken; // fixed: add "Bearer"
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);
// @ts-ignore
// response interceptor
instance.interceptors.response.use(
    function onFulfilled(response) {

        const responseObject: ResponseSuccessType = {
            data: response?.data?.data,
            meta: response?.data?.meta,
        };
        return responseObject;
    },
    function onRejected(error) {
        const responseObject: IGenericErrorResponse = {
            statusCode: error?.response?.data?.statusCode || 500,
            message: error?.response?.data?.message || "Something went wrong!!!",
            errorMessages: error?.response?.data?.message,
        };
        return responseObject;
        // return Promise.reject(error);
    }
);

export { instance };

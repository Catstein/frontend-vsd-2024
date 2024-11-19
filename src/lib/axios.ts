import axios from "axios";
import { env } from "./env";

// interface IApiErrorResponse<T> {
//   data: T;
//   status: EStatusCode;
//   statusText: string;
// }

// interface IApiError<T = unknown> {
//   response: IApiErrorResponse<T>;
// }

export interface HttpError {
  statusCode: number;
  messages: string[];
  timestamp: string;
  path: string;
}

const odinBaseUrl = env.API_URL;
export const axiosInstance = axios.create({
  baseURL: odinBaseUrl,
});

// axiosInstance.interceptors.request.use((config) => {
//   config.headers["api-key"] = "";
//   return config;
// });

axiosInstance.interceptors.response.use(
  (response) => {
    return {
      ...response,
      data: { statusCode: response.status, ...response.data },
    };
  }
  // ,
  // (error: IApiError<HttpError>) => {
  //   // eslint-disable-next-line no-console
  //   console.log("internal server error?", error.response?.data);

  //   if (error.response?.data?.statusCode === EStatusCode.ServerError) {
  //     return Promise.reject(error.response.data);
  //   }

  //   return Promise.reject(error);
  // }
);

export const api = axiosInstance;

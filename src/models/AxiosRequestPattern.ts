import { AxiosRequestConfig } from "axios";

export interface IAxiosRequestPattern<Payload = unknown> {
  config: AxiosRequestConfig;
  payload: Payload;
}

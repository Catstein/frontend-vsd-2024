"use server";

import { api } from "@/lib/axios";
import { IAxiosRequestPattern } from "@/models/AxiosRequestPattern";
import { IUser } from "@/models/entities/user";

export interface LoginBody {
  email: string;
  password: string;
}

export type LoginResult = {
  token: string;
  userData: Pick<IUser, "uid" | "full_name" | "email">;
};

export async function login({
  payload,
  config,
}: IAxiosRequestPattern<LoginBody>): Promise<LoginResult> {
  const response = await api.post(`/login`, payload, config);
  return response.data;
}

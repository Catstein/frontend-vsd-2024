"use server";

import { api } from "@/lib/axios";
import { IAxiosRequestPattern } from "@/models/AxiosRequestPattern";
import { ISocialService } from "@/models/entities/socialService";

export type UpdateSocialServiceStatusBody = Partial<
  Pick<ISocialService, "uid">
> &
  Partial<Pick<ISocialService, "status">>;

export type createResult = Pick<ISocialService, "uid" | "status">;

export async function handleSocialServiceStatusUpdate({
  payload,
  config,
}: IAxiosRequestPattern<UpdateSocialServiceStatusBody>): Promise<createResult> {
  const response = await api.put(
    `/socialServices/${payload.uid}/status`,
    payload,
    config
  );

  return response.data;
}

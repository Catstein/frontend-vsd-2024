"use server";

import { api } from "@/lib/axios";
import { IAxiosRequestPattern } from "@/models/AxiosRequestPattern";
import { ISocialService } from "@/models/entities/socialService";

type SocialServiceParams = Pick<ISocialService, "uid">;

export type FindManyServicesResult = ISocialService;

export async function getSocialService({
  payload,
  config,
}: IAxiosRequestPattern<SocialServiceParams>): Promise<FindManyServicesResult> {
  const response = await api.get(
    `/public/socialServices/${payload.uid}`,
    config
  );
  console.log("response", response);

  return response.data;
}

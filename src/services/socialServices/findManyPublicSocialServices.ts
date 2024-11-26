"use server";

import { api } from "@/lib/axios";
import { IAxiosRequestPattern } from "@/models/AxiosRequestPattern";
import { ISocialService } from "@/models/entities/socialService";

export interface PublicSocialServiceParams {
  search?: string | undefined;
  categoryUid?: string | undefined;
  page?: number | undefined;
  pageSize?: number | undefined;
}

export interface FindManyServicesResult {
  data: Array<ISocialService>;
  pagination: {
    currentPage: number;
    count: number;
  };
}

export async function findManyPublicSocialServices({
  payload,
  config,
}: IAxiosRequestPattern<PublicSocialServiceParams>): Promise<FindManyServicesResult> {
  config = {
    ...config,
    params: payload,
  };

  const response = await api.get(`/public/socialServices`, config);
  return response.data;
}

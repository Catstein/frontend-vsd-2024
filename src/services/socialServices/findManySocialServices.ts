"use server";

import { api } from "@/lib/axios";
import { IAxiosRequestPattern } from "@/models/AxiosRequestPattern";
import { ISocialService } from "@/models/entities/socialService";
import { ESocialServiceStatus } from "@/models/ESocialServiceStatus";

export interface SocialServiceParams {
  status?: ESocialServiceStatus | undefined;
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

export async function findManySocialServices({
  payload,
  config,
}: IAxiosRequestPattern<SocialServiceParams>): Promise<FindManyServicesResult> {
  config = {
    ...config,
    params: payload,
  };

  const response = await api.get(`/socialServices`, config);
  return response.data;
}

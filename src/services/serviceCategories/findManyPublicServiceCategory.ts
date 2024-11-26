"use server";

import { api } from "@/lib/axios";
import { IAxiosRequestPattern } from "@/models/AxiosRequestPattern";
import { ECategoryStatus } from "@/models/ECategoryStatus";
import { IServiceCategory } from "@/models/entities/serviceCategory";

export interface PublicServiceCategoryParams {
  search?: string | undefined;
  status?: ECategoryStatus;
  page?: number | undefined;
  pageSize?: number | undefined;
}

export interface FindManyServicesResult {
  data: Array<IServiceCategory>;
  pagination: {
    currentPage: number;
    count: number;
  };
}

export async function findManyPublicServiceCategory({
  payload,
  config,
}: IAxiosRequestPattern<PublicServiceCategoryParams>): Promise<FindManyServicesResult> {
  config = {
    ...config,
    params: payload,
  };

  const response = await api.get(`/public/serviceCategory`, config);
  return response.data;
}

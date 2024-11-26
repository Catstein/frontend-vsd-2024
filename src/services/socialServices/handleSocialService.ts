"use server";

import { api } from "@/lib/axios";
import { IAxiosRequestPattern } from "@/models/AxiosRequestPattern";
import { ISocialService } from "@/models/entities/socialService";

export type CreateSocialServiceBody = Partial<Pick<ISocialService, "uid">> &
  Pick<
    ISocialService,
    | "service_name"
    | "service_category"
    | "description"
    | "agent_name"
    | "agent_role"
    | "email"
    | "phone"
    | "website"
    | "organ"
    | "management"
    | "public_unit"
    | "organization"
    | "service_provider"
    | "main_law"
    | "municipal_law"
    | "laws"
    | "naming_of_laws"
    | "status"
  >;

export type createResult = ISocialService;

export async function handleSocialService({
  payload,
  config,
}: IAxiosRequestPattern<CreateSocialServiceBody>): Promise<createResult> {
  let response;

  if (payload.uid !== undefined) {
    response = await api.put(`/socialServices/${payload.uid}`, payload, config);
  } else {
    response = await api.post(`/socialServices/create`, payload, config);
  }

  return response.data;
}

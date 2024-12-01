"use server";

import { api } from "@/lib/axios";
import { IAxiosRequestPattern } from "@/models/AxiosRequestPattern";
import { ISocialService } from "@/models/entities/socialService";

export type CreateSocialServiceBody = Partial<Pick<ISocialService, "uid">> &
  Partial<
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
    > & {
      organ: ISocialService["organ"] | null;
      management: ISocialService["management"] | null;
      public_unit: ISocialService["public_unit"] | null;
      organization: ISocialService["organization"] | null;
      service_provider: ISocialService["service_provider"] | null;
      main_law: ISocialService["main_law"] | null;
      municipal_law: ISocialService["municipal_law"] | null;
      laws: ISocialService["laws"] | null;
      naming_of_laws: ISocialService["naming_of_laws"] | null;
    }
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

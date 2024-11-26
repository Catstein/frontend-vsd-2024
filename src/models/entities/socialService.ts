import { ECategoryStatus } from "../ECategoryStatus";
import { ESocialServiceStatus } from "../ESocialServiceStatus";
import { IServiceCategory } from "./serviceCategory";

export interface ISocialService {
  uid: string;
  service_name: string;
  service_category: {
    uid: IServiceCategory["uid"];
    name?: IServiceCategory["name"];
    status?: ECategoryStatus;
  };
  description: string;
  agent_name: string;
  agent_role: string;
  email?: string;
  phone?: string;
  website: string;
  organ?: string;
  management?: string;
  public_unit?: string;
  organization?: string;
  service_provider?: string;
  main_law?: string;
  municipal_law?: string;
  laws?: string;
  naming_of_laws?: string;
  status?: ESocialServiceStatus;
}

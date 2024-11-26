import { ECategoryStatus } from "../ECategoryStatus";
import { ISocialService } from "./socialService";

export interface IServiceCategory {
  uid: string;
  name: string;
  status: ECategoryStatus;
  socialServices?: ISocialService[];
}

import { observable } from "mobx";

class RoutingService {

    @observable redirect: string;
    public HOME: string = "/";
    public LOGIN: string = "/login";

}

export const Routing = new RoutingService();
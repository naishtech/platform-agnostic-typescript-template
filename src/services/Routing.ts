import { makeObservable, observable } from "mobx";

/**
 * Route state
 */
class RoutingService {

    @observable public redirect: string | null = null;
    public readonly HOME: string = "/";
    public readonly LOGIN: string = "/login";

    constructor() {
        makeObservable(this);
    }

}

export const Routing = new RoutingService();
import { computed, makeObservable, observable } from "mobx";

/**
 * Sample upload state
 */
export class UploadStore {

    @observable public urls: string[] = [];

    constructor() {
        makeObservable(this);
    }

    @computed get imageUrls() {
        return this.urls;
    }

}

export const UploadState = new UploadStore();
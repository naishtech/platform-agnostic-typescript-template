import {observable, computed} from "mobx";

/**
 * Sample upload state
 */
export class UploadStore {

    @observable public urls: string[] = [];

    @computed get imageUrls() {
        return this.urls;
    }

}

export const UploadState = new UploadStore();
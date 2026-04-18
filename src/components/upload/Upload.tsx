import * as React from "react";
import { observer } from "mobx-react";
import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import { Messages } from "../../services/Messages";
import { UploadState } from "./UploadState";

/**
 * Sample Upload / download / delete
 */

declare const window: {
    File: any;
    FileReader: any;
    FileList: any;
    Blob: any;
};

const uploadFolder = "shakeout-tests";

@observer
export default class Upload extends React.Component {

    constructor(props: any) {
        super(props);
        this.getImages();
    }

    /**
     * Uploads a File[] to a folder.
     */
    private uploadFiles(folder: string, uploads: File[]): Promise<void[]> {
        return Promise.all(Array.from(uploads).map((file) => this.uploadFile(folder, file)));
    }

    /**
     * Uploads a file to a folder.
     */
    private uploadFile(folder: string, file: File): Promise<void> {
        return new Promise((resolve, reject) => {
            const folderRef = firebase.app().storage().ref(folder);
            const fileRef = folderRef.child(file.name);
            const uploadTask = fileRef.put(file);
            uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, undefined, reject, () => resolve());
        });
    }

    private async getFiles(): Promise<firebase.storage.ListResult> {
        UploadState.urls.splice(0, UploadState.urls.length);
        return firebase.app().storage().ref(uploadFolder).listAll();
    }

    private async deleteImages() {
        this.getFiles().then((result) => result.items.forEach(async (item) => await item.delete()));
    }

    private async getImages() {
        this.getFiles().then((result) =>
            result.items.forEach((item) => item.getDownloadURL().then((url) =>
                UploadState.urls.push(url))));
    }

    private onUploadButtonClicked(evt: React.ChangeEvent<HTMLInputElement>) {
        if (window.File && window.FileReader && window.FileList && window.Blob && evt.target.files) {
            const files = Array.from(evt.target.files);
            this.uploadFiles(uploadFolder, files).then(this.getImages.bind(this));
        }
    }

    render() {
        return (
            <div>
                <strong>{Messages.get("shakeout-test-upload")}</strong>
                <ul>
                    <li><input onChange={this.onUploadButtonClicked.bind(this)}
                        type="file"
                        id="avatar"
                        name="avatar"
                        accept="image/png, image/jpeg, image/gif, image/bmp" /></li>
                    <li><button onClick={this.deleteImages.bind(this)}>{Messages.get("shakeout-test-delete")}</button></li>
                    {UploadState.imageUrls.map((url) => <li key={url}><img height="50" width="50" src={url} alt="uploaded asset" /></li>)}
                </ul>
            </div>
        );
    }
}

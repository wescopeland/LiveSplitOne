import { Option } from "./OptionUtil";

export class Image {
    public url: string;

    constructor() {
        this.url = "";
    }

    public possiblyModify(dataUrl: Option<string>) {
        if (dataUrl != null) {
            this.dispose();
            if (dataUrl !== "") {
                const binary = atob(dataUrl.split(",")[1]);
                const array = [];
                for (let i = 0; i < binary.length; i++) {
                    array.push(binary.charCodeAt(i));
                }
                const blob = new Blob([new Uint8Array(array)]);
                this.url = URL.createObjectURL(blob);
            }
        }
    }

    public dispose() {
        if (this.url !== "") {
            URL.revokeObjectURL(this.url);
            this.url = "";
        }
    }
}

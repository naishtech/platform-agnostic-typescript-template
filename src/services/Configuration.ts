import { Messages } from "./Messages";

class ConfigurationService {

    private static configuration = {};

    public getConfig(field: string): any {

        return ConfigurationService.configuration[field];

    }

    public setConfig(config: any): void {
        ConfigurationService.configuration = config;
    }

    public configure(url: string): Promise<void> {

        return ConfigurationService.fetchSameOrigin(url)
            .then(ConfigurationService.onConfigResponse)
            .then(() => ConfigurationService.fetchReferencedConfigurations())
            .then(() => console.debug("Services configured."));

    }

    private static getConfiguration(): any {

        return ConfigurationService.configuration;

    }

    private static fetchReferencedConfigurations(): Promise<void> {

        return ConfigurationService.fetchSameOrigin(ConfigurationService.getConfiguration()["messages"])
            .then(Messages.onMessagesResponse)
            .then(() => console.debug("Loaded messages."));

    }

    private static fetchSameOrigin(url: string) {

        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.onload = function () {
                resolve(new Response(xhr.responseText, { status: xhr.status }));
            };
            xhr.onerror = function () {
                reject(new TypeError("Same origin request failed"));
            };
            xhr.open("GET", url);
            xhr.send(null);
        });

    }

    private static onConfigResponse(response: Response): Promise<void> {

        return response.json().then(ConfigurationService.onConfigParsed);

    }

    private static onConfigParsed(result: any): void {

        let config = result["config"];
        ConfigurationService.configuration = config;
    }
    
    /**
     * Checks to see if a service has been configured
     * @param serviceId as per Services.ServiceNames
     */
    public configured(serviceId: string): boolean {

        let config = Configuration.getConfig(serviceId);
        return this.checkFields(config, true);

    }

    /**
     * Checks an object to see if values have been assigned
     * @param configObject configuration obect from Configuration.getConfig
     * @param result true if a service has values configured
     */
    private checkFields(configObject: object, result: boolean): boolean {

        for (let field in configObject) {
            if (typeof configObject[field] === "string") {
                return configObject[field].length > 0;
            } else if (typeof configObject[field] === "number") {
                return configObject[field] > 0;
            } else if (typeof configObject[field] === "object") {
                return this.checkFields(configObject[field], result);
            }
        }

    }
}

export const Configuration = new ConfigurationService();
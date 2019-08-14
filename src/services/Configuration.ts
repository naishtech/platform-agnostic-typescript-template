import { Messages } from "./Messages";

/**
 * Configuration service
 */
class ConfigurationService {

    private static configuration = {};

    /**
     * Retrieves configuration object for a configured field
     * @param field field to retrieve
     */
    public getConfig(field: string): any {

        return ConfigurationService.configuration[field];

    }

    /**
     * Sets the configuration object
     * @param config configuration object eg: https://github.com/naishtech/platform-agnostic-typescript-template/blob/master/static/config/dev/config.json
     */
    public setConfig(config: any): void {

        ConfigurationService.configuration = config;

    }

    /**
     * Reads local configuration and fetches messages from server.
     * @param url 
     */
    public configure(url: string): Promise<void> {

        return ConfigurationService.fetchSameOrigin(url)
            .then(ConfigurationService.onConfigResponse)
            .then(() => ConfigurationService.fetchReferencedConfigurations());

    }

    private static getConfiguration(): any {

        return ConfigurationService.configuration;

    }

    private static fetchReferencedConfigurations(): Promise<void> {

        return ConfigurationService.fetchSameOrigin(ConfigurationService.getConfiguration()["messages"])
            .then(Messages.onMessagesResponse);

    }

    private static fetchSameOrigin(url: string) {

        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
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

        ConfigurationService.configuration = result["config"];
        
    }
    
}

export const Configuration = new ConfigurationService();
class I18nService {

    private static messages: any;

    /**
     * Sets a new message configuration
     * @param messagesConfig new message config eg
     */
    public setMessages(messagesConfig: any): void {

        I18nService.messages = messagesConfig;

    }

    /**
     * 
     * @param key Get;s
     * @param country 
     * @param locale 
     */
    public get(key: string, country?: string, locale?: string): string {

        let message = this.getMessage(key, country, locale);
        return message ? message : key;

    }

    public getRequired(key: string, country?: string, locale?: string): string {

        return this.getMessage(key, country, locale);

    }

    private getMessage(key: string, country?: string, locale?: string) {

        country = country ? country : "en";
        locale = locale ? locale : "US";
        return I18nService.messages[country + "-" + locale][key];

    }

    public static configure(messagesConfig: any): void {

        I18nService.messages = messagesConfig;

    }

    public onMessagesResponse(response: Response): Promise<void> {

        return response.json().then(I18nService.onMessagesParsed);

    }

    private static onMessagesParsed(result: any): void {

        I18nService.configure(result["messages"]);

    }

    public format(key: string, values: any[], country?: string, locale?: string) {

        return this.get(key, country, locale).replace(/{(\d+)}/g, (match, num) => {
            return typeof values[num] !== "undefined"
                ? values[num]
                : match;
        });

    }

}

export const Messages = new I18nService();

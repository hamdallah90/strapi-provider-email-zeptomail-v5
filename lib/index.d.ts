export interface ZeptoMailProviderOptions {
    url: string;
    apiKey: string;
}
export interface StrapiEmailSettings {
    defaultFrom: string;
    sender_name?: string;
    replyTo?: string;
}
export interface EmailAddress {
    address: string;
    name?: string;
}
export interface EmailAttachment {
    content: string | Buffer;
    filename: string;
    contentType?: string;
}
export interface SendOptions {
    from?: EmailAddress | string;
    to: string | EmailAddress;
    cc?: string | EmailAddress | (string | EmailAddress)[];
    bcc?: string | EmailAddress | (string | EmailAddress)[];
    subject: string;
    text?: string;
    html?: string;
    replyTo?: EmailAddress | string | (EmailAddress | string)[];
    attachments?: EmailAttachment[];
    [key: string]: any;
}
export interface ZeptoMailMessage {
    to: Array<{
        email_address: {
            address: string;
            name?: string;
        };
    }>;
    from: EmailAddress | string;
    subject: string;
    textbody?: string;
    htmlbody?: string;
    cc?: string | EmailAddress | (string | EmailAddress)[];
    bcc?: string | EmailAddress | (string | EmailAddress)[];
    reply_to?: EmailAddress | string | (EmailAddress | string)[];
    attachments?: Array<{
        content: string;
        mime_type: string;
        name: string;
    }>;
}
export interface EmailProvider {
    send(options: SendOptions): Promise<any>;
}
export interface ZeptoMailProvider {
    init(providerOptions: ZeptoMailProviderOptions, settings: StrapiEmailSettings): EmailProvider;
}
declare const zeptoMailProvider: ZeptoMailProvider;
export default zeptoMailProvider;
//# sourceMappingURL=index.d.ts.map
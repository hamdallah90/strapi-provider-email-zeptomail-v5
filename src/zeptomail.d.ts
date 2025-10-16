declare module 'zeptomail' {
  export interface SendMailClientConfig {
    url: string;
    token: string;
  }

  export interface EmailAddress {
    address: string;
    name?: string;
  }

  export interface MailMessage {
    to: Array<{
      email_address: EmailAddress;
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

  export class SendMailClient {
    constructor(config: SendMailClientConfig);
    sendMail(message: MailMessage): Promise<any>;
  }
}


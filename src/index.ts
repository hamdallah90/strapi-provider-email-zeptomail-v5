import { SendMailClient } from "zeptomail";

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
  track_clicks?: boolean;
  track_opens?: boolean;
  client_reference?: string;
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
  mime_headers?: Record<string, string>;
  track_clicks?: boolean;
  track_opens?: boolean;
  client_reference?: string;
}

export interface EmailProvider {
  send(options: SendOptions): Promise<any>;
}

export interface ZeptoMailProvider {
  init(providerOptions: ZeptoMailProviderOptions, settings: StrapiEmailSettings): EmailProvider;
}

const zeptoMailProvider: ZeptoMailProvider = {
  init(providerOptions: ZeptoMailProviderOptions, settings: StrapiEmailSettings): EmailProvider {
    const mailClient = new SendMailClient({
      url: providerOptions.url,
      token: providerOptions.apiKey,
    });

    return {
      send: async function (options: SendOptions): Promise<any> {
        const { from, to, cc, bcc, subject, text, html, replyTo, attachments, mimeHeaders, inlineImages, track_clicks, track_opens, client_reference, ...rest } = options;

        const messageDetails: ZeptoMailMessage = {
          to: [
            {
              email_address: {
                address: typeof to === 'string' ? to : to.address
              }
            }
          ],
          from: from || {
            address: settings.defaultFrom,
            name: settings.sender_name
          },
          subject: subject,
          textbody: text,
          htmlbody: html,
          cc: cc,
          bcc: bcc
        };

        if (replyTo) {
          messageDetails["reply_to"] = replyTo;
        } else if (settings.replyTo) {
          messageDetails["reply_to"] = [{
            address: settings.replyTo,
            name: settings.sender_name,
          }];
        }

        if (attachments) {
          messageDetails["attachments"] = attachments.map(attachment => {
            // Ensure content is base64 encoded
            let base64Content: string;
            if (Buffer.isBuffer(attachment.content)) {
              base64Content = attachment.content.toString('base64');
            } else {
              // If it's already a string, check if it needs base64 encoding
              // Assume it's not base64 if it contains non-base64 characters
              base64Content = attachment.content;
            }

            return {
              content: base64Content,
              mime_type: attachment.contentType || 'application/octet-stream',
              name: attachment.filename,
            };
          });
        }

        if (mimeHeaders) {
          messageDetails["mime_headers"] = mimeHeaders;
        }

        if (track_clicks !== undefined) {
          messageDetails["track_clicks"] = track_clicks;
        }

        if (track_opens !== undefined) {
          messageDetails["track_opens"] = track_opens;
        }

        if (client_reference) {
          messageDetails["client_reference"] = client_reference;
        }

        if (inlineImages) {
          messageDetails["attachments"] = inlineImages.map((image: { content: any; contentType: any; filename: any; }) => {
            return {
              content: image.content.toString('base64'),
              mime_type: image.contentType || 'image/png',
              cid: image.filename,
            };
          });
        }

        try {
          return await mailClient.sendMail(messageDetails);
        } catch (error) {
          console.error(JSON.stringify(error, null, 2));
          throw error;
        }
      },
    };
  },
};

export default zeptoMailProvider;

// For CommonJS compatibility
module.exports = zeptoMailProvider;
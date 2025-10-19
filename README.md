# Strapi Email Provider - ZeptoMail

A ZeptoMail provider for the Strapi email plugin, compatible with both Strapi v4 and v5.

## Installation

```bash
# Using npm
npm install strapi-provider-email-zeptomail-v5

# Using yarn
yarn add strapi-provider-email-zeptomail-v5
```

## Configuration

Create or modify your `config/plugins.js` file:

```javascript
module.exports = ({ env }) => ({
  email: {
    config: {
      provider: 'strapi-provider-email-zeptomail-v5',
      providerOptions: {
        url: env('ZEPTOMAIL_URL'),
        apiKey: env('ZEPTOMAIL_API_KEY'),
      },
      settings: {
        defaultFrom: env('EMAIL_DEFAULT_FROM'),
        sender_name: env('EMAIL_SENDER_NAME'),
        replyTo: env('EMAIL_REPLY_TO'),
      },
    },
  },
});
```

## Environment Variables

Add these to your `.env` file:

```env
ZEPTOMAIL_URL=https://api.zeptomail.com/v1.1/email
ZEPTOMAIL_API_KEY=your_zeptomail_api_key
EMAIL_DEFAULT_FROM=noreply@yourdomain.com
EMAIL_SENDER_NAME=Your App Name
EMAIL_REPLY_TO=support@yourdomain.com
```

## Usage

Once configured, you can send emails using Strapi's email service:

```javascript
await strapi.plugin('email').service('email').send({
  to: 'recipient@example.com',
  subject: 'Welcome!',
  text: 'Welcome to our platform!',
  html: '<h1>Welcome!</h1><p>Welcome to our platform!</p>',
  track_opens: true,
  track_clicks: true,
  client_reference: 'welcome-email-001'
});
```

## Features

- ✅ Compatible with Strapi v4 and v5
- ✅ TypeScript support
- ✅ Full attachment support
- ✅ Inline images support
- ✅ Custom MIME headers
- ✅ CC and BCC support
- ✅ Reply-to configuration
- ✅ Base64 attachment encoding
- ✅ Email tracking (opens and clicks)
- ✅ Client reference support
- ✅ Error handling

## API Reference

### Send Options

```typescript
interface SendOptions {
  from?: string | EmailAddress;
  to: string | EmailAddress;
  cc?: string | EmailAddress | (string | EmailAddress)[];
  bcc?: string | EmailAddress | (string | EmailAddress)[];
  subject: string;
  text?: string;
  html?: string;
  replyTo?: string | EmailAddress | (string | EmailAddress)[];
  attachments?: EmailAttachment[];
  mimeHeaders?: Record<string, string>;
  inlineImages?: InlineImage[];
  track_clicks?: boolean;
  track_opens?: boolean;
  client_reference?: string;
}
```

### Email Address

```typescript
interface EmailAddress {
  address: string;
  name?: string;
}
```

### Email Attachment

```typescript
interface EmailAttachment {
  content: string | Buffer;
  filename: string;
  contentType?: string;
}
```

### Inline Image

```typescript
interface InlineImage {
  content: Buffer;
  filename: string;
  contentType?: string;
}
```

## Advanced Usage

### Sending Email with Attachments

```javascript
await strapi.plugin('email').service('email').send({
  to: 'recipient@example.com',
  subject: 'Document Attached',
  html: '<p>Please find the attached document.</p>',
  attachments: [
    {
      filename: 'document.pdf',
      content: Buffer.from('...'),
      contentType: 'application/pdf'
    }
  ]
});
```

### Sending Email with Inline Images

```javascript
await strapi.plugin('email').service('email').send({
  to: 'recipient@example.com',
  subject: 'Email with Image',
  html: '<p>Check out this image: <img src="cid:logo.png" /></p>',
  inlineImages: [
    {
      filename: 'logo.png',
      content: Buffer.from('...'),
      contentType: 'image/png'
    }
  ]
});
```

### Using Custom MIME Headers

```javascript
await strapi.plugin('email').service('email').send({
  to: 'recipient@example.com',
  subject: 'Email with Custom Headers',
  html: '<p>Email content</p>',
  mimeHeaders: {
    'X-Custom-Header': 'custom-value',
    'X-Priority': '1'
  }
});
```

## Development

```bash
# Install dependencies
npm install

# Build the project
npm run build

# Run in development mode
npm run develop

# Run tests
npm test

# Lint code
npm run lint
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, please open an issue on the GitHub repository.
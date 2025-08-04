export default ({ env }) => ({
  email: {
    config: {
      provider: '@strapi/provider-email-nodemailer',
      providerOptions: {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: env('GMAIL_USER'),
          pass: env('GMAIL_APP_PASSWORD'),
        },
      },
      settings: {
        defaultFrom: env('GMAIL_USER'),
        defaultReplyTo: env('GMAIL_USER'),
      },
    },
  },
});
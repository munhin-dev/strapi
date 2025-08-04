import type { Core } from '@strapi/strapi';

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
 async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    strapi.db.lifecycles.subscribe({
      models: ['admin::user'],
      async afterCreate({ result }) {
        const email = result?.email as string | undefined;
        const token = result?.registrationToken as string | undefined;
        if (!email || !token) return;

        const baseUrl =
          (strapi.config.get('server.url') as string | undefined) ||
          process.env.PUBLIC_URL ||
          'http://localhost:1337';

        const inviteUrl = `${baseUrl.replace(/\/$/, '')}/admin/auth/register?registrationToken=${token}`;

        await strapi.plugin('email').service('email').send({
          to: email,
          subject: 'You are invited to the Strapi admin',
          text: `Finish setup: ${inviteUrl}`,
          html: `<p>Finish setup: <a href="${inviteUrl}">${inviteUrl}</a></p>`,
        });
      },
    });
  },
};

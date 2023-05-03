import Router from 'next/router';

require('request-context');

export const checkAuth = (context) => {
  const { reduxStore } = context;

  if (!reduxStore.getState()?.profile?.previewAccount?.id && !reduxStore.getState()?.profile?.authUser?.id) {
    if (context.res) {
      try {
        // If on the server, an HTTP 303 response with a "Location"
        // is used to redirect.
        context.res.writeHead(303, { Location: '/' });
        context.res.end();
        // eslint-disable-next-line no-empty
      } catch (e) {}
    }
  }
};

export const redirect = (target, ctx) => {
  if (ctx?.res) {
    // If on the server, an HTTP 303 response with a "Location"
    // is used to redirect.
    try {
      ctx?.res.writeHead(303, { Location: target });
      ctx?.res.end();
      ctx.res.finised = true;
      // eslint-disable-next-line no-empty
    } catch (e) {}
  } else {
    Router?.push?.(target);
  }
};

export const checkRedirect = (context) => {
  const { reduxStore, query } = context;

  if (!reduxStore.getState()?.profile?.previewAccount?.id && !reduxStore.getState()?.profile?.authUser?.id) {
    redirect('/', context);
  }
};

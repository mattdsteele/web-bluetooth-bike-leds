import { Config } from '@stencil/core';

// https://stenciljs.com/docs/config

export const config: Config = {
  outputTargets: [
    {
      type: 'www',
      baseUrl: '/bike-delights-2018/',
      // uncomment the following line to disable service workers in production
      serviceWorker: null
    }
  ]
};

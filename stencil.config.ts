import { Config } from '@stencil/core';

// https://stenciljs.com/docs/config

export const config: Config = {
  outputTargets: [
    {
      type: 'www'
      // uncomment the following line to disable service workers in production
    }
  ]
};

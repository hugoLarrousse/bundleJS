import https from 'https';
import url from 'url';
import path from 'path';

import * as logger from './logger';

const loadInMemory = link => new Promise((resolve, reject) => {
  https.get(link, (response) => {
    const parsed = url.parse(link);
    const filename = path.basename(parsed.pathname);
    const chunks = [];
    response.on('data', chunk => chunks.push(chunk));
    response.on('error', (err) => {
      logger.error(__filename, loadInMemory.name, 'error on get link', link, err);
      reject(err);
    });
    response.on('end', () => {
      resolve({
        filename,
        mimeType: response.headers['content-type'],
        buffer: Buffer.concat(chunks),
      });
    });
  });
});

export {
  loadInMemory,
};

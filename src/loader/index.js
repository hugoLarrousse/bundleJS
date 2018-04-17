const request = require('request');
const fs = require('fs');
const uuid = require('uuid/v4');
const mimeTypes = require('mime-types');
const config = require('config');
const error = require('../../error');
const logger = require('../../utils/logger');

// the aim of this function is to download resource from a given url (video, image...) 
// and store it inside a folder: by default /resources (be careful the folder has to exist I think)

const loadVideoFromURL = (link) => new Promise((resolve, reject) => {
  try {
    request
      .get(link)
      .on('response', (response) => { // eslint-disable-line

        /* start optional */
        if (!config.get('CONTENT_TYPE_AUTHORIZED').includes(response.headers['content-type'])) {
          logger.error(__filename, loadVideoFromURL.name, error.loadVideoFromURL.contentType);
          return reject(new Error(error.loadVideoFromURL.contentType));
        } else if (response.headers['content-length'] > config.get('VIDEO_MAX_SIZE')) {
          logger.error(__filename, loadVideoFromURL.name, error.loadVideoFromURL.maxSize);
          return reject(new Error(error.loadVideoFromURL.maxSize));
        }
        /* end optional */
        const extension = mimeTypes.extension(response.headers['content-type']);
        if (!extension) {
          logger.error(
            __filename, loadVideoFromURL.name,
            error.loadVideoFromURL.incorrectExtension
          );
          return reject(new Error(error.loadVideoFromURL.incorrectExtension));
        }
        // you can replace the following line by your folder + name
        const uniqueFileName = `${config.get('TEMPVIDEOFOLDER')}/${uuid()}.${extension}`;
        const file = fs.createWriteStream(uniqueFileName);
        response.pipe(file);
        response.on('data', () => {
          if (config.get('DEBUG')) {
            logger.info(__filename, loadVideoFromURL.name, `${((file.bytesWritten / response.headers['content-length']) * 100).toFixed(2)} % downloaded`);
          }
        });
        response.on('error', (err) => {
          logger.error(__filename, loadVideoFromURL.name, err.message, err);
          return reject(new Error(err.message));
        });
        response.on('end', () => {
          resolve({
            mimeType: response.headers['content-type'],
            filePath: file.path,
            length: response.headers['content-length'],
          });
          logger.info(__filename, loadVideoFromURL.name, `video ${uniqueFileName} downloaded`);
        });
      });
  } catch (e) {
    logger.error(__filename, loadVideoFromURL.name, e.message, e);
    throw new Error(e.message);
  }
});

exports.loadVideoFromURL = loadVideoFromURL;

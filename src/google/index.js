import google from 'googleapis';
import GoogleAuth from 'google-auth-library';
import { promisify } from 'util';

import { throwError } from '../../utils/error';

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 *
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
const authorize = (credentials) => {
  const clientSecret = credentials.installed.client_secret;
  const clientId = credentials.installed.client_id;
  const redirectUrl = credentials.installed.redirect_uris[0];
  const auth = new GoogleAuth();
  const oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);

  try {
    oauth2Client.credentials = JSON.parse(process.env.TOKEN_GOOGLE);
    return oauth2Client;
  } catch (err) {
    throw throwError(__filename, authorize.name, err.message, err);
  }
};

const getDataSpreadsheet = async (auth, spreadsheetId, range) => {
  try {
    const sheets = google.sheets('v4');
    const getSpreadsheet = promisify(sheets.spreadsheets.values.get);

    const response = await getSpreadsheet({
      auth,
      spreadsheetId,
      range,
    });

    return response.values;
  } catch (err) {
    throw throwError(__filename, getDataSpreadsheet.name, err.message, err);
  }
};

const getSpreadsheet = (sheetId, range) => {
  const auth = authorize(JSON.parse(process.env.CLIENT_SECRET_GOOGLE));
  return getDataSpreadsheet(auth, sheetId, range);
};

export {
  getSpreadsheet,
};

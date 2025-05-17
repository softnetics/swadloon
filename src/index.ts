import { sendEmail } from './utils/email';
import { createIntakeIssue, isValidWebhookSignature } from './utils/plane';

/**
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function onFormSubmit(e: GoogleAppsScript.Events.FormsOnFormSubmit) {
  const formResponse = e.response;

  const itemResponses = formResponse.getItemResponses();

  const payload = itemResponses.reduce(
    (
      acc: { [key: string]: string | string[] | string[][] },
      curItemResponse: GoogleAppsScript.Forms.ItemResponse
    ) => {
      const item = curItemResponse.getItem();
      const itemTitle = item.getTitle();
      const response = curItemResponse.getResponse();

      acc[itemTitle] = response;

      return acc;
    },
    {}
  );

  Logger.log('Form response payload:' + JSON.stringify(payload));

  const response = createIntakeIssue(payload);
  Logger.log('Response from Plane API: ' + response);
}

function doGet(e: GoogleAppsScript.Events.DoGet) {
  try {
    const params = JSON.stringify(e);
    return ContentService.createTextOutput('Swadloon is awesome!').setMimeType(
      ContentService.MimeType.JSON
    );
  } catch (error) {
    Logger.log('Error: ' + error);
    return ContentService.createTextOutput(
      JSON.stringify({ error: 'Error: ' + error })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

function doPost(e: GoogleAppsScript.Events.DoPost) {
  try {
    const payload = e.postData.contents;
    const data = JSON.parse(payload);

    const token = e.parameter.token;

    if (!isValidWebhookSignature(token)) {
      Logger.log('Invalid signature');
      return ContentService.createTextOutput(
        JSON.stringify({ error: 'Invalid signature' })
      ).setMimeType(ContentService.MimeType.JSON);
    }

    Logger.log('Webhook received: ' + JSON.stringify(data));

    return ContentService.createTextOutput(
      JSON.stringify({ message: 'Webhook received' })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    Logger.log('Error: ' + error);
    return ContentService.createTextOutput(
      JSON.stringify({ error: 'Error: ' + error })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

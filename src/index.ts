import { createIntakeIssue } from './utils/plane';

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

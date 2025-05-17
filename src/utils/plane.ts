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
import { getEnv } from '../env';

export function createIntakeIssue(payload: {
  [key: string]: string | string[] | string[][];
}): string {
  const { API_KEY, WORKSPACE_SLUG, PROJECT_ID, PLANE_API_URL } = getEnv();
  const apiUrl = `${PLANE_API_URL}/api/v1/workspaces/${WORKSPACE_SLUG}/projects/${PROJECT_ID}/intake-issues/`;

  const options: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions = {
    method: 'post',
    contentType: 'application/json',
    headers: {
      'x-api-key': API_KEY,
    },
    payload: JSON.stringify({
      issue: {
        name: payload['Title'],
        description_html: `<p class="editor-paragraph-block"><h4>Bug Summary</h4><p>${payload['Description']}</p><h4>Environment</h4><p>${payload['Env']}</p><h4>Steps to Reproduce</h4><p>${payload['Step to reproduce']}</p><h4>Expected Behavior</h4><p>${payload['Expected Behavior']}</p><h4>Actual Behavior</h4><p>${payload['Actual Behavior']}</p><h4>Severity</h4><p><strong>Impact:</strong> ${payload['Severity']}</p><h4>Visual Evidence</h4><ul>${(
          payload['Additional Images/Videos'] as string[]
        )
          .map(
            url =>
              `<li><a href="https://drive.google.com/open?id=${url}" target="_blank" rel="noopener noreferrer">https://drive.google.com/open?id=${url}</a></li>`
          )
          .join('')}</ul></p>`,
      },
    }),
  };

  try {
    const response = UrlFetchApp.fetch(apiUrl, options);
    return response.getContentText();
  } catch (error) {
    Logger.log('Error creating issue: ' + error);
    throw new Error('Error creating issue: ' + error);
  }
}

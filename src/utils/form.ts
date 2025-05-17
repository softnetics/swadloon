import { getEnv } from '../env';

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
export function updateStatus(issue: string, status: string): void {
  const titleToFind = issue;
  const { SHEET_ID } = getEnv();
  const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(
    'Form Responses 1'
  ) as GoogleAppsScript.Spreadsheet.Sheet;

  const range = sheet.getDataRange();
  const values = range.getValues();

  const headers = values[0];
  const titleCol = headers.indexOf('Title');
  const statusCol = headers.indexOf('Status');

  if (statusCol === -1) {
    sheet.getRange(1, headers.length + 1).setValue('Status');
  }

  for (let i = 1; i < values.length; i++) {
    if (values[i][titleCol] === titleToFind) {
      sheet.getRange(i + 1, statusCol + 1).setValue(status);
      break;
    }
  }
}

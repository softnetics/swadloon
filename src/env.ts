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
export function getEnv(): Record<string, string> {
  const scriptProperties = PropertiesService.getScriptProperties();

  return {
    PLANE_API_URL: scriptProperties.getProperty('PLANE_API_URL') || '',
    API_KEY: scriptProperties.getProperty('API_KEY') || '',
    WORKSPACE_SLUG: scriptProperties.getProperty('WORKSPACE_SLUG') || '',
    PROJECT_ID: scriptProperties.getProperty('PROJECT_ID') || '',
    RECIPIENT_EMAIL: scriptProperties.getProperty('RECIPIENT_EMAIL') || '',
  };
}

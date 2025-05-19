# Swadloon: Google Forms to Plane.so Integration

Swadloon is a Google Apps Script application that creates a seamless integration between Google Forms (used for bug reporting) and Plane.so (project management tool). This integration streamlines the bug reporting process by automatically creating intake issues in Plane.so when a form is submitted, and updating the status in Google Sheets when the issue status changes in Plane.so.

## 🌟 Features

- **Automated Issue Creation**: Converts Google Form submissions into Plane.so intake issues
- **Bidirectional Status Updates**: Updates Google Sheets when issue status changes in Plane.so
- **Webhook Integration**: Listens for Plane.so status updates via webhooks
- **Email Notifications**: Optional email notifications for status changes
- **Secure Authentication**: Validates webhook requests using a secret token

## 🚀 Getting Started

### Prerequisites

- Google Workspace account with access to:
  - Google Forms
  - Google Sheets
  - Google Apps Script
- Plane.so account with API access
- Basic knowledge of TypeScript and Google Apps Script

### Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/softnetics/swadloon.git
   cd swadloon
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Set up your Google Form with the following fields:

   - Title
   - Description
   - Env (Environment)
   - Step to reproduce
   - Expected Behavior
   - Actual Behavior
   - Severity
   - Additional Images/Videos

   Example Form: [Bug Report Form](https://forms.gle/SQq8gbBzAkGGV47P9)

4. Create a Google Sheet to store form responses

   Example Sheet: [Response Sheet](https://docs.google.com/spreadsheets/d/1jDoXc1K1YRM7_KLPcSl-9PZbEo5dlHPg7mnSd0tt-p0/edit?usp=sharing)

5. Set up Script Properties in Google Apps Script:
   - PLANE_API_URL: https://api.plane.so/
   - API_KEY: Your Plane.so API key
   - WORKSPACE_SLUG: Your Plane.so workspace slug
   - PROJECT_ID: Your Plane.so project ID
   - RECIPIENT_EMAIL: Email for notifications (optional)
   - WEBHOOK_SECRET: Secret for webhook authentication
   - SHEET_ID: ID of your Google Sheet

### Deployment

1. Build the project:

   ```bash
   pnpm build
   ```

2. Set up `.clasp.json` for your Google Apps Script project:

   ```json
   {
     "scriptId": "your-app-script-id",
     "rootDir": "dist"
   }
   ```

3. Push to Google Apps Script:

   ```bash
   pnpm push
   ```

4. Set up a webhook in Plane.so pointing to your deployed Apps Script URL

## 🔄 Workflow

1. User submits a bug report via Google Form
2. Form trigger executes `onFormSubmit` function
3. Bug data is transformed and sent to Plane.so as an intake issue
4. Initial status "Reported" is set in Google Sheets
5. When issue status changes in Plane.so, a webhook is triggered
6. Webhook updates the corresponding issue status in Google Sheets

## 📂 Project Structure

```
swadloon/
├── src/
│   ├── index.ts          # Main entry point with webhook handlers
│   ├── env.ts            # Environment configuration
│   └── utils/
│       ├── form.ts       # Google Sheets interaction
│       ├── plane.ts      # Plane.so API interaction
│       └── email.ts      # Email notification helpers
├── dist/                 # Build output (Apps Script code)
├── rollup.config.mjs     # Rollup configuration
└── tsconfig.json         # TypeScript configuration
```

## 📋 Example Setup

This project includes reference examples for implementation:

### Example Google Form

An example bug report form is available at [https://forms.gle/SQq8gbBzAkGGV47P9](https://forms.gle/SQq8gbBzAkGGV47P9).

This form includes all the necessary fields that are processed by the integration:

- Title of the bug
- Description
- Environment details
- Steps to reproduce
- Expected behavior
- Actual behavior
- Severity ranking
- File uploads for visual evidence

### Example Google Sheet

The corresponding response sheet can be viewed at [https://docs.google.com/spreadsheets/d/1jDoXc1K1YRM7_KLPcSl-9PZbEo5dlHPg7mnSd0tt-p0/edit?usp=sharing](https://docs.google.com/spreadsheets/d/1jDoXc1K1YRM7_KLPcSl-9PZbEo5dlHPg7mnSd0tt-p0/edit?usp=sharing).

This sheet demonstrates:

- How form responses are structured
- Where the status column is added
- How the integration updates the status based on Plane.so changes

## 🛠️ Development

### Available Scripts

- `pnpm clean`: Clean build outputs
- `pnpm lint`: Run code linting
- `pnpm build`: Build the project
- `pnpm push`: Build and push to Apps Script
- `pnpm push:prod`: Build and push to production

### Setting up a Development Environment

1. Create a test Google Form and Sheet
2. Follow the installation steps above
3. Use the `.clasp-dev.json` for development deployments

## ⚙️ Configuration

### Script Properties

In the Google Apps Script editor, set the following script properties (File > Project Settings > Script Properties):

| Property        | Description                                |
| --------------- | ------------------------------------------ |
| PLANE_API_URL   | Base URL for Plane.so API                  |
| API_KEY         | Your Plane.so API key                      |
| WORKSPACE_SLUG  | Your workspace slug in Plane.so            |
| PROJECT_ID      | The project ID in Plane.so                 |
| RECIPIENT_EMAIL | Email address for notifications            |
| WEBHOOK_SECRET  | Secret token for webhook authentication    |
| SHEET_ID        | ID of the Google Sheet with form responses |

## 📝 License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

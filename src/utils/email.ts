import { getEnv } from '../env';

export function sendEmail(subject: string, message: string) {
  const { RECIPIENT_EMAIL } = getEnv();
  const email = RECIPIENT_EMAIL;
  MailApp.sendEmail(email, subject, message);
}

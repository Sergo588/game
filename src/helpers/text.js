import { callNotification } from 'helpers/notification';

export const copy = async (value) => {
  navigator?.clipboard?.writeText && navigator.clipboard.writeText(value);
  callNotification({ type: 'info', message: 'Copied' });
};

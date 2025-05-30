import { format } from 'date-fns';

export const delayMS = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
export const formatDate = (dateString: string) => {
  return format(new Date(dateString), 'MM/dd/yyyy HH:mm');
};
export const formatDateWithoutHour = (dateString: string) => {
  return format(new Date(dateString), 'MM/dd/yyyy');
};

export const generateRandomNumeric = (): number => {
  const min = 100000;
  const max = Number.MAX_SAFE_INTEGER;
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

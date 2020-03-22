const DEFAULT_NOTIFICATION_DURATION = 1;

export const parseEOS    = eosString => parseFloat(eosString.split(" ")[0]);
export const toEOSString = value => `${parseFloat(value).toFixed(4)} EOS`;

export const notifyError   = (value = 'Error !', duration = DEFAULT_NOTIFICATION_DURATION) => console.log(value, duration);
export const notifyInfo    = (value, duration = DEFAULT_NOTIFICATION_DURATION) => console.log(value, duration);
export const notifySuccess = (value = 'Success !', duration = DEFAULT_NOTIFICATION_DURATION) => console.log(value, duration);
export const notifyWarning = (value = 'Warning !', duration = DEFAULT_NOTIFICATION_DURATION) => console.log(value, duration);

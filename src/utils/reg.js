export const mobile = /^1[3456789]\d{9}$/;

const emailChars = '[a-zA-Z0-9_-]';
export const email = new RegExp(`^${emailChars}+@${emailChars}+(\\.${emailChars}+)+$`);

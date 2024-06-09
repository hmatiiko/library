export function saltPassword(password) {
  return process.env.SALT + password + process.env.SALT;
}

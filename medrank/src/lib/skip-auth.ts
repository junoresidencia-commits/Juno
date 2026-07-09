export function isSkipAuth(): boolean {
  return process.env.SKIP_AUTH === 'true';
}

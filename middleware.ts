// Next.js requires the middleware file to be named exactly "middleware.ts".
// All middleware logic is maintained in proxy.ts — this file simply re-exports it.
export { default, config } from './proxy';

/* probably not the best idea
function isDev() {
  // TODO: use browser.runtime.getBrowserInfo() for crossplatform
  return browser.runtime.id.endsWith('@temporary-addon')
}
*/

// this file will not be part of the deployment
// checking the existence of this variable will determine the environment
const DEV_ENV = true

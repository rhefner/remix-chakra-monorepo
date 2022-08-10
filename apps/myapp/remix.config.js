/**
 * @type {import('@remix-run/dev').AppConfig}
 */
module.exports = {
  appDirectory: 'src',
  cacheDirectory: './node_modules/.cache/remix',
  devServerPort: 8002,
  serverDependenciesToBundle: [/@myorg\/*/],
}

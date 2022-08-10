const env = {
  NODE_ENV: process.env.NODE_ENV ?? 'development',
  FORCE_COLOR: '1',
}
module.exports = {
  apps: [
    {
      name: 'Remix',
      script: 'remix dev',
      ignore_watch: ['.'],
      env,
    },
    {
      name: 'WatchExternal',
      script: 'node ./refresh-on-content-changes.js',
      ignore_watch: ['.'],
      env,
    },
  ],
}

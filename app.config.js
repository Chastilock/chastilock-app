import 'dotenv/config'

export default {
  name: 'Chastilock',
  icon: './images/logo.png',
  version: '1.0.0',
  slug: 'chastilock',
  ios: {
    bundleIdentifier: 'com.github.chastilock',
    buildNumber: '1.0.0'
  },
  android: {
    package: 'com.github.chastilock',
    versionCode: 1
  },
  extra: {
    backendEndpoint: process.env.BACKEND_ENDPOINT,
    backendApiKey: process.env.BACKEND_API_KEY,
    backendApiSecret: process.env.BACKEND_API_SECRET
  }
}

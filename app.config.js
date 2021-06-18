import 'dotenv/config'

const version = '1.0.0'

export default {
  name: 'Chastilock',
  icon: './images/logo.png',
  version,
  slug: 'chastilock',
  ios: {
    bundleIdentifier: 'org.chastilock',
    buildNumber: `${version}.${process.env.GITHUB_RUN_NUMBER ? parseInt(process.env.GITHUB_RUN_NUMBER) : 1}`
  },
  android: {
    package: 'org.chastilock',
    versionCode: process.env.GITHUB_RUN_NUMBER ? parseInt(process.env.GITHUB_RUN_NUMBER) : 1
  },
  extra: {
    backendEndpoint: process.env.BACKEND_ENDPOINT,
    backendApiKey: process.env.BACKEND_API_KEY,
    backendApiSecret: process.env.BACKEND_API_SECRET
  }
}

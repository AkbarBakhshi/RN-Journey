import { ConfigContext } from 'expo/config';
export default ({ config }: ConfigContext) => {
  const appConfig = config;
  appConfig.ios!.googleServicesFile = process.env.IOS_SERVICES_PLIST;
  appConfig.android!.googleServicesFile = process.env.GOOGLE_SERVICES_JSON;
  // console.log(appConfig)
  return {
    ...appConfig,
  };
};

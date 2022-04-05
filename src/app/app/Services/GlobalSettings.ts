import {
    Live, UAT, LOCAL,
  } from './EnvironmentConfig';
  const hostName = window.location.hostname;

  function getEnvironmentSettings() {
    
    try {
      switch (hostName.toLowerCase()) {
        case 'blue-pebble-0fae32f10.1.azurestaticapps.net': {
          return Live;
        }
        case 'mango-pond-0413b5210.1.azurestaticapps.net': {
          return UAT;
        }
        case 'localhost': {
          return LOCAL;
        }
        default: {
          return LOCAL;
        }
      }
    } catch (error) {
      const message = `Failed to load config for environment ${hostName}`;
      throw new Error(message);
    }
  }
  const GlobalSettings = getEnvironmentSettings();
  export default GlobalSettings;
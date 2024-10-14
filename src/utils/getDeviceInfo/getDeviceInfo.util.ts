import UAParser from 'ua-parser-js';
import DeviceInfo from './deviceInfo.domain';

const parser = new UAParser();
const browser = parser.getBrowser();
const os = parser.getOS();
const device = parser.getDevice();

const getDeviceInfo = (): DeviceInfo => {
  return {
    browserName: browser.name,
    browserVersion: browser.version,
    osName: os.name,
    osVersion: os.version,
    deviceType: device.type,
  };
};

export default getDeviceInfo;

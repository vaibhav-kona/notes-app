import { ModuleKey } from '../../constants/modules.constants';
import { DeviceInfo } from '../getDeviceInfo';

const ERROR_TYPE = {
  API_ERROR: 'API_ERROR',
  UI_ERROR: 'UI_ERROR',
  NETWORK_ERROR: 'NETWORK_ERROR',
  OTHER: 'OTHER',
};

type ErrorTypeKey = (typeof ERROR_TYPE)[keyof typeof ERROR_TYPE];

const ERROR_LEVEL = {
  CRITICAL: 'critical',
  WARNING: 'warning',
  INFO: 'info',
};

type ErrorLevelKey = (typeof ERROR_LEVEL)[keyof typeof ERROR_LEVEL];

interface CommonProperties {
  timestamp: string;
  deviceInfo: DeviceInfo;
}

interface AppErrorBase extends CommonProperties {
  errorType: ErrorTypeKey;
  errorLevel: ErrorLevelKey;
  message: string;
  module: ModuleKey;
  subModule?: string;
  timestamp: string;
  deviceInfo: DeviceInfo;
}

interface AppApiError extends AppErrorBase {
  url: string;
  httpMethod: string;
  requestData?: any;
  responseData?: any;
  statusCode?: number;
}

interface AppUIError extends AppErrorBase {
  componentName: string;
  action?: string;
}

interface AppNetworkError extends AppErrorBase {
  url: string;
  requestData?: any;
  statusCode?: number;
}

interface AppOtherError extends AppErrorBase {
  details: string;
}

export { ERROR_TYPE, ERROR_LEVEL };
export type {
  ErrorLevelKey,
  ErrorTypeKey,
  CommonProperties,
  AppErrorBase,
  AppApiError,
  AppUIError,
  AppNetworkError,
  AppOtherError,
};

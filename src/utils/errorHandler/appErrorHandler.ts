import { DeviceInfo, getDeviceInfo } from '../getDeviceInfo';
import {
  AppApiError,
  AppErrorBase,
  AppNetworkError,
  AppOtherError,
  AppUIError,
  CommonProperties,
  ERROR_LEVEL,
  ERROR_TYPE,
  ErrorLevelKey,
  ErrorTypeKey,
} from './appError.domain';

class AppError {
  errorType: ErrorTypeKey;
  errorLevel: ErrorLevelKey;
  message: string;
  module: string;
  subModule?: string;
  timestamp: string;
  deviceInfo: DeviceInfo;

  constructor({
    errorType,
    errorLevel,
    message,
    module,
    subModule,
    timestamp,
  }: AppErrorBase) {
    this.errorType = errorType;
    this.errorLevel = errorLevel;
    this.message = message;
    this.module = module;
    this.subModule = subModule;
    this.timestamp = timestamp;
    this.deviceInfo = getDeviceInfo();
  }

  static logError(error: AppError) {
    switch (error.errorLevel) {
      case ERROR_LEVEL.CRITICAL:
        this.handleCriticalError(error);
        break;
      case ERROR_LEVEL.WARNING:
        this.handleWarningError(error);
        break;
      case ERROR_LEVEL.INFO:
        this.handleInfoError(error);
        break;
      default:
        console.error('Unknown error level');
    }
  }

  private static handleCriticalError(error: AppError) {
    console.error('Critical Error:', error);
  }

  private static handleWarningError(error: AppError) {
    console.warn('Warning Error:', error);
  }

  private static handleInfoError(error: AppError) {
    console.info('Info Error:', error);
  }

  private static getCommonProperties(): CommonProperties {
    return {
      timestamp: new Date().toISOString(),
      deviceInfo: getDeviceInfo(),
    };
  }

  static createApiError(
    args: Omit<AppApiError, 'errorType' | keyof CommonProperties>
  ) {
    return new ApiError({
      ...args,
      errorType: ERROR_TYPE.API_ERROR,
      ...this.getCommonProperties(),
    });
  }

  static createUIError(
    args: Omit<AppUIError, 'errorType' | keyof CommonProperties>
  ) {
    return new UIError({
      ...args,
      errorType: ERROR_TYPE.UI_ERROR,
      ...this.getCommonProperties(),
    });
  }

  static createNetworkError(
    args: Omit<AppNetworkError, 'errorType' | keyof CommonProperties>
  ) {
    return new NetworkError({
      ...args,
      errorType: ERROR_TYPE.NETWORK_ERROR,
      ...this.getCommonProperties(),
    });
  }

  static createOtherError(
    args: Omit<AppOtherError, 'errorType' | keyof CommonProperties>
  ) {
    return new OtherError({
      ...args,
      errorType: ERROR_TYPE.OTHER,
      ...this.getCommonProperties(),
    });
  }
}

class ApiError extends AppError {
  url: string;
  httpMethod: string;
  requestData?: any;
  responseData?: any;
  statusCode?: number;

  constructor(args: AppApiError) {
    super(args);
    this.url = args.url;
    this.httpMethod = args.httpMethod;
    this.requestData = args.requestData;
    this.responseData = args.responseData;
    this.statusCode = args.statusCode;
  }
}

class UIError extends AppError {
  componentName: string;
  action?: string;

  constructor(args: AppUIError) {
    super(args);
    this.componentName = args.componentName;
    this.action = args.action;
  }
}

class NetworkError extends AppError {
  url: string;
  requestData?: any;
  statusCode?: number;

  constructor(args: AppNetworkError) {
    super(args);
    this.url = args.url;
    this.requestData = args.requestData;
    this.statusCode = args.statusCode;
  }
}

class OtherError extends AppError {
  details: string;

  constructor(args: AppOtherError) {
    super(args);
    this.details = args.details;
  }
}

export default AppError;

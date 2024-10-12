import { useEffect } from 'react';
import { AppErrorHandler } from '.';
import { ERROR_LEVEL } from './appError.domain';
import { MODULE } from '../../constants/modules.constants';

const useGlobalErrorHandlerUtil = () => {
  useEffect(() => {
    const handleErrors = (error: unknown) => {
      AppErrorHandler.createOtherError({
        details: 'global error',
        errorLevel: ERROR_LEVEL.WARNING,
        message: error as string,
        module: MODULE.GLOBAL,
      });
    };

    window.addEventListener('error', handleErrors);
    window.addEventListener('unhandledrejection', handleErrors);

    return () => {
      window.removeEventListener('error', handleErrors);
      window.removeEventListener('unhandledrejection', handleErrors);
    };
  }, []);
};

export default useGlobalErrorHandlerUtil;

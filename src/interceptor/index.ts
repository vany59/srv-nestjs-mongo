import { LoggingInterceptor } from './logging.interceptor';
import { ResponseInterceptor } from './response.interceptor';

const AppInterceptor = [ResponseInterceptor];
if (process.env.NODE_ENV !== 'production')
  AppInterceptor.push(LoggingInterceptor);

export default AppInterceptor;

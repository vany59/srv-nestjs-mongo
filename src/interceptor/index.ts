import { ElasticsearchLog } from './elasticsearchLog.interceptor';
import { LoggingInterceptor } from './logging.interceptor';
import { ResponseInterceptor } from './response.interceptor';

const AppInterceptor = [ResponseInterceptor];
if (process.env.NODE_ENV !== 'production')
  AppInterceptor.push(LoggingInterceptor);
else {
  AppInterceptor.push(ElasticsearchLog);
}

export default AppInterceptor;

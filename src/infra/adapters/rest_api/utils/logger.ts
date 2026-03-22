import pino from 'pino';
import config from '@/infra/adapters/rest_api/config/environment';

const logger = pino({
	level: config.logLevel,
	transport: !config.isProduction
		? {
				target: 'pino-pretty',
				options: {
					colorize: true,
					translateTime: 'SYS:yyyy-mm-dd HH:MM:ss',
					ignore: 'pid,hostname',
				},
			}
		: undefined,
});

export default logger;

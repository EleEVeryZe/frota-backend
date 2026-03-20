import logger from '@/utils/logger';
const redis = require('redis');

class RedisConfig {
    client: any;

    constructor() {
        this.client = redis.createClient({
            url: process.env.REDIS_URL || 'redis://localhost:6379'
        });

        this.client.on('error', (err: any) => logger.error('Redis Client Error', err));

        this.connectRedis();
    }

    private async connectRedis() {
        await this.client.connect();
        logger.info('Conectado ao Redis com sucesso!');
    }
}

export default new RedisConfig();
import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
import { join } from 'path';
import * as process from 'process';
import { ConfigService } from '@nestjs/config';
import { ENTITIES } from '../../infrastructure';

config({
    path: join(process.cwd(), '.env'),
});

const configService = new ConfigService();
const options = (): DataSourceOptions => {
    const params = {
        database: configService.get('MYSQL_DATABASE'),
        username: configService.get('MYSQL_USER'),
        password: configService.get('MYSQL_PASSWORD'),
        host: configService.get('MYSQL_HOST'),
        port: configService.get<number>('MYSQL_HOST_PORT'),
        logging: configService.get('IS_PROD'),
    };
    const errors: string[] = [];
    for (const key in params) {
        if (!Object.values(key)) {
            errors.push(key);
        }
    }
    if (errors.length) {
        throw new Error('Empty Database params: ' + errors.join());
    }
    return {
        database: params.database,
        host: params.host,
        password: params.password,
        port: params.port,
        username: params.username,
        type: 'mysql',
        logging: params.logging,
        entities: ENTITIES,
        synchronize: true,
    };
};
export const appDataSource = new DataSource(options());

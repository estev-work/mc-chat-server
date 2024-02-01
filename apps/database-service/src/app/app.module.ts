import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { ENTITYES } from '@infrastructure/database/entities';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: 'localhost',
            port: 33100,
            username: 'chat',
            password: 'chat',
            database: 'chat',
            entities: ENTITYES,
            synchronize: true,
        }),
    ],
    controllers: [],
    providers: [AppService],
})
export class AppModule {
    constructor(private dataSource: DataSource) {}
}

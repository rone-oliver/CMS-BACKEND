import { Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import * as Joi from 'joi';
import { Connection } from 'mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticleModule } from './article/article.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string()
          .uri()
          .default('mongodb://127.0.0.1:27017/cms'),
        DEVELOPMENT_CORS_ORIGIN: Joi.string().empty('').optional(),
        PRODUCTION_CORS_ORIGIN: Joi.string().empty('').optional(),
        PORT: Joi.number().port().default(3000),
      }),
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const logger = new Logger('MongoDB');
        logger.log('Connecting to MongoDB...');
        return {
          uri: config.get<string>('MONGODB_URI'),
          serverSelectionTimeoutMS: 5000,
          maxPoolSize: 10,
          connectionFactory: (connection: Connection) => {
            connection.on('error', (error: Error) => {
              logger.error('MongoDB connection error', error.message);
            });
            connection.on('disconnected', () => {
              logger.error('MongoDB disconnected');
            });
            connection.on('connected', () => {
              logger.log('✅ MongoDB connected');
            });
            return connection;
          },
        };
      },
    }),
    AuthModule,
    UserModule,
    ArticleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

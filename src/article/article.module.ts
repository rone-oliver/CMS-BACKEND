import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { IArticleRepositoryToken } from './interfaces/article.repository.interface';
import { IArticleServiceToken } from './interfaces/article.service.interface';
import { Article, articleSchema } from './models/article.schema';
import { ArticleRepository } from './repositories/article.repository';

@Module({
  providers: [
    {
      provide: IArticleServiceToken,
      useClass: ArticleService,
    },
    {
      provide: IArticleRepositoryToken,
      useClass: ArticleRepository,
    },
  ],
  controllers: [ArticleController],
  imports: [
    MongooseModule.forFeature([{ name: Article.name, schema: articleSchema }]),
  ],
})
export class ArticleModule {}

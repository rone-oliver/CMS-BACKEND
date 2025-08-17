import { SuccessResponseDto } from 'src/common/dtos/base/success-response.dto';

import { ArticleResponseDto } from '../dtos/responses/article.response.dto';
import { ArticleInputData } from '../types/article.types';

export const IArticleServiceToken = Symbol('IArticleService');

export interface IArticleService {
  findAll(): Promise<ArticleResponseDto[]>;
  findOne(id: string): Promise<ArticleResponseDto>;
  findAllByUser(userId: string): Promise<ArticleResponseDto[]>;
  create(article: ArticleInputData): Promise<ArticleResponseDto>;
  update(
    articleId: string,
    article: ArticleInputData,
  ): Promise<ArticleResponseDto>;
  delete(userId: string, articleId: string): Promise<SuccessResponseDto>;
}

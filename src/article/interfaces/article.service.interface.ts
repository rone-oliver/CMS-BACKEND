import { SuccessResponseDto } from 'src/common/dtos/base/success-response.dto';

import { ArticleResponseData } from '../dtos/responses/article.response.dto';
import { ArticleInputData } from '../types/article.types';

export const IArticleServiceToken = Symbol('IArticleService');

export interface IArticleService {
  findAll(): Promise<ArticleResponseData[]>;
  findOne(id: string): Promise<ArticleResponseData>;
  findAllByUser(userId: string): Promise<ArticleResponseData[]>;
  create(article: ArticleInputData): Promise<ArticleResponseData>;
  update(
    articleId: string,
    article: ArticleInputData,
  ): Promise<ArticleResponseData>;
  delete(userId: string, articleId: string): Promise<SuccessResponseDto>;
}

import { FilterQuery, UpdateQuery } from 'mongoose';

import { ArticleDocument } from '../models/article.schema';
import { ArticleInputData } from '../types/article.types';

export const IArticleRepositoryToken = Symbol('IArticleRepository');

export interface IArticleRepository {
  find(
    filter?: FilterQuery<ArticleDocument>,
  ): Promise<ArticleDocument[] | null>;
  findOne(
    filter: FilterQuery<ArticleDocument>,
  ): Promise<ArticleDocument | null>;
  create(article: ArticleInputData): Promise<ArticleDocument>;
  findOneAndUpdate(
    filter: FilterQuery<ArticleDocument>,
    update: UpdateQuery<ArticleDocument>,
  ): Promise<ArticleDocument | null>;
  findOneAndDelete(
    filter: FilterQuery<ArticleDocument>,
  ): Promise<ArticleDocument | null>;
}

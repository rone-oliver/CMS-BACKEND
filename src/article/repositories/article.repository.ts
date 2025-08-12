import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, Types, UpdateQuery } from 'mongoose';

import { IArticleRepository } from '../interfaces/article.repository.interface';
import { Article, ArticleDocument } from '../models/article.schema';
import { ArticleInputData } from '../types/article.types';

@Injectable()
export class ArticleRepository implements IArticleRepository {
  constructor(
    @InjectModel(Article.name)
    private readonly _articleModel: Model<ArticleDocument>,
  ) {}

  find(
    filter: FilterQuery<ArticleDocument> = {},
  ): Promise<ArticleDocument[] | null> {
    return this._articleModel.find(filter).lean().exec();
  }

  findOne(
    filter: FilterQuery<ArticleDocument>,
  ): Promise<ArticleDocument | null> {
    return this._articleModel.findOne(filter).lean().exec();
  }

  create(article: ArticleInputData): Promise<ArticleDocument> {
    const articleData = {
      ...article,
      userId: new Types.ObjectId(article.userId),
    };
    return this._articleModel.create(articleData);
  }

  findOneAndUpdate(
    filter: FilterQuery<ArticleDocument>,
    update: UpdateQuery<ArticleDocument>,
  ): Promise<ArticleDocument | null> {
    const article = {
      ...update,
      userId: new Types.ObjectId(update.userId),
    };
    return this._articleModel
      .findOneAndUpdate(filter, article, { new: true })
      .exec();
  }

  findOneAndDelete(
    filter: FilterQuery<ArticleDocument>,
  ): Promise<ArticleDocument | null> {
    return this._articleModel.findOneAndDelete(filter).exec();
  }
}

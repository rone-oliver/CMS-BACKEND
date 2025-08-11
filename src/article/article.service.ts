import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Types } from 'mongoose';

import { SuccessResponseDto } from 'src/common/dtos/base/success-response.dto';

import { ArticleResponseData } from './dtos/responses/article.response.dto';
import {
  IArticleRepository,
  IArticleRepositoryToken,
} from './interfaces/article.repository.interface';
import { IArticleService } from './interfaces/article.service.interface';
import { ArticleInputData } from './types/article.types';

@Injectable()
export class ArticleService implements IArticleService {
  constructor(
    @Inject(IArticleRepositoryToken)
    private readonly _articleRepository: IArticleRepository,
  ) {}

  async findAll(): Promise<ArticleResponseData[]> {
    const plain = await this._articleRepository.find();
    if (!plain || plain.length === 0) {
      throw new NotFoundException('Articles not found');
    }
    return plainToInstance(ArticleResponseData, plain);
  }

  async findOne(id: string): Promise<ArticleResponseData> {
    const plain = await this._articleRepository.findOne({ _id: id });
    if (!plain) {
      throw new NotFoundException('Article not found');
    }
    return plainToInstance(ArticleResponseData, plain);
  }

  async findAllByUser(userId: string): Promise<ArticleResponseData[]> {
    const plain = await this._articleRepository.find({
      userId: new Types.ObjectId(userId),
    });
    if (!plain || plain.length === 0) {
      throw new NotFoundException('Articles not found');
    }
    return plainToInstance(ArticleResponseData, plain);
  }

  async create(article: ArticleInputData): Promise<ArticleResponseData> {
    const articleCreated = await this._articleRepository.create(article);
    if (!articleCreated) {
      throw new InternalServerErrorException('Article creation failed');
    }
    const plain = articleCreated.toObject();
    return plainToInstance(ArticleResponseData, plain);
  }

  async update(
    articleId: string,
    article: ArticleInputData,
  ): Promise<ArticleResponseData> {
    const updatedArticle = await this._articleRepository.findOneAndUpdate(
      { _id: articleId },
      article,
    );
    if (!updatedArticle) {
      throw new NotFoundException(`Couldn't update the article`);
    }
    const plain = updatedArticle.toObject();
    return plainToInstance(ArticleResponseData, plain);
  }

  async delete(userId: string, articleId: string): Promise<SuccessResponseDto> {
    const deletedArticle = await this._articleRepository.findOneAndDelete({
      _id: articleId,
    });
    if (!deletedArticle) {
      throw new NotFoundException(`Couldn't delete the article`);
    }
    return new SuccessResponseDto({
      message: 'Article deleted successfully',
    });
  }
}

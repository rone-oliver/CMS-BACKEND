import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';

import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { TokenPayload } from 'src/auth/services/token.service';
import { SuccessResponseDto } from 'src/common/dtos/base/success-response.dto';

import { ARTICLE_PATHS } from './constants/article-path.constants';
import { ArticleDto } from './dtos/requests/article.request.dto';
import { ArticleResponseDto } from './dtos/responses/article.response.dto';
import {
  IArticleService,
  IArticleServiceToken,
} from './interfaces/article.service.interface';

@UseGuards(JwtAuthGuard)
@Controller(ARTICLE_PATHS.ROOT)
export class ArticleController {
  constructor(
    @Inject(IArticleServiceToken)
    private readonly _articleService: IArticleService,
  ) {}

  @Get()
  async findAll() {
    return this._articleService.findAll();
  }

  @Get(ARTICLE_PATHS.ME)
  async findAllByUser(@Req() req: Request): Promise<ArticleResponseDto[]> {
    const user = req.user as TokenPayload;
    return this._articleService.findAllByUser(user.id);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ArticleResponseDto> {
    return this._articleService.findOne(id);
  }

  @Post()
  async create(
    @Req() req: Request,
    @Body() body: ArticleDto,
  ): Promise<ArticleResponseDto> {
    const user = req.user as TokenPayload;
    return this._articleService.create({ userId: user.id, ...body });
  }

  @Patch(':id')
  async update(
    @Req() req: Request,
    @Param('id') id: string,
    @Body() body: ArticleDto,
  ): Promise<ArticleResponseDto> {
    const user = req.user as TokenPayload;
    return this._articleService.update(id, { userId: user.id, ...body });
  }

  @Delete(':id')
  async delete(
    @Req() req: Request,
    @Param('id') id: string,
  ): Promise<SuccessResponseDto> {
    const user = req.user as TokenPayload;
    return this._articleService.delete(user.id, id);
  }
}

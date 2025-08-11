import { Exclude, Expose, Transform } from 'class-transformer';

@Exclude()
export class ArticleResponseData {
  @Transform(
    ({ obj }: { obj: { _id?: { toString: () => string } } }) =>
      obj._id?.toString(),
    { toClassOnly: true },
  )
  @Expose({ name: '_id' })
  id: string;

  @Expose()
  title: string;

  @Expose()
  content: string;

  @Expose()
  createdAt: Date;
}

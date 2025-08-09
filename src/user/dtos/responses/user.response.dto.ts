import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Transform } from 'class-transformer';

@Exclude()
export class UserResponseDto {
  @ApiProperty({ description: 'User ID' })
  @Transform(
    ({ obj }: { obj: { _id?: { toString: () => string } } }) =>
      obj._id?.toString(),
    { toClassOnly: true },
  )
  @Expose({ name: '_id' })
  id: string;

  @ApiProperty({ description: 'User Fullname' })
  @Expose()
  fullname: string;

  @ApiProperty({ description: 'User Username' })
  @Expose()
  username: string;

  @ApiProperty({ description: 'User Email' })
  @Expose()
  email: string;

  @ApiProperty({ description: 'User Created At' })
  @Expose()
  createdAt: Date;

  @ApiProperty({ description: 'User Updated At' })
  @Expose()
  updatedAt: Date;
}

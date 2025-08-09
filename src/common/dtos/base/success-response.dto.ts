import { ApiProperty } from '@nestjs/swagger';

export class SuccessResponseDto<T = unknown> {
  @ApiProperty({ description: 'Indicates if the request was successful' })
  success: boolean;

  @ApiProperty({ description: 'Response data' })
  data?: T;

  @ApiProperty({ description: 'Optional message' })
  message?: string;

  constructor(partial: Partial<SuccessResponseDto<T>>) {
    Object.assign(this, {
      success: true,
      ...partial,
    });
  }
}

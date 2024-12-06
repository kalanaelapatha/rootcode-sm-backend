import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Entity } from 'typeorm';

/**
 *  for server side validation class-validator
 */
@Entity()
export class CreateCommentDto {
  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsNumber()
  postId: number;
}

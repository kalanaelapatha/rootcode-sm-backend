import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
/**
 *  for server side validation class-validator
 */
export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsOptional()
  titleColor?: string;
}

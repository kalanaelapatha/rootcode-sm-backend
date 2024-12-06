import { Injectable, Logger } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { SMResponse } from '../common/SMResponse';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post as PostEntity } from './entities/post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
  ) {}

  private readonly logger = new Logger(PostService.name);

  async create(
    createPostDto: CreatePostDto,
  ): Promise<SMResponse<CreatePostDto>> {
    try {
      const post = this.postRepository.create(createPostDto);
      await this.postRepository.save(post);
      return new SMResponse(
        createPostDto,
        201,
        true,
        'Post created successfully',
      );
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<SMResponse<PostEntity[]>> {
    try {
      const posts = await this.postRepository.find({
        relations: ['comments'], //it will retrieve the related the comments under given post id
      });
      this.logger.log(`Successfully retrieved posts`);
      return new SMResponse(posts, 200, true);
    } catch (error) {
      this.logger.error('Error occurred while fetching countries', error.stack);
      return new SMResponse(
        null,
        500,
        false,
        'Failed to retrieve posts',
        error.message,
      );
    }
  }

  async findOne(id: number) {
    try {
      const post = await this.postRepository.findOne({
        where: { id },
        relations: ['comments'],
      });
      if (!post) {
        return new SMResponse(
          null,
          404,
          false,
          'Post find unsuccessful',
          `No post found for the given ID: ${id}`,
        );
      }

      return new SMResponse(post, 200, true);
    } catch (error) {
      this.logger.error(`Failed to retrieve posts with ID ${id}`, error.stack);
      return new SMResponse(
        null,
        500,
        false,
        'Failed to retrieve posts',
        error.message,
      );
    }
  }
}

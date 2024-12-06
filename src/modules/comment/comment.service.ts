import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SMResponse } from '../common/SMResponse';
import { Repository } from 'typeorm';
import { Comment as CommentEntity } from './entities/comment.entity';
import { Post as PostEntity } from '../post/entities/post.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentRepository: Repository<CommentEntity>,

    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
  ) {}

  private readonly logger = new Logger(CommentService.name);
  async create(
    createCommentDto: CreateCommentDto,
  ): Promise<SMResponse<CommentEntity>> {
    try {
      const { content, postId } = createCommentDto;
      // Check if the post exists
      const post = await this.postRepository.findOne({ where: { id: postId } });
      if (!post) {
        throw new NotFoundException(`Post with ID ${postId} not found`);
      }

      // Create a new comment and associate it with the post
      const comment = this.commentRepository.create({
        content,
        post,
      });

      // Save the comment
      const savedComment = await this.commentRepository.save(comment);
      return new SMResponse(
        savedComment,
        201,
        true,
        'Comment added successfully',
      );
    } catch (error) {
      throw error;
    }
  }
}

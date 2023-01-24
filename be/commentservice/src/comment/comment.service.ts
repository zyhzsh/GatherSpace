import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CreateReplyDto } from './dto/create-reply.dto';
import { Comment } from './entities/comment.entity';
import { v4 as uuid_v4 } from 'uuid';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  async getComments(postId: string) {
    return await this.commentRepository.find({ where: { postId } });
  }

  async findOne(commentId: string) {
    return await this.commentRepository.findOne({ where: { commentId } });
  }

  async create(createCommentDto: CreateCommentDto) {
    const newComment = await this.commentRepository.create(createCommentDto);
    return await this.commentRepository.save(newComment);
  }

  async deleteComment(commentId: string) {
    const comment = await this.findOne(commentId);
    await this.commentRepository.remove(comment);
    return;
  }

  async addReply(createReplyDto: CreateReplyDto) {
    const { commentId } = createReplyDto;
    const comment = await this.findOne(commentId);
    const replyId = uuid_v4();
    const newReply = { replyId, ...createReplyDto };
    comment.replys.push(newReply);
    return await this.commentRepository.save(comment);
  }

  async removeReply(commentId: string, replyId: string) {
    const comment = await this.findOne(commentId);
    comment.replys = comment.replys.filter(
      (reply) => reply.replyId !== replyId,
    );
    return await this.commentRepository.save(comment);
  }
}

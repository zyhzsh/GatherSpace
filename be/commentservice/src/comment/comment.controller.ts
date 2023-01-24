import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CreateReplyDto } from './dto/create-reply.dto';

@Controller('api/comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  createComment(@Body() createCommentDto: CreateCommentDto) {
    return this.commentService.create(createCommentDto);
  }

  @Post('/reply')
  addReply(@Body() createReplyDto: CreateReplyDto) {
    return this.commentService.addReply(createReplyDto);
  }
  @Delete(':commentId')
  deleteComment(@Param('commentId') commentId: string) {
    return this.commentService.deleteComment(commentId);
  }

  @Get(':postId')
  getComments(@Param('postId') postId: string) {
    return this.commentService.getComments(postId);
  }

  @Delete(':commentId/reply/:replyId')
  deleteReply(
    @Param('replyId') replyId: string,
    @Param('commentId') commentId: string,
  ) {
    return this.commentService.removeReply(commentId, replyId);
  }
}

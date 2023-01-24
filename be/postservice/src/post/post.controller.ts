import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Put,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { FindPostQuery } from './dto/find-post-query.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('api/post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  createPost(@Body() newPost: CreatePostDto) {
    return this.postService.addPost(newPost);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.postService.deletePost(id);
  }
  @Get()
  getPosts(@Query() findPostQuery: FindPostQuery) {
    return this.postService.findPosts(findPostQuery);
  }

  @Put(':id')
  updatePost(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.updatePost(id, updatePostDto);
  }

  @Get(':id')
  getPost(@Param('id') id: string) {
    return this.postService.findOne(id);
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { FindPostQuery } from './dto/find-post-query.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  async updatePost(id: string, updatePostDto: UpdatePostDto) {
    const post = await this.findOne(id);
    post.title = updatePostDto.title;
    post.description = updatePostDto.description;
    return await this.postRepository.save(post);
  }

  async findPosts(findPostQuery: FindPostQuery) {
    const { ownerId, eventId } = findPostQuery;
    return await this.postRepository.find({
      where: { ownerId, eventId },
    });
  }
  async findOne(id: string) {
    return await this.postRepository.findOne({ where: { postId: id } });
  }

  async addPost(newPost: CreatePostDto) {
    const post = await this.postRepository.create(newPost);
    return await this.postRepository.save(post);
  }

  async deletePost(id: string) {
    return await this.postRepository.delete(id);
  }
}

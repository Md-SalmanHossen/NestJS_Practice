import { Injectable, NotFoundException } from '@nestjs/common';
import { Post } from './entities/post.entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  async findAll(): Promise<Post[]> {
    const findAllPosts = await this.postRepository.find();
    return findAllPosts;
  }

  async findOne(id: number): Promise<Post> {
    const singlePost = await this.postRepository.findOneBy({ id });

    if (!singlePost) {
      throw new NotFoundException(`Post with ID ${id} is not found`);
    }

    return singlePost;
  }

  async create(createPostData: CreatePostDto): Promise<Post> {
    // if dto then direct pass.
    // const newPost = this.postRepository.create({
    //   title: createPostData.title,
    //   content: createPostData.content,
    //   authorName: createPostData.authorName,
    // });

    const newPost = this.postRepository.create(createPostData);
    return this.postRepository.save(newPost);
  }
  
  async update(id: number, updatePostData: UpdatePostDto): Promise<Post> {
    const findPostToUpdate = await this.findOne(id);
    if (!findPostToUpdate) {
      throw new NotFoundException(`Post with Id ${id} not found`);
    }

    // if (updatePostData.title) {
    //   findPostToUpdate.title = updatePostData.title;
    // }

    // if (updatePostData.content) {
    //   findPostToUpdate.content = updatePostData.content;
    // }

    // if (updatePostData.authorName) {
    //   findPostToUpdate.authorName = updatePostData.authorName;
    // }

    //this is for clean code.
    Object.assign(findPostToUpdate, updatePostData);

    return this.postRepository.save(findPostToUpdate);
  }

  async remove(id: number): Promise<void> {
    const findPostToDelete = await this.postRepository.delete(id);
    if (findPostToDelete.affected === 0) {
      throw new NotFoundException(`Post with Id ${id} not found`);
    }
  }
}

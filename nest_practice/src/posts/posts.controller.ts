import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostExistsPipe } from './pipes/post-exists.pipes';
import { Post as PostEntity } from './entities/post.entities';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async findAll(): Promise<PostEntity[]> {
    return this.postsService.findAll();
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe, PostExistsPipe) id: number,
  ): Promise<PostEntity> {
    return this.postsService.findOne(id);
  }

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  //- for specific code validation
  // @UsePipes(
  //   new ValidationPipe({
  //     whitelist: true,
  //     forbidNonWhitelisted: true,
  //   }),
  // )
  async create(@Body() createPostData: CreatePostDto): Promise<PostEntity> {
    return this.postsService.create(createPostData);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe, PostExistsPipe) id: number,
    @Body()
    updatePostData: UpdatePostDto, //Partial<Omit<postInterface.Post, 'id' | 'createdAt'>>,
  ): Promise<PostEntity> {
    return this.postsService.update(id, updatePostData);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.postsService.remove(id);
  }
}

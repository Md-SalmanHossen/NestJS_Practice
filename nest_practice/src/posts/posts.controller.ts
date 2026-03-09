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
  Query,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import * as postInterface from './interfaces/post.interface';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostExistsPipe } from './pipes/post-exists.pipes';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  findALl(@Query('search') search?: string): postInterface.Post[] {
    const extractAllPosts = this.postsService.findAll();

    if (search) {
      return extractAllPosts.filter((singlePost) =>
        singlePost.title.toLowerCase().includes(search.toLowerCase()),
      );
    }

    return extractAllPosts;
  }

  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe, PostExistsPipe) id: number,
  ): postInterface.Post {
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
  create(@Body() createPostData: CreatePostDto): postInterface.Post {
    return this.postsService.create(createPostData);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe, PostExistsPipe) id: number,
    @Body()
    updatePostData: UpdatePostDto, //Partial<Omit<postInterface.Post, 'id' | 'createdAt'>>,
  ): postInterface.Post {
    return this.postsService.update(id, updatePostData);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe, PostExistsPipe) id: number): void {
    this.postsService.remove(id);
  }
}

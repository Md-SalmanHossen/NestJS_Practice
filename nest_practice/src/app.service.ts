import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {

  constructor(private configService: ConfigService) {}

  getHello(): string {
    const myConfig = this.configService.get<string>('NEST_APP');
    return `Hello ${myConfig}!`;
  }

}
 
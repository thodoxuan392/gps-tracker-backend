import { Module } from '@nestjs/common';
import { MongoDBClientModule } from 'infra/mongodb-client/mongodb-client.module';
import { LOGIN_REPOSITORY } from './login-repository.interface';
import { LoginRepositoryService } from './login-repository.service';

@Module({
  imports: [MongoDBClientModule],
  providers: [
    {
      provide: LOGIN_REPOSITORY,
      useClass: LoginRepositoryService,
    },
  ],
  exports: [LOGIN_REPOSITORY],
})
export class LoginRepositoryModule {}

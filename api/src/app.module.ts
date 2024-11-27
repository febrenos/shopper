import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { UsersModule } from './user/user.module';
import { RideService } from './ride/ride.service';
import { RideModule } from './ride/ride.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [UsersModule, RideModule, PrismaModule],
  controllers: [AppController, UserController],
  providers: [AppService, RideService],
})
export class AppModule {}

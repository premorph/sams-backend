import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ControllersModule } from './infrastructure/controllers/controllers.module';
import { ServicesModule } from './infrastructure/services/services.module';

@Module({
  imports: [ControllersModule, ServicesModule],
  controllers: [AppController],
  providers: [ AppService],
})
export class AppModule {}

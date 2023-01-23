import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EntitiesModule } from './entities.module';

@Module({
  imports: [EntitiesModule,
    TypeOrmModule.forRoot({
    type: 'mysql', 
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'lovenow',
    entities: ['dist/**/*.entity.js'],
    synchronize: true,
    autoLoadEntities: true
    // migrations: ['dist/migrations/*.js'],
  }),
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Module} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm"
import { User } from './user/user.entity';
//import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from './user/user.module';
// import { UserController } from './user/user.controller';
// import { UserService } from './user/user.service';
// import { AuthService } from './auth/auth.service';
// import { JwtStrategy } from './auth/jwt';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite', // database name
      entities: [User], 
      synchronize: true, // Automatically create database tables based on entity definitions
    }),

    //TypeOrmModule.forFeature([User]),
    //PassportModule.register({defaultStrategy:'jwt'}),
    JwtModule.register({
      secret:'trp001',
    }),
    UserModule,
  ],

  // controllers:[UserController],
  // providers:[UserService,AuthService,JwtStrategy]
  
})
export class AppModule {}

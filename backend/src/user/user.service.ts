import {Injectable,UnauthorizedException} from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import {Repository} from "typeorm"
import { CreateUserDto } from './dto/create-user.dto';
import {JwtService} from "@nestjs/jwt";
import * as bcrypt from 'bcrypt';
import { LoginDto } from "./dto/login.dto";


@Injectable()
export class UserService{
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private jwtService:JwtService
    ){}

    async register(userDto: CreateUserDto): Promise<User> {
      const user = this.userRepository.create(userDto)
      user.password = await bcrypt.hash(user.password,10)
      this.userRepository.save(user)
      return user
    }

    async login(loginDto: LoginDto): Promise<{ token: string;userId: number  }> {
      const { email, password } = loginDto;
      const user = await this.userRepository.findOne({ where: { email } });
  
      if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new UnauthorizedException('Invalid credentials');
      }
  
      const payload = { sub: user.id };
      const token = this.jwtService.sign(payload);
      const userId = user.id;

      return { userId,token };
    }

    async findById(uid: number) {
        return this.userRepository.findOneBy({id:uid})
    }
    
}

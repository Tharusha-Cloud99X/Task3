import {Controller,Post,Body, Get,Param,Request} from "@nestjs/common"
import { CreateUserDto } from "./dto/create-user.dto";
import { LoginDto } from "./dto/login.dto";
import { UserService } from "./user.service";

@Controller("users")
export class UserController{
    constructor(private userService:UserService){}

    @Post('register')
    async signup(@Body() userDto: CreateUserDto){
        return this.userService.register(userDto)
    }

    @Post("login")
    async login(@Body() loginDto: LoginDto){
        return this.userService.login(loginDto);
    }
    
    @Get('details/:id')
    async getProfile(@Request() req,@Param('id') id:number) {
        const token = req.headers.authorization; // Extract token from headers
        if(token){
            const idNumber = parseInt(id.toString(), 10);
            const user = await this.userService.findById(idNumber);
            console.log(user)
            return user;
        }
       
    }
}
import { Controller, Get, Body, Post } from '@nestjs/common';
import { JobDto } from './dto/job.dto';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }
    
    @Post('calculate_score') 
    getUserInput(@Body() userDto: UserDto) { 
        return this.userService.calculateScore(userDto);
    }
    
    @Post('job_search')
    jobSearch(@Body() jobDto: JobDto) {
        return this.userService.jobSearch(jobDto);
    }

    @Post('generate_advice') 
    generateAdvice(@Body() adviceDto: JobDto) {
        return this.userService.generateAdvice(adviceDto);
    }
    
}

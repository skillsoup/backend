import { Controller, Get, Body, Post } from '@nestjs/common';
import { JobDto } from './dto/job.dto';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }
    
    @Post('calculate_score') 
    async getUserInput(@Body() userDto: UserDto) { 
        let data = await this.userService.calculateScore(userDto);
        return data;
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

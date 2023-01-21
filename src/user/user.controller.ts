import { Controller, Get, Body } from '@nestjs/common';
import { JobDto } from './dto/job.dto';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }
    
    @Get('calculate_score') 
    getUserInput(@Body() userDto: UserDto) { 
        return this.userService.calculateScore(userDto);
    }
    
    @Get('job_search')
    jobSearch(@Body() jobDto: JobDto) {
        return this.userService.jobSearch(jobDto);
    }

    @Get('generate_advice') 
    generateAdvice(@Body() adviceDto: JobDto) {
        return this.userService.generateAdvice(adviceDto);
    }
    
}

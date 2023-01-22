import { Controller, Get, Body, Post } from '@nestjs/common';
import { JobDto } from './dto/job.dto';
import { SurveyDto } from './dto/survey.dto';
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

    @Post('explore')
    async explore(@Body() jobDto: JobDto) { 
        let data = await this.userService.explore(jobDto);
        return data; 
    }
        
    @Post('job_survey')
    async getJobSurvey(@Body() surveyDto: SurveyDto) { 
        let data = await this.userService.getJobSurvey(surveyDto);
        return data;
    }
    
    @Post('job_search')
    async jobSearch(@Body() jobDto: string) {
        let data = await this.userService.jobSearch(jobDto);
        return this.userService.jobSearch(jobDto);
    }

    @Post('generate_advice') 
    async generateAdvice(@Body() adviceDto: JobDto) {
        let data = await this.userService.generateAdvice(adviceDto);
        return this.userService.generateAdvice(adviceDto);
    }
    
}

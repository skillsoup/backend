import { Injectable } from '@nestjs/common';
import { JobDto } from './dto/job.dto';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {

    async calculateScore(userDto: UserDto): Promise<any> {
        return 'calculateScore working'
    }

    async jobSearch(jobDto: JobDto): Promise<any> { 
        return 'jobSearch working'
    }
    
    async generateAdvice(adviceDto: JobDto): Promise<any> {
        return 'generateAdvice working'
    }

}

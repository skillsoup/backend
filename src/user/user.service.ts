import { ConsoleLogger, Injectable } from '@nestjs/common';
import { CohereModel } from 'src/utils/query';
import { JobDto } from './dto/job.dto';
import { UserDto } from './dto/user.dto';


@Injectable()
export class UserService {
    
    co = new CohereModel();

    

    async calculateScore(userDto: UserDto): Promise<any> {
        let data;
        await this.co.queryUserInput(userDto.text)
            .then((a) => {
                data = a;
            });
        return data;
        

    }

    async jobSearch(jobDto: JobDto): Promise<any> { 
        return 'jobSearch working'
    }
    
    async generateAdvice(adviceDto: JobDto): Promise<any> {
        return 'generateAdvice working'
    }

}

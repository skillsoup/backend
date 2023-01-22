import { ConsoleLogger, Injectable } from '@nestjs/common';
import { CohereModel } from 'src/utils/query';
import { JobDto } from './dto/job.dto';
import { SurveyDto } from './dto/survey.dto';
import { UserDto } from './dto/user.dto';


@Injectable()
export class UserService {
    
    co = new CohereModel();

    
    async calculateScore(userDto: UserDto): Promise<any> {
        let data;
        await this.co.queryUserInput(userDto.text)
            .then((a) => {
                data = a;
            }).catch((err) => {
                console.log(err.response.data);
                throw new Error("Error while making request");
                ;
            });
        return data;
    }

    async getJobSurvey(surveyDto: SurveyDto): Promise<any> { 
        let data; 
        await this.co.getSpecificSkills(surveyDto)
            .then((a) => {
                data = a;
                console.log(data);
            }).catch((err) => {
                console.log(err.response.data);
                throw new Error("Error while making request");
            });
        data = parseSentences(data);
        return { 
            "communication": data[0], 
            "resilience": data[1],
            "teamwork": data[2],
            "organization": data[3], 
            "technical": data[4]
        };
    }

    async explore(jobDto: JobDto): Promise<any> { 
        let data;
        let job_skills;

        await this.co.getJobSkills(jobDto.job_position).
            then((a) => {
                job_skills = a;
            });
        job_skills = job_skills.split(', '); 
        let unfound_skills = job_skills;
        let found_skills = checkObjectElements(jobDto.skills, job_skills);

        for (let skill in found_skills) { 
            removeItemOnce(unfound_skills, skill); 
        }

        unfound_skills = unfound_skills.join(', ');
        
        await this.co.getJobSkillExplanation(unfound_skills, jobDto.job_position)
            .then((a) => {
                data = a;
            });
        
        return {
            "job_position": jobDto.job_position,
            "skills": unfound_skills,
            "advice": data
        }

    }
    async jobSearch(jobDto: string): Promise<any> { 
        let data; 
        await this.co.getJobSkills(jobDto)
            .then((a) => {
                data = a;
            }).catch((err) => {
                console.log(err.response.data);
                throw new Error("Error while making request");
            });
        return data;
    }
    
    async generateAdvice(adviceDto: JobDto): Promise<any> {
        let data;
        
        await this.co.getJobSkillExplanation('', adviceDto)
            .then((a) => {
                data = a;
            }).catch((err) => { 
                console.log(err.response.data);
                throw new Error("Error while making request");
            })
        return data;
        
    }

}


[
    "            \"Identifying and addressing errors, Problem-solving and decision-making, Communicating effectively with supervisors, Understanding the impacts of mistakes, Mitigating consequences, Prioritizing company, team, and supervisor's interests.\"",
    "             \"Setting clear and specific goals, Breaking the task into smaller, manageable chunks, Prioritizing self-care, Finding ways to make the task more enjoyable, Using a rewards system, Taking regular breaks to recharge, Staying informed of the latest industry developments and best practices, Communicating effectively with team members and supervisors\"",
    "            \"Creating technical plans, Supervising development teams, ensuring projects are completed on time and within budget, Communicating clearly and effectively, Setting clear goals and milestones, Checking in with clients, Keeping team members informed of changes, providing resources and support\"",
    "              \"Identifying and addressing urgent and important tasks, Prioritizing tasks based on urgency and importance, Planning and organizing daily work, Reviewing and adjusting priorities, Staying organized and focused, Using time effectively\"",
    "               \"Proficient in languages such as Python, Java, JavaScript, and C++\"\n              \"Experience with front-end and back-end technologies, including HTML, CSS, and JavaScript frameworks such as React and AngularJS, and back-end frameworks such as Flask and ExpressJS\"\n             \"Experience working with databases, including MySQL and MongoDB\"\n             \"Experience working with cloud platforms such as AWS and Azure\"\n            \"Good understanding of software development methodologies, including Agile and Scrum\"\n            \"Experience working in a team-based development environment\"\n           \"Comfortable with the entire software development life cycle and have experience working with version control systems like Git\""
]


function parseSentences(sentences) {
    let parsedSentences = []
    for (let sentence of sentences) {
        // remove leading and trailing whitespace
        sentence = sentence.trim();
        // remove quotes at the beginning and end of the sentence
        sentence = sentence.replace(/^"|"$/g, "");
        // split the sentence into individual words
        let words = sentence.split(", ");
        parsedSentences.push(words);
    }
    return parsedSentences;
}

function checkObjectElements(obj, list) {
    let foundElements = {};
    for (const key in obj) {
        foundElements[key] = [];
        for (let i = 0; i < obj[key].length; i++) {
            for (let j = 0; j < list.length; j++) {
                if (obj[key][i].includes(list[j])) {
                    foundElements[key].push(list[j]);
                }
            }
        }
    }
    return foundElements;
}

function removeItemOnce(arr, value) {
  var index = arr.indexOf(value);
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
}
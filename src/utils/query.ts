const cohere = require('cohere-ai');
cohere.init('DICHA29yySOiu8pYIebMzyrFvKLjdivZMZWRNT8Z');

export class CohereModel
{
    model: string;
    max_tokens: number;
    temperature: number;
    constructor()
    {
        this.model = "command-xlarge-nightly";
        this.max_tokens = 500;
        this.temperature = 0.5;

    }

    setMaxTokens(num)
    {
        this.max_tokens = num;
    }

    getJobSkills(title)
    {
        return this.makeGenerateQuery(`this program will list down specific technical skills a job should have in a list format. Here are some examples:

prompt: list down 10 specific technical skills a software engineer.

output:
"JavaScript, C++, Software Design, Software Testing, Software Maintenance, Teamwork, Communication, HTML/CSS, Django, MySQL"

prompt: list down 10 specific technical skills that every ${title} should have in the same format as in the example.
        
output:`);
    }

    getJobSkillExplanation(skill, job)
    {
        return this.makeGenerateQuery(`provide an explanation on why ${skill} is important for being a ${job}`);
    }

    queryUserTechnical(userInput)
    {
        return this.makeGenerateQuery(`
This program will extract relevant skills from responses to interview quetions. Here are some examples:

Answer: I stay motivated by thinking about the end result. I\’ve found that even in the midst of a challenging situation, reminding myself of my goals helps me take a step back and stay positive.
Extracted Skills: 
"Persistent, Forward-Looking, Goal-Oriented"

--
Answer: ${userInput}

Extracted Skills:
`)
    }

    queryUserInput(userInput)
    {
        return this.makeGenerateQuery(`
this program will parse a message for technical skills into a list of skills, for example:

prompt: Hey everyone, I'm Ishan. I'm a second year CS student at UofT. I have interned at RBC where I got lots of experience in ExpressJS, ReactJS, JavaScript/ TypeScript, FastAPI, HTML, and CSS. Some other languages/tech that I know include Python, Java, React Native, SQL, MariaDB, and MongoDB. I am most interested in machine learning and backend development. Feel free to message me if you are looking for a team member. Here's my website: https://ishan-singh-3005.github.io/ishan/#home 

output: "ReactJS, ExpressJS, Java, Python, MariaDB, MongoDB, SQL, Typescript, FastAPI"

prompt: ${userInput}

output:`);
    }

    async categoriseJobSkills(title)
    {
        const response = await cohere.classify({ 
            model: 'large', 
            inputs: [title], 
            examples: [
                    { "text": "Verbal communication", "label": "Communication Skills" },
                    { "text": "Written communication", "label": "Communication Skills" },
                    { "text": "Presentation skills", "label": "Communication Skills" },
                    { "text": "Interpersonal communication", "label": "Communication Skills" },
                    { "text": "Public speaking", "label": "Communication Skills" },
                    { "text": "Active listening", "label": "Communication Skills" },
                    { "text": "Conflict resolution", "label": "Communication Skills" },
                    { "text": "Negotiation", "label": "Communication Skills" },
                    { "text": "Facilitation", "label": "Communication Skills" },
                    { "text": "Communication in virtual teams", "label": "Communication Skills" },
                    { "text": "Problem-solving", "label": "Critical Thinking" },
                    { "text": "Decision-making", "label": "Critical Thinking" },
                    { "text": "Analytical thinking", "label": "Critical Thinking" },
                    { "text": "Strategic thinking", "label": "Critical Thinking" },
                    { "text": "Creativity", "label": "Critical Thinking" },
                    { "text": "Innovation", "label": "Critical Thinking" },
                    { "text": "Adaptability", "label": "Resilience" },
                    { "text": "Stress management", "label": "Resilience" },
                    { "text": "Time management", "label": "Resilience" },
                    { "text": "Self-motivation", "label": "Resilience" },
                    { "text": "Self-awareness", "label": "Resilience" },
                    { "text": "Empathy", "label": "Emotional Intelligence" },
                    { "text": "Social awareness", "label": "Emotional Intelligence" },
                    { "text": "Self-regulation", "label": "Emotional Intelligence" },
                    { "text": "Relationship management", "label": "Emotional Intelligence" },
                    { "text": "Collaboration", "label": "Teamwork" },
                    { "text": "Team leadership", "label": "Teamwork" },
                    { "text": "Coaching", "label": "Teamwork" },
                    { "text": "Mentoring", "label": "Teamwork" },
                    { "text": "Feedback", "label": "Teamwork" },
                    { "text": "Delegation", "label": "Teamwork" },
                    { "text": "Project management", "label": "Teamwork" },
                    { "text": "Goal setting", "label": "Teamwork" },
                    { "text": "Planning", "label": "Teamwork" },
                    { "text": "Organizing", "label": "Teamwork" },
                    { "text": "Prioritizing", "label": "Teamwork" },
                    { "text": "Cultural competency", "label": "Teamwork" },
                    { "text": "Diversity and inclusion", "label": "Teamwork" },
                    { "text": "Consensus building", "label": "Teamwork"},
                    { "text": "Java", "label": "Technical" },  { "text": "Python", "label": "Technical" },  { "text": "C++", "label": "Technical" },  { "text": "JavaScript", "label": "Technical" },  { "text": "SQL", "label": "Technical" },  { "text": "C#", "label": "Technical" },  { "text": "PHP", "label": "Technical" },  { "text": "Ruby", "label": "Technical" },  { "text": "Swift", "label": "Technical" },  { "text": "Objective-C", "label": "Technical" },  { "text": "HTML/CSS", "label": "Technical" },  { "text": "Surgery", "label": "Technical" },  { "text": "Mechanical engineering", "label": "Technical" },  { "text": "Electrical engineering", "label": "Technical" },  { "text": "Computer networking", "label": "Technical" },  { "text": "Cybersecurity", "label": "Technical" },  { "text": "Data analysis", "label": "Technical" },  { "text": "Machine learning", "label": "Technical" },  { "text": "Artificial intelligence", "label": "Technical" },  { "text": "Cloud computing", "label": "Technical" },  { "text": "Blockchain", "label": "Technical" },  { "text": "Automation", "label": "Technical" },
                    { "text": "Patient care", "label": "Communication Skills" },  { "text": "Medical terminology", "label": "Communication Skills" },  { "text": "Pharmacology", "label": "Technical" },  { "text": "Clinical research", "label": "Critical Thinking" },  { "text": "Surgery", "label": "Technical" },  { "text": "Emergency medicine", "label": "Resilience" },  { "text": "Infection control", "label": "Emotional Intelligence" },  { "text": "Team coordination", "label": "Teamwork" },  { "text": "Finance", "label": "Technical" },  { "text": "Accounting", "label": "Technical" },  { "text": "Investment banking", "label": "Critical Thinking" },  { "text": "Risk management", "label": "Resilience" },  { "text": "Regulatory compliance", "label": "Emotional Intelligence" },  { "text": "Financial analysis", "label": "Teamwork" },
                    { "text": "Legal research", "label": "Critical Thinking" },  { "text": "Contract drafting", "label": "Communication Skills" },  { "text": "Litigation", "label": "Emotional Intelligence" },  { "text": "Mediation", "label": "Resilience" },  { "text": "Construction management", "label": "Teamwork" },  { "text": "Architecture", "label": "Technical" },  { "text": "Engineering", "label": "Technical" },  { "text": "Manufacturing", "label": "Technical" },  { "text": "Quality control", "label": "Critical Thinking" },  { "text": "Education", "label": "Communication Skills" },  { "text": "Curriculum development", "label": "Critical Thinking" },  { "text": "Classroom management", "label": "Emotional Intelligence" },  { "text": "Student mentoring", "label": "Resilience" },  { "text": "Collaborative learning", "label": "Teamwork" }
                ]})
        return response.body.classifications[0].prediction;        
    }

    async categoriseAllSkills(skills)
    {
        let skillsWithCategories = {}
        for(let i = 0; i < skills.length; i++)
        {
            skillsWithCategories[skills[i]] = await this.categoriseJobSkills(skills[i]);
        }

        return skillsWithCategories;
    }

    async makeGenerateQuery(prompt)
    {
        const response = await cohere.generate(
        {
            model: 'command-xlarge-nightly',
            prompt: prompt,
            max_tokens: this.max_tokens,
            temperature: this.temperature,
            k: 0,
            p: 0.75,
            frequency_penalty: 0,
            presence_penalty: 0,
            stop_sequences: [],
            return_likelihoods: 'NONE'
        });

        return response.body.generations[0].text;
    }
}



// co = new CohereModel();

<<<<<<< HEAD:src/utils/query.js
// co.categoriseAllSkills(["Coding", "Public speaking", "Networking"])
// .then((a) => {
//     console.log(a);
// })

// co.getJobSkills("doctor")
// .then((a) => console.log(a));

// co.categoriseJobSkills("Negotiation")
// .then((a) => console.log(a));
=======
// // co.getJobSkills("hardware engineer")
// // .then((a) => console.log(a));

// // co.categoriseJobSkills("charisma")
// // .then((a) => console.log(a));
>>>>>>> f3bd50931deb2ac26d91e25b2b64adfe57d8f117:src/utils/query.ts

// // co.getJobSkillExplanation("Assassin's Creed 3", "Genghis Khan")
// // .then((a) => console.log(a));

<<<<<<< HEAD:src/utils/query.js
// co.queryUserInput(``)
=======
// co.queryUserInput(`Hey everyone, I'm Ishan. I'm a second year CS student at UofT. I have interned at RBC where I got lots of experience in ExpressJS, ReactJS, JavaScript/ TypeScript, FastAPI, HTML, and CSS. Some other languages/tech that I know include Python, Java, React Native, SQL, MariaDB, and MongoDB. I am most interested in machine learning and backend development. Feel free to message me if you are looking for a team member. Here's my website: https://ishan-singh-3005.github.io/ishan/#home`)
>>>>>>> f3bd50931deb2ac26d91e25b2b64adfe57d8f117:src/utils/query.ts
// .then((a) => {console.log(a)});

// co.queryUserTechnical("I think that a good leader is someone who can make decisions while also listening to others and being willing to admit when you’re wrong and course correct. In my last role, my team and I were responsible for giving a big presentation to a prospective client. I quickly assigned different tasks to members of my team, but the project never really got moving. I gave everyone an opportunity to share their input and concerns, and it turned out that they were struggling in the roles I’d given them. I ended up switching a few people around. Meanwhile, the employee I’d assigned to give the presentation was nervous, but still wanted to give it a try. I worked with them to make sure they were ready and even held a practice session so that they could rehearse in a more comfortable environment. When the time came for the real thing, they nailed it! We landed the client and the company still has the account to this day. And that employee became a go-to person for important client presentations. I’m really glad I took the time to listen to everyone’s concerns so that I could re-evaluate my approach and help my team be the best it could be.")
// .then((a) => {console.log(a)});

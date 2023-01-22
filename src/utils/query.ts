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

    getJobSkills(title)
    {
        return this.makeGenerateQuery(`
        this program will list down specific technical skills a job should have in a JSON format. Here are some examples:

        prompt: list down 10 specific technical skills a software engineer should have in a JSON format.
        
        output:
        {
            "technical_skills": [
            "JavaScript",
            "C++",
            "Software Design",
            "Software testing",
            "Software maintenance",
            "Teamwork",
            "Communication",
            "HTML/CSS",
            "Django",
            "MySQL"
            ]
        }

        prompt: list down 10 specific technical skills that every ${title} should have in the same format as in the example.
                
        output:`);
    }

    getJobSkillExplanation(skill, job)
    {
        return this.makeGenerateQuery(`provide an explanation on why ${skill} is important for being a ${job}`);
    }

    queryUserInput(userInput)
    {
        return this.makeGenerateQuery(`${userInput} \n \n Parse the above message for technical skills into the format:
        "skills" : ["skill name 1", "skill name 2", ...] 

        without any other information.
        `);
    }

    // send skill sets to ai and get advice
    async categoriseJobSkills(title)
    {
        const response = await cohere.classify({ 
            model: 'large', 
            inputs: [title], 
            examples: [
                {"text": "Technical skills", "label": "technical"},
                {"text": "Programming languages", "label": "technical"},
                {"text": "Software development", "label": "technical"},
                {"text": "IT support", "label": "technical"},
                {"text": "Web development", "label": "technical"},
                {"text": "Communication", "label": "communication"},
                {"text": "Presentation skills", "label": "communication"},
                {"text": "Sales skills", "label": "communication"},
                {"text": "Marketing skills", "label": "communication"},
                {"text": "Customer service", "label": "communication"},
                {"text": "Public speaking", "label": "communication"},
                {"text": "Writing", "label": "communication"},
                {"text": "Editing", "label": "communication"},
                {"text": "Time management", "label": "organization"},
                {"text": "Creativity", "label": "organization"},
                {"text": "Planning and organization", "label": "organization"},
                {"text": "Cost management", "label": "organization"},
                {"text": "Strategic thinking", "label": "organization"},
                {"text": "Social media management", "label": "organization"},
                {"text": "Content creation", "label": "organization"},
                {"text": "UI/UX design", "label": "organization"},
                {"text": "Product management", "label": "organization"},
                {"text": "Quality control", "label": "organization"},
                {"text": "Critical thinking", "label": "teamwork and collaboration"},
                {"text": "Teamwork", "label": "teamwork and collaboration"},
                {"text": "Adaptability", "label": "teamwork and collaboration"},
                {"text": "Budgeting", "label": "teamwork and collaboration"},
                {"text": "Data analysis", "label": "teamwork and collaboration"},
                {"text": "Supply chain management", "label": "teamwork and collaboration"},
                {"text": "Operations management", "label": "teamwork and collaboration"},
                {"text": "Training and development", "label": "teamwork and collaboration"},
                {"text": "Networking", "label": "teamwork and collaboration"},
                {"text": "Mentoring", "label": "teamwork and collaboration"},
                {"text": "Coaching", "label": "teamwork and collaboration"},
                {"text": "Event planning", "label": "teamwork and collaboration"},
                {"text": "Nonverbal communication", "label": "teamwork and collaboration"},
                {"text": "Photoshop", "label": "technical"},
                {"text": "JavaScript", "label": "technical"},
                {"text": "HTML", "label": "technical"},
                {"text": "CSS", "label": "technical"},
                {"text": "C++", "label": "technical"},
                {"text": "Python", "label": "technical"},
                {"text": "SQL", "label": "technical"},
                {"text": "Java", "label": "technical"},
                {"text": "C#", "label": "technical"},
                {"text": "PHP", "label": "technical"},
                {"text": "Photoshop Lightroom", "label": "technical"},
                {"text": "Illustrator", "label": "technical"},
                {"text": "Premiere Pro", "label": "technical"},
                {"text": "AutoCAD", "label": "technical"},
                {"text": "Solidworks", "label": "technical"}
            ]}); 
        return response.body.classifications[0].prediction;        
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

// // co.getJobSkills("hardware engineer")
// // .then((a) => console.log(a));

// // co.categoriseJobSkills("charisma")
// // .then((a) => console.log(a));

// // co.getJobSkillExplanation("Assassin's Creed 3", "Genghis Khan")
// // .then((a) => console.log(a));

// co.queryUserInput(`Hey everyone, I'm Ishan. I'm a second year CS student at UofT. I have interned at RBC where I got lots of experience in ExpressJS, ReactJS, JavaScript/ TypeScript, FastAPI, HTML, and CSS. Some other languages/tech that I know include Python, Java, React Native, SQL, MariaDB, and MongoDB. I am most interested in machine learning and backend development. Feel free to message me if you are looking for a team member. Here's my website: https://ishan-singh-3005.github.io/ishan/#home`)
// .then((a) => {console.log(a)});


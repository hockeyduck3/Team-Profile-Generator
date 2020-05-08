const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const style = require("./lib/style");

// Output paths
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
const outputPath2 = path.join(OUTPUT_DIR, "style.css");

const render = require("./lib/htmlRenderer");

// This empty array will be used to make sure that Employees don't have the same id
const idsTaken = [];

// The user's response will be pushed to this empty array, after they're done this array will be used for the render function.
const team = [];

const fieldValidation = async input => {
    if (input.trim() === '') {
       return 'Field cannot be left blank';
    }

    return true;
}

const idValidation = async input => {
    if (input.trim() === '') {
      return 'id cannot be empty'
    } 
    else if (!input.match(/[0-9]/)) {
        return 'id needs to be a number.'
    } 
    else if (idsTaken.indexOf(input) !== -1) {
        return 'Sorry but that id number is already taken. Please pick a different id number';
    }

    return true;
}

const emailValidation = async input => {    
    if (input.trim() === '') {
        return 'Email cannot be empty.';
    } 

    // Got this simple email validation regex from: http://regexlib.com/Search.aspx?k=email
    else if (!input.trim().match(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)) {
        return 'Must be a valid email address';
    }


    return true;
}

managerFunc();

function managerFunc() {
    const managerQuestions = [
        {
            type: 'input',
            name: 'managerName',
            message: 'What is the name of your manager?',
            validate: fieldValidation
        },
        {
            type: 'input',
            name: 'managerId',
            message: 'What is your manager\'s id number?',
            validate: idValidation
        },
        {
            type: 'input',
            name: 'managerEmail',
            message: 'What is your manager\'s email?',
            validate: emailValidation
        },
        {
            type: 'input',
            name: 'managerOffice',
            message: 'Finally, what is your manager\'s office number?',
            validate: fieldValidation
        }
    ];

    console.log('Let\'s buld your team!\n');

    inquirer.prompt(managerQuestions).then(res => {
        let name = res.managerName;
        let id = res.managerId;
        let email = res.managerEmail;
        let officeNum = res.managerOffice;

        idsTaken.push(id);

        const manager = new Manager(name, id, email, officeNum);

        team.push(manager);

        anotherEmployeeFunc();
    })
}

function engineerFunc() {
    const engineerQuestions = [
        {
            type: 'input',
            name: 'engineerName',
            message: 'What is the name of this Engineer?',
            validate: fieldValidation
        },
        {
            type: 'input',
            name: 'engineerId',
            message: 'What is the Engineer\'s id number?',
            validate: idValidation
        },
        {
            type: 'input',
            name: 'engineerEmail',
            message: 'What is the Engineer\'s email?',
            validate: emailValidation
        },
        {
            type: 'input',
            name: 'engineerGithub',
            message: 'Finally, what is the Engineer\'s Github username?',
            validate: fieldValidation
        }
    ]

    inquirer.prompt(engineerQuestions).then(res => {
        let name = res.engineerName;
        let id = res.engineerId;
        let email = res.engineerEmail;
        let github = res.engineerGithub;

        idsTaken.push(id);

        const engineer = new Engineer(name, id, email, github);

        team.push(engineer);

        anotherEmployeeFunc();
    })
}

function internFunc() {
    const internQuestions = [
        {
            type: 'input',
            name: 'internName',
            message: 'What is the name of the Intern?',
            validate: fieldValidation
        },
        {
            type: 'input',
            name: 'internId',
            message: 'What is the Intern\'s id number?',
            validate: idValidation
        },
        {
            type: 'input',
            name: 'internEmail',
            message: 'What is the Intern\'s email?',
            validate: emailValidation
        },
        {
            type: 'input',
            name: 'internSchool',
            message: 'Finally, what school did the Intern attend?',
            validate: fieldValidation
        }
    ];

    inquirer.prompt(internQuestions).then(res => {
        let name = res.internName;
        let id = res.internId;
        let email = res.internEmail;
        let school = res.internSchool;

        idsTaken.push(id);

        const intern = new Intern(name, id, email, school);

        team.push(intern);

        anotherEmployeeFunc();
    })
}

// This function will be called after everytime the user is finished with an inquirer prompt
function anotherEmployeeFunc() {
    // This is just to help keep things seperate in the console, therefore making it a little easier to read.
    console.log("\n----------------------\n");

    const anotherEmployeeQuestions = [
        {
            type: 'list',
            name: 'continue',
            message: 'Would you like to add another team member?',
            choices: ['Engineer', 'Intern', 'No thanks']
        }
    ]

    inquirer.prompt(anotherEmployeeQuestions).then(res => {
        switch (res.continue) {
            case 'Engineer':
                engineerFunc();
                break;
            case 'Intern':
                internFunc();
                break;
            default:
                // If the output folder does not exist then one will be made
                if (!fs.existsSync(OUTPUT_DIR)) {
                    fs.mkdirSync(OUTPUT_DIR, err => {
                        if (err) console.log(err)
                    })
                }

                // Write file for the team cards
                fs.writeFileSync(outputPath, render(team), 'utf-8');

                // Write file for the CSS styling module
                fs.writeFileSync(outputPath2, style, 'utf-8');

                console.log("\n----------------------\n");

                console.log('Your team has been generated!');
        }
    })
}
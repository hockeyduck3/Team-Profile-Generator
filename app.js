const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const idsTaken = [];

const team = [];

const fieldValidation = async input => {
    if (input === '') {
       return 'Field cannot be left blank';
    }

    return true;
}

const idValidation = async input => {
    if (idsTaken.indexOf(input) !== -1) {
        return 'Sorry but that id number is already taken. Please pick a different id number';
    }

    return true;
}

managerFunc();

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

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
            validate: fieldValidation
        },
        {
            type: 'input',
            name: 'managerEmail',
            message: 'What is your manager\'s email?',
            validate: fieldValidation
        },
        {
            type: 'input',
            name: 'managerOffice',
            message: 'Finally, what is your manager\'s office number?',
            validate: fieldValidation
        }
    ];

    console.log('Let\'s buld your team!')

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
            validate: fieldValidation
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
            validate: fieldValidation
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

        console.log(team);

        anotherEmployeeFunc();
    })
}

function anotherEmployeeFunc() {
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
        }
    })
}

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```

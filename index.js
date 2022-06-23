const inquirer = require("inquirer");
const fs = require('fs');
const generateMarkdown = require('./utils/generateMarkdown')
// TODO: Include packages needed for this application
// TODO: Create an array of questions for user input
const questions = [
    {
        type: 'input',
        name: 'title',
        message: 'What is the name of your project? (Required)',
        validate: nameInput => {
            if (nameInput) {
                return true;
            } else {
                console.log('Please enter your project name!');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'description',
        message: 'Provide a description of the project (Required)',
        validate: descriptionInput => {
            if (descriptionInput) {
                return true;
            } else {
                console.log('Please enter description of your project!');
                return false;
            }
        }
    },
    {
        type: 'confirm',
        name: 'confirmAboutInstall',
        message: 'Does your project require installation?',
        default: false
    },
    {
        type: 'input',
        name: 'installation',
        message: 'Please write about the steps required to install your project:',
        when: ({ confirmAboutInstall }) => {
            if (confirmAboutInstall) {
                return true;
            } else {
                return false;
            }
        }
    },
    {
        type: 'confirm',
        name: 'confirmAboutUsage',
        message: 'Do you need usage information?',
        default: false
    },
    {
        type: 'input',
        name: 'usage',
        message: 'Please enter usage information here:',
        when: ({ confirmAboutUsage }) => {
            if (confirmAboutUsage) {
                return true;
            } else {
                return false;
            }
        }
    },
    {
        type: 'confirm',
        name: 'confirmAboutContribution',
        message: 'Do you need contribution guidelines?',
        default: false
    },
    {
        type: 'input',
        name: 'contribution',
        message: 'Please enter contribution guidelines here:',
        when: ({ confirmAboutContribution }) => {
            if (confirmAboutContribution) {
                return true;
            } else {
                return false;
            }
        }
    },
    {
        type: 'confirm',
        name: 'confirmAboutTest',
        message: 'Do you need test instructions?',
        default: false
    },
    {
        type: 'input',
        name: 'test',
        message: 'Please enter test instructions here:',
        when: ({ confirmAboutTest }) => {
            if (confirmAboutTest) {
                return true;
            } else {
                return false;
            }
        }
    },
    {
        type: 'confirm',
        name: 'confirmAboutLicense',
        message: 'Do you need license section?',
        default: true
    },
    {
        type: 'rawlist',
        name: 'license',
        message: 'Which license would you like to use?',
        choices: ['Apache 2.0', 'BSD 3', 'GPL', 'LGPL', 'MIT', 'Mozilla Public License 2.0'],
        when: ({ confirmAboutLicense }) => {
            if (confirmAboutLicense) {
                return true;
            } else {
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'github',
        message: 'What is your GitHub username? (Required)',
        validate: githubInput => {
            if (githubInput) {
                return true;
            } else {
                console.log('Please enter your GitHub username!');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'email',
        message: 'What is your email address? (Required)',
        // refer to https://gist.github.com/Amitabh-K/ae073eea3d5207efaddffde19b1618e8
        validate: emailInput => {
            let valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailInput)
            if (emailInput && valid) {
                return true;
            } else if (emailInput && !valid) {
                console.log('.  Please enter a valid email');
                return false;
            } else {
                console.log('Please enter your email address!');
                return false;
            }
        }
    }
];

// TODO: Create a function to write README file
function writeToFile(fileName, data) {
    return new Promise((resolve, reject) => {
        fs.writeFile(fileName, data, err => {
            if (err) {
                reject(err);
                return;
            }
            resolve({
                ok: true,
                message: 'File created!'
            });
        });
    });
};


// TODO: Create a function to initialize app
function init() {
    return inquirer.prompt(questions)
        .then(answers => {
            return generateMarkdown(answers);
        })
        .then(readmeContent => {
            return writeToFile('./dist/README.md', readmeContent);
        })
        .then(writeToFileResponse => {
            console.log(writeToFileResponse);
        })
        // .catch(err => {
        //     console.log(err);
        // });
}

// Function call to initialize app
init();

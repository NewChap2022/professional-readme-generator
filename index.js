const inquirer = require("inquirer");
const fs = require('fs');

// TODO: Include packages needed for this application
// TODO: Create an array of questions for user input
const questions = [
    {
        type: 'input',
        name: 'name',
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
            default: true
    },
    {
        type: 'input',
        name: 'installation',
        message: 'Please write about ',
        when: ({ confirmAbout }) => {
            if (confirmAbout) {
                return true;
            } else {
                return false;
            }
        }
    }
];

// TODO: Create a function to write README file
function writeToFile(fileName, data) { }

// TODO: Create a function to initialize app
function init() { }

// Function call to initialize app
init();

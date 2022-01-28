const mysql = require('mysql2');
const inquirer = require('inquirer');
require("dotenv").config();

const db = mysql.createConnection(
    {
    host: "localhost",
    user: process.env.user,
    password: process.env.password,
    database: process.env.database
},
console.log(`Connected to the dundermifflin_db database.`)
);

const options = () => {
    return inquirer.prompt([
        {
            type: 'list',
            message: "What would you like to do?",
            name: "choice",
            choices: [ "Add Departments", "View Departments", "Add Roles", "View Roles", "Add Employees", "View Employees", "Done"]
        }
    ])

.then(res => {
    switch (res.choice) {
        case "Add Departments":
            addDepartments();
            break;
        case "View Departments":
            viewDepartments();
            break;
        case "Add Roles":
            addRoles();
            break;
        case "View Roles":
            viewRoles();
            break;
        case "Add Employees":
            addEmployees();
            break;
        case "View Employees":
            viewEmployees();
            break;
        default:
            options();
    }
});
};

function viewDepartments() {
    db.query(`SELECT * FROM department`, (err, result) => {
        if (err) {
            console.log(err);
        }
        console.table(result);
        options();
    })
}

function viewRoles() {
    db.query(`SELECT role.title, role.id, department.name, role.salary FROM role JOIN department ON role.department_id = department.id;`, (err, result) => {
        if (err) {
            console.log(err);
        }
        console.table(result);
        options();
    })
}


options();
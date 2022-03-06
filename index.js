const mysql = require('mysql2');
const inquirer = require('inquirer');
require("dotenv").config();

const db = mysql.createConnection(
    {
    host: "localhost",
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
},
console.log(`Connected to the dundermifflin_db database.`)
);

const options = () => {
    return inquirer.prompt([
        {
            type: 'list',
            message: "What would you like to do?",
            name: "choice",
            choices: [ "Add Departments", "View Departments", "Add Roles", "View Roles", "Add Employees", "View Employees", "Update an Employee", "Done"]
        }
    ]).then(res => {
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
        case "Update an Employee":
            updateEmployee();
            break;
        case "Done":
            db.end();
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

function viewEmployees() {
    const sql = `SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name AS department FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id`;
  
  db.query(sql, (err, res) => {
    if (err) {
        console.log(err);
       return;
    }
    console.table(res);
    options();
  });
}
function addDepartments() {
    inquirer.prompt([
      {
        type: "input",
        name: "newDepartment",
        message: "What is the name of the department you would like to add?",
      },
    ])
    .then(function (answer) {
        const sql = "INSERT INTO department (name) VALUE (?)";
      db.query(sql, answer.newDepartment, function (err, res) {
        if (err) throw err;
        console.log(`Successfully Added Department!`);
        options();
      });
    }
    );
}
function addRoles() {
    inquirer.prompt([
      {
        type: "input",
        name: "title",
        message: "What is the title of the new role?",
      },
      {
        type: "input",
        name: "salary",
        message: "What is the salary?",
      },
      {
        type: "list",
        name: "departmentID",
        message:
          "What is the Department ID for this new role? Please select 1 for Management, 2 for Sales, 3 for Reception",
        choices: [1, 2, 3]
      },
    ])
    .then(function (answer) {
        const sql = "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)";
      db.query(sql,[answer.title, answer.salary, answer.departmentID],function (err, res) {
          if (err) throw err;
            console.log(`Successfully Added Role: ${answer.title}`);
            options();
          }
      )
    })
}
function addEmployees() {
    inquirer.prompt([
      {
        type: "input",
        name: "employeefirstName",
        message: "What is the employee's first name",
      },
      {
        type: "input",
        name: "employeelastName",
        message: "What is the employee's last name?",
      },
      {
        type: "input",
        name: "employeeroleID",
        message: "What is the employee's role ID?",
      },
      {
        type: "input",
        name: "managerID",
        message: "What is your manager ID?",
      }
    ])
    .then(function (answer) {
        const sql = "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)";
      db.query(sql,[answer.employeefirstName, answer.employeelastName, answer.employeeroleID, answer.managerID],function (err, res) {
          if (err) throw err;
            console.log(`Successfully Added Role: ${answer.employeefirstName}`);
            options();
          }
      )
    })
}
function updateEmployee() {
    console.log('Update an Employee');
    options();
}

options();
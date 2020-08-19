var mysql = require("mysql");
var inquirer = require("inquirer");
var cTable = require('console.table');
require("dotenv").config();
var connection = mysql.createConnection({
  host: "localhost",
  // Your port; if not 3306
  port: 3306,
  // Your username
  user: "root",
  // Your password
  password: process.env.MYSQL_PASSWORD,
  database: "employee_management_system_DB"
});
connection.connect(function (err) {
  if (err) throw err;
  mainMenu();
});
function mainMenu() {
  inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "What would you like to do?",
      choices: [
        "View All Employees",
        "View All Departments",
        "View All Employees By Manager",
        "Add Employee",
        "Remove Employee",
        "Update Employee Role",
        "Update Employee Manager"
      ]
    })
    .then(function (answer) {
      switch (answer.action) {
        case "View All Employees":
          viewAllEmployees();
          break;
        case "View All Departments":
          viewDepartments();
          break;
        case "View All Employees By Manager":
          viewEmployeesByManager();
          break;
        case "Add Employee":
          addEmployee();
          break;
        case "Remove Employee":
          removeEmployee();
          break;
        case "Update Employee Role":
          updateEmployeeRole();
          break;
        case "Update Employee Manager":
          updateEmployeeManager();
          break;
      }
    });
}
let qryDep = "SELECT * FROM department;";
let qryEmp = "SELECT a.id, a.first_name, a.last_name, b.title, d.name as `department`, IFNULL(CONCAT(c.first_name,' ',c.last_name),'none') as `manager` FROM employee ";
qryEmp += "a LEFT JOIN role b ON a.role_id = b.id ";
qryEmp += "LEFT JOIN employee c ON a.manager_id = c.id ";
qryEmp += " LEFT JOIN department d ON b.department_id = d.id";
function viewAllEmployees() {
  connection.query(qryEmp, function (err, res) {
    if (err) throw err;
    console.table("Employees:", res);
    mainMenu();
  });
};
function viewDepartments() {
  connection.query(qryDep, function (err, res) {
    if (err) throw err;
    console.table("Departments:", res);
    mainMenu();
  });
};
function viewEmployeesByManager() {
  connection.query(qryEmp, function (err, res) {
    if (err) throw err;
    console.table("Enter the ID of the manager whose employees you'd like to see:", res);
  });
  inquirer
    .prompt({
      name: "id",
      type: "input",
      message: "Enter the ID of a manager to view their employees",
    })
    .then((answer) => {
      let qryMgr = qryEmp + " WHERE a.manager_id = " + parseInt(answer.id);
      connection.query(qryMgr, function (err, res) {
        if (err) throw err;
        console.table("Employees that report to the selected manager:", res);
        mainMenu();
      });
    });
};
function addEmployee() {
  inquirer
    .prompt([
      {
        name: "first_name",
        type: "input",
        message: "What is the employee's first name?"
      },
      {
        name: "last_name",
        type: "input",
        message: "What is the employee's last name?"
      },
      {
        name: "last_name",
        type: "input",
        message: "What is the last name of the new employee?"
      }, {
        name: "role_id",
        type: "input",
        message: "What is the role ID of the new employee?"
      }, {
        name: "manager_id",
        type: "input",
        message: "What is the employee ID of the new employee's manager (if any?)?"
      }])
    .then((answer) => {
      var query = "INSERT INTO employee SET ?";
      connection.query(query, {
        first_name: answer.first_name,
        last_name: answer.last_name,
        role_id: parseInt(answer.role_id),
        manager_id: parseInt(answer.manager_id)
      }, function (err, res) {
        if (err) throw err;
        viewAllEmployees();
      });
    });
}
function removeEmployee() {
  connection.query(qryEmp, function (err, res) {
    if (err) throw err;
    console.table(res);
    inquirer
      .prompt([{
        name: "id",
        type: "input",
        message: "Enter the ID of an employee to delete:",
      }]).then((answer) => {
        const qryDel = "DELETE FROM employee WHERE ID = " + answer.id;
        connection.query(qryDel, function (err, res) {
          if (err) throw err;
        });
        connection.query(qryEmp, function (err, res) {
          if (err) throw err;
          console.log("ID " + answer.id + " deleted.");
        });
        mainMenu();
      });
  });
}
function updateEmployeeRole() {
  connection.query(qryEmp, function (err, res) {
    if (err) throw err;
    console.table("Enter the ID of the employee that you would like to update:", res);
  });
  inquirer
    .prompt([{
      name: "id",
      type: "input",
      message: "Enter the ID of the employee that you would like to update:",
    }]).then((answer) => {
      const empID = answer.id;
      inquirer
        .prompt([{
          name: "id",
          type: "input",
          message: "Enter the ID of the role that you would like to assign the employee to:",
        }]).then((answer) => {
          let qryUpd;
          if (answer.id === "") {
            qryUpd = "UPDATE employee SET role_id = null";
          } else {
            qryUpd = "UPDATE employee SET role_id = " + parseInt(answer.id);
          }
          qryUpd += " WHERE id = " + empID;
          connection.query(qryUpd, function (err, res) {
            if (err) throw err;
          });
          connection.query(qryEmp, function (err, res) {
            if (err) throw err;
            console.table("Employees", res);
            mainMenu();
          });
        });
    });
}
function updateEmployeeManager() {
  connection.query(qryEmp, function (err, res) {
    if (err) throw err;
    console.table("Enter the ID of the employee that you would like to update:", res);
  });
  inquirer
    .prompt([{
      name: "id",
      type: "input",
      message: "Enter the ID of the employee that you would like to update:",
    }]).then((answer) => {
      const empID = answer.id;
      inquirer
        .prompt([{
          name: "id",
          type: "input",
          message: "Enter the ID of the manager that you would like to assign the employee to:",
        }]).then((answer) => {
          let qryUpd;
          if (answer.id === "") {
            qryUpd = "UPDATE employee SET manager_id = null";
          } else {
            qryUpd = "UPDATE employee SET manager_id = " + parseInt(answer.id);
          }
          qryUpd += " WHERE id = " + empID;
          connection.query(qryUpd, function (err, res) {
            if (err) throw err;
          });
          connection.query(qryEmp, function (err, res) {
            if (err) throw err;
            console.table("Employees", res);
            mainMenu();
          });
        });
    });
}
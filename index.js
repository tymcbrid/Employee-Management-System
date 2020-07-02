var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "employee_managementDB"
});

connection.connect(function(err) {
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
        "View All Employees By Department",
        "View All Employees By Manager",
        "Add Employee",
        "Remove Employee",
        "Update Employee Role",
        "Update Employee Manager"
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
      case "View All Employees":
        viewAllEmployees();
        break;

      case "View All Employees By Department":
        viewEmployeesByDepartment();
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

function viewAllEmployees() {};

function viewEmployeesByDepartment() {
  inquirer
    .prompt({
      name: "department",
      type: "rawlist",
      message: "View employees of which department?",
      choices: [
        "SALES",
        "ACCOUNTING",
        "PARTYPLANNING"
      ]
    })
    .then(function(answer) {
      var department = answer.action
      switch (adepartment) {
        case "SALES":
          returnEmployeesByDepartment(department);
          break;
  
        case "ACCOUNTING":
          returnEmployeesByDepartment(department);
          break;
        
        case "PARTYPLANNING":
          returnEmployeesByDepartment(department);
          break;
        }
    });
};

//
//
//  DO THIS
//
function returnEmployeesByDepartment(department){};

// 
// 
//

function viewEmployeesByManager() {
  inquirer
    .prompt({
      name: "manager",
      type: "rawlist",
      message: "View employees of which manager?"
    })
    .then(function(answer) {
      var manager = answer.action
      switch (manager) {
        case "SCOTT":
          returnEmployeesByManager(manager);
          break;
  
        case "PORTER":
          returnEmployeesByManager(manager);
          break;
        
        case "CALIFORNIA":
          returnEmployeesByManager(manager);
          break;
        }
    });
};

//
//
function returnEmployeesByManager(manager){}
// ADD THIS
//


function addEmployee() {
  inquirer
    .prompt({
      name: "name",
      type: "input",
      message: "quesiton to user?"
    })
    .then(function(answer) {
      var query = "SELECT x, y, z FROM table WHERE ?";
      connection.query(query, function(err, res) {
        mainMenu();
      });
    });
};

function removeEmployee() {
  inquirer
    .prompt({
      name: "name",
      type: "input",
      message: "quesiton to user?"
    })
    .then(function(answer) {
      var query = "SELECT x, y, z FROM table WHERE ?";
      connection.query(query, function(err, res) {
        mainMenu();
      });
    });
};

function updateEmployeeRole() {
  inquirer
    .prompt({
      name: "name",
      type: "input",
      message: "quesiton to user?"
    })
    .then(function(answer) {
      var query = "SELECT x, y, z FROM table WHERE ?";
      connection.query(query, function(err, res) {
        mainMenu();
      });
    });
};

function updateEmployeeManager() {
  inquirer
    .prompt({
      name: "name",
      type: "input",
      message: "quesiton to user?"
    })
    .then(function(answer) {
      var query = "SELECT x, y, z FROM table WHERE ?";
      connection.query(query, function(err, res) {
        mainMenu();
      });
    });
};
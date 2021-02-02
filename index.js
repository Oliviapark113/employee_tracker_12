const mysql = require('mysql');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
       host: 'localhost',
       port: 3306,
       user: 'root',
       password:'coder5378!',
       database:'employee_db'

});

connection.connect(err=>{
    if(err) throw err
    console.log(`connected as id${connection.threadId}`)
    intro();

})

const intro = () =>{

   inquirer.prompt([{
      name: "choice",
      type: "list",
      message: "What would you like to do?",
      choices :["View All Employees By Department",
                "View All Employees By Manager",
                "Add Employee",
                "Remove Employee",
                "Update Employee Role",
                "Update Employee Manager",
                "View All Roles"
                ]

        }]).then(answer =>{
            if(answer.choice === "View All Employees By Department"){
                readAllEmployeeByDept();
            }
            else if (answer.choice === "View All Employees By Manager" ){
                readAllManager();
            }

            else if (answer.choice === "Add Employee" ){
                addEmployee();
            }

            else if (answer.choice === "Remove Employee" ){
                removeEmployee();
            }

            else if (answer.choice === "Update Employee Role" ){
                updateEmployeeRole();
            }

            else if (answer.choice === "Update Employee Manager" ){
                updateEmployeeManager();
            }

            else if (answer.choice === "View All Roles" ){
                updateEmployeeManager();
            }
        })


}
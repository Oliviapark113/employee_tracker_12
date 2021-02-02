const mysql = require('mysql');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
       host: 'localhost',
       port: 3306,
       user: 'root',
       password:'coder5378!',
       database:'employeeTracker_db'

});

connection.connect(err=>{
    if(err) throw err
    console.log(`connected as id${connection.threadId}`)
    intro();

})

const intro = () =>{
   inquirer.prompt([{
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices :["View All Employees By Department",
                "View All Employees By Manager",
                "Add Employee",
                "Remove Employee",
                "Update Employee Role",
                "Update Employee Manager",
                "View All Roles",
                "EXIT"
                ]

        }]).then(answer =>{
            switch(answer.action) {
                
                case "View All Employees By Department":
                readAllEmployeeByDept();
                break;

                case "View All Employees By Manager" :
                readAllManager();
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

                case "View All Roles":
                    readAllRoles();
                    break;

                    case "EXIT":
                        connection.end();
                        break;
            }
           
        })

}


const readAllEmployeeByDept = ()=>{
  
    
    connection.query('SELECT employee.id, employee.first_name, employee.last_name, employee.manager,role.title, role.department, role.salary FROM employee INNER JOIN role ON role.id = employee.role_id;',(err, results)=>{
        if (err) throw err
        console.table(results)
    })



}
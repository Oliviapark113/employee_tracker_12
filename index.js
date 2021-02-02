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
      choices :["View All Employees",
                "View All Employees By Department",
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

                case "View All Employees":
                readAllEmployee();
                break;
                
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

const readAllEmployee =()=>{

    connection.query('SELECT employee.id, first_name, last_name,title ,department FROM employee INNER JOIN role ON role.id = employee.id;', (err,results)=>{
        if(err) throw err
        console.table(results)
        intro();
    })
}


const readAllEmployeeByDept = ()=>{
  
    
    connection.query('SELECT employee.id, employee.first_name, employee.last_name, employee.manager,role.title, role.department, role.salary FROM employee INNER JOIN role ON role.id = employee.role_id;',(err, results)=>{
        if (err) throw err
        console.table(results)
        intro();
    })



}

const readAllManager = () =>{
  connection.query('SELECT * FROM employee WHERE manager_id IS null;', (err, results)=>{
      if(err) throw err
      console.table(results)
      intro();
  })


}

const addEmployee =()=>{
     inquirer.prompt([
       { name: "firstName",
         type:"input",
         message:"What employee's first name"
       },

       { name: "lastName",
         type:"input",
         message:"What employee's last name"
       },

       { name: "roleId",
         type:"input",
         message:"What employee's roleID"
       },

       { name: "confirmation",
         message: "Is this managing role",
         default:false
       }

     ]).then(info =>{
         let questions; 
         if(info.confirmation){
             questions =[
                 { name: 'managerId',
                  type: 'input',
                  message: 'Please enter employee\'s manager id '},

                  { name: 'managerName',
                  type: 'input',
                  message: 'Please enter employee\'s manager name '}
                
                ]
            }

    })
    inquirer.prompt(questions).then(info2 =>{

        connection.query('INSERT INTO employee SET?', {
         first_name: info.firstName,
         last_name: info.lastName,
         role_id: info.roleId,
         manager_id: info2.managerId,
         manager: info2.managerName

        },(err, results)=>{
            if(err)throw err
            console.table(results)
            intro();
        })

    })

}

const removeEmployee = () =>{
    inquirer.prompt([
        { name: 'id',
          type:'input',
          message: 'Please enter employee\'s id number you would like to remove?'

        }]).then(idInfo =>{
            connection.query('DELETE FROM employee WHERE?',{id:idInfo},
            (err, results)=>{
                if(err) throw err
                  console.table(results)
                  intro();
                
                })

        })

}
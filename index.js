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

    const choices =[ "View All Employees",
                     "View Employees info",
                     "View All Employees By Department",
                     "View All Employees By Manager",
                     "Add Employee",
                     "Remove Employee",
                     "Update Employee Role",
                     "Update Employee Manager",
                     "View All Roles",
                     "EXIT"
                    ]

const intro = () =>{
   inquirer.prompt([{
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices :choices

        }]).then(answer =>{
            switch(answer.action) {
                case choices[0]:
                readAllEmployee();
                break;

                case choices[1]:
                readEmployeeInfo();
                break;

                case choices[2]:
                readAllEmployeeByDept();
                break;

                case choices[3] :
                readAllManager();
                break;

                case choices[4]:
                addEmployee();
                break;

                case choices[5]:
                removeEmployee();
                break;

                case choices[6]:
                updateEmployeeRole();
                break;

                case choices[7]:
                updateEmployeeManager();
                break;

                case choices[8]:
                    readAllRoles();
                    break;

                 case choices[9]:
                        exit();
                        break;
            }   
        })
}

const readAllEmployee =()=>{
    let query = 'SELECT employee.id, employee.first_name, employee.last_name,role.title,department.department,role.salary, employee.manager FROM employee LEFT JOIN role ON role.id = employee.role_id LEFT JOIN department ON department.id = role.department_id;'

    connection.query(query, (err,results)=>{
        if(err) throw err
        console.table(results)
        intro();
    })
}

const readEmployeeInfo =()=>{
    let queryInfo = 'SELECT * FROM employee;'

    connection.query(queryInfo, (err,results)=>{
        if(err) throw err
        console.table(results)
        intro();
    })
}

const readAllEmployeeByDept = ()=>{
    inquirer.prompt([{
        name: 'department',
        type:'list',
        choices: ['Engineering', 'Sales', 'Legal']
    }]).then(answer =>{
        let queryByDept = 'SELECT employee.id, employee.first_name, employee.last_name, role.title,department.department FROM employee LEFT JOIN role ON role.id = employee.id LEFT JOIN department ON department.id = role.department_id WHERE ?;'
    
        connection.query(queryByDept,{department: answer.department},(err, results)=>{
            if (err) throw err
            console.table(results)
            intro();
        })

    })

  
}

const readAllManager = () =>{
    let queryByManager = 'SELECT * FROM employee WHERE  manager_id IS null OR role_id = 7;'
  connection.query(queryByManager, (err, results)=>{
      if(err) throw err
      console.table(results)
      intro();
  })
}

const addEmployee = () =>{
     inquirer.prompt([

       { name: "firstName",
         type:"input",
         message:"What employee's first name?"
       },

       { name: "lastName",
         type: "input",
         message:"What employee's last name?"
       },

       { name: "roleId",
         type:"input",
         message:"What employee's role ID?",
       },

       { name: "managerId",
       message: "What is employee's manager ID?",
       type: "input"

       },

     { name: "manager",
     message: "Who is employee's manager?",
     type: "list",
     choices:["None", "David Allen", "Ashley Judd", "Robert Rodrigez"]

      }

     ]).then(answer =>

        {  
    
          connection.query("INSERT INTO employee SET ?",
          { first_name: answer.firstName,
            last_name:answer.lastName,
            role_id:answer.roleId,
            manager_id:answer.mangerId,
            manager:answer.manager},(err)=>{
                     if (err) throw err
                     readEmployeeInfo();
                        intro();
               
        }
    )
})
}

 
const removeEmployee = () =>{

    inquirer.prompt([
        { name: 'firstName',
          type:'input',
          message: 'What is first name of employee you would like to remove?'

        },

        { name: 'lastName',
          type:'input',
          message: 'What is last name of employee you would like to remove?'

        }

    ]).then(answer =>{
            connection.query('DELETE FROM employee WHERE first_name=? AND last_name=?',
            [answer.firstName,answer.lastName],
            (err, results)=>{
                if(err) throw err
                console.table(results)
                  readEmployeeInfo();
                  intro();
                })
        })

}

const updateEmployeeRole = () =>{
        inquirer.prompt([{
            name: 'id', 
            type: 'input',
            message:'Please enter id number that you would like to update title'
        },
        {
            name: 'title', 
            type: 'input',
            message:'Please enter new title'
        }    
       ]).then(updateInfo=>{
           connection.query('UPDATE role SET ? WHERE?',[
               { 
                title: updateInfo.title
               },
               {
                 id: updateInfo.id  
               }], 
               (err, results)=>{
                  if(err) throw err
                  console.table(results)
                  intro();
               })
        })
}

//Update employee managers

// Delete departments, roles, and employees

// View the total utilized budget of a department -- ie the combined salaries of all employees in that department


const updateEmployeeManager = () =>{
    inquirer.prompt([{
        name: 'action', 
        type: 'list',
        message:'What would you like to update for Manager',
        choices:['Title', 'Salary']

    }

   ]).then(selection=>{
       if(selection.action === 'Title'){
           updateManagerTitle();
       }
       else if (selection.action === 'Salary'){
           updateManagerSalary();
       }

    })

}

const updateManagerTitle = () =>{
     inquirer.prompt([
         {name: 'id',
           type:'input',
        message: 'Please enter manager\'s id'},

         {
         name: 'title',
         type: 'input',
         message: 'What is the new Tile for Manager'
         }
    ]).then(managerInfo =>{
        connection.query('UPDATE role SET ? WHERE?',[
            { 
             title: managerInfo.title
            },
            {
              id: managerInfo.id  
            }], 
            (err, results)=>{
               if(err) throw err
               console.table(results)
               intro();
            })
})

}

const readAllRoles = () =>{
  let queryByRoles = 'SELECT department.id, department.department, role.title, role.department FROM department LEFT JOIN role ON department.id = role.department_id;'
  connection.query(queryByRoles, (err, results)=>{
      if(err)throw err
      console.table(results)
      intro()
  })

}

const exit = () => {
   connection.end();
    process.exit();
}
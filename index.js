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

    const choices =[  "View All Employees",
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
                readAllEmployeeByDept();
                break;

                case choices[2] :
                readAllManager();
                break;

                case choices[3]:
                addEmployee();
                break;

                case choices[4]:
                removeEmployee();
                break;

                case choices[5]:
                updateEmployeeRole();
                break;

                case choices[6]:
                updateEmployeeManager();
                break;

                case choices[7]:
                    readAllRoles();
                    break;

                    case choices[8]:
                        exit();
                        break;
            }
           
        })

}

const readAllEmployee =()=>{
    let query = 'SELECT employee.id, first_name, last_name,title ,department FROM employee INNER JOIN role ON role.id = employee.id;'
    connection.query(query, (err,results)=>{
        if(err) throw err
        console.table(results)
        intro();
         
    })
}


const readAllEmployeeByDept = ()=>{
  let queryByDept = 'SELECT employee.id, employee.first_name, employee.last_name, employee.manager,role.title, role.department, role.salary FROM employee INNER JOIN role ON role.id = employee.role_id;'
    
    connection.query(queryByDept,(err, results)=>{
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
        
         if(info.confirmation){
             inquirer.prompt([
                 { name: 'managerId',
                  type: 'input',
                  message: 'Please enter employee\'s manager id '},

                  { name: 'managerName',
                  type: 'input',
                  message: 'Please enter employee\'s manager name '}
                
                ]).then(info2 =>{

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
    })
    

}

const removeEmployee = () =>{
    inquirer.prompt([
        { name: 'id',
          type:'input',
          message: 'Please enter employee\'s id number you would like to remove?'

        }]).then(idInfo =>{
            connection.query('DELETE FROM employee WHERE?',{id:idInfo.id},
            (err, results)=>{
                if(err) throw err
                  console.table(results)
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

    },

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

const exit = () => {
    console.log('exit')
    process.exit()
}
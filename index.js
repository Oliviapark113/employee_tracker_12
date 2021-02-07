const mysql = require('mysql');
const inquirer = require('inquirer');
const util = require('util')

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'coder5378!',
    database: 'employeeTracker_db'

});

connection.connect(err => {
    if (err) throw err
    console.log(`connected as id${connection.threadId}`)
    intro();

})

const choices = [
    "View All Employees",
    "View Employees info",
    "View All Employees By Department",
    "View All Employees By Manager",
    "Add Employee",
    "Remove Employee",
    "Update Employee Role",
    "View All Roles",
    "View Budget",
    "EXIT"
]

const intro = () => {
    inquirer.prompt([{
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: choices

    }]).then(answer => {
        switch (answer.action) {
            case choices[0]:
                readAllEmployee();
                break;

            case choices[1]:
                readEmployeeInfo();
                break;

            case choices[2]:
                readAllEmployeeByDept();
                break;

            case choices[3]:
                readAllManager();
                break;

            case choices[4]:
                addEmployee();
                break;

            case choices[5]:
                removeEmployee();
                break;

            case choices[6]:
                updateEmployee();
                break;

            case choices[7]:
                readAllRoles();
                break;

            case choices[8]:
                readBudget();
                break;

            case choices[9]:
                exit();
                break;
        }
    })
}

const readAllEmployee = () => {
    let query = 'SELECT employee.id, employee.first_name, employee.last_name,role.title,department.department,role.salary FROM employee LEFT JOIN role ON role.id = employee.role_id LEFT JOIN department ON department.id = role.department_id;'

    connection.query(query, (err, results) => {
        if (err) throw err
        console.table(results)
        intro();
    })
}

const readEmployeeInfo = () => {
    let queryInfo = 'SELECT * FROM employee;'

    connection.query(queryInfo, (err, results) => {
        if (err) throw err
        console.table(results)
        intro();
    })
}

const readAllEmployeeByDept = () => {
    inquirer.prompt([{
        name: 'department',
        type: 'list',
        choices: ['Engineering', 'Sales', 'Legal', 'Finance']
    }]).then(answer => {
        let queryByDept = 'SELECT employee.id, employee.first_name, employee.last_name, role.title,department.department FROM employee LEFT JOIN role ON role.id = employee.id LEFT JOIN department ON department.id = role.department_id WHERE ?;'

        connection.query(queryByDept, { department: answer.department }, (err, results) => {
            if (err) throw err
            console.table(results)
            intro();
        })

    })


}

const readAllManager = () => {
    let queryByManager = 'SELECT * FROM employee WHERE  manager_id IS null;'
    connection.query(queryByManager, (err, results) => {
        if (err) throw err
        console.table(results)
        intro();
    })
}



const addEmployee = () => {

    connection.query('SELECT distinct title , department_id FROM role;', (err, results) => {
        if (err) throw err
        

         let rollArry =   results.map(element=>({name:`${element.title}`, 
            value:element.department_id}))
            console.log(rollArry)

        connection.query('SELECT * FROM employee', (err, results) => {
        
            if (err) throw err
            let managerArry = []
            managerArry.push({
                name: "None",
                value: null
            })

            results.forEach(element => {
                if (element.manager_id === null) {
                    managerArry.push({name:`${element.first_name} ${element.last_name}`, 
                                     value:element.id})
                }
            })

            console.log(managerArry)
 
            inquirer.prompt([
                {
                    name: "firstName",
                    type: "input",
                    message: "What employee's first name?"
                },
                {
                    name: "lastName",
                    type: "input",
                    message: "What employee's last name?"
                },
                {
                    name: "title",
                    type: "list",
                    message: "What is employee\'s role",
                    choices: rollArry
                },
                {
                    name: "manager",
                    message: "Who is employee's manager?",
                    type: "list",
                    choices: managerArry
                }
         
            ]).then(answer => {
                console.log(answer)
                connection.query("INSERT INTO employee SET ?",
                    {
                        first_name: answer.firstName,
                        last_name: answer.lastName,
                        role_id: answer.title,
                        manager_id: answer.manager

                    }, (err) => {
                        if (err) throw err
                        readEmployeeInfo();
                        intro();
                    })
            })
    
        })
        
    })

 }      
 
const removeEmployee = () =>{

    connection.query('SELECT * FROM employee',(err, results)=>{
        if(err) throw err                         
        let employeeArry = results.map(result=>{
          console.log(result.first_name +" "+result.last_name, result.id)
    
            return {name: result.first_name +" "+result.last_name,
             value: result.id}
    
         })
           console.log(employeeArry) 

        inquirer.prompt([{ 
        name: "id",
        type: "list",
        message: "Please choose employee name you would like to remove",
        choices: employeeArry
        }     
      ]).then(answer=>{
          console.log(answer)
          connection.query('DELETE FROM employee WHERE ?',
            { id:answer.id},
            (err, results) => {
                if (err) throw err
                console.table(results)
                readEmployeeInfo();
                intro();
            })

      })          
    
 })

}

const updateEmployee = () => {

    connection.query('SELECT * FROM employee', async(err, results)=>{
            if(err) throw err                         

        let nameArry =   results.map(element=>(
            { 
              name:`${element.first_name} ${element.last_name}`, 
              value:element.id 
              } 
           )
        )
        const nameId = await (inquirer.prompt([
            {
                name: "name",
                type: "list",
                message: "Please choose employee name you would like to update",
                choices: nameArry
                
            }])

        )
       

       connection.query('SELECT title , id FROM role;', async(err, results)=>{
            if(err) throw err
         
           let rollArry = results.map(element => (
             {
                name: element.title,
                value: element.id
                    // salary: element.salary        
                }
           ))
          
 
 
   const roleId = await(inquirer.prompt([
        {
        name: "title",
        type: "list",
        message: "Please choose new title for employee",
        choices: rollArry

    }])

   )
   console.log(nameId)
   console.log(roleId)

    connection.query('UPDATE employee  SET role_id =? WHERE id=? ',
        [{role_id:roleId.title},{id:nameId.name}], (err) => {
            if (err) throw err
            readEmployeeInfo();
            intro()
          })  

     })

  })
}


const readAllRoles = () => {
    let queryByRoles = 'SELECT employee.id, employee.first_name, employee.last_name,role.title, department.department FROM role LEFT JOIN employee ON role.id = employee.role_id LEFT JOIN department ON department.id =role.department_id;'
    connection.query(queryByRoles, (err, results) => {
        if (err) throw err
        console.table(results)
        intro()
    })

}

const readBudget = () => {
    inquirer.prompt([{
        name: 'budget',
        type: 'list',
        choices: ['Engineering', 'Sales', 'Legal'],
        message: 'Please select department that you would like to see Budget'
    },

    {
        name: 'id',
        type: 'input',
        message: 'Please enter department id to view Budget'
    },
    ]).then(answer => {
        let queryByBudget = 'SELECT SUM(salary) FROM role WHERE ?;'
        connection.query(queryByBudget, { department_id: answer.id }, (err, result) => {
            if (err) throw err
            console.table(result)
            intro()

        })


    })


}


const exit = () => {
    connection.end();
    process.exit();
}
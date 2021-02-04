const mysql = require('mysql');
const inquirer = require('inquirer');

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
                updateEmployeeRole();
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
        choices: ['Engineering', 'Sales', 'Legal']
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
    let queryByManager = 'SELECT * FROM employee WHERE  manager_id IS null OR role_id = 7;'
    connection.query(queryByManager, (err, results) => {
        if (err) throw err
        console.table(results)
        intro();
    })
}

const addEmployee = () => {
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
            name: "roleId",
            type: "input",
            message: "What employee's role ID?",
        },

        {
            name: "managerId",
            message: "What is employee's manager ID?",
            type: "input"

        }


    ]).then(answer => {

        connection.query("INSERT INTO employee SET ?",
            {
                first_name: answer.firstName,
                last_name: answer.lastName,
                role_id: answer.roleId,
                manager_id: answer.managerId

            }, (err) => {
                if (err) throw err
                readEmployeeInfo();
                intro();
                console.log(answer.mangerId)
            }
        )
    })
}


const removeEmployee = () => {

    inquirer.prompt([
        {
            name: 'id',
            type: 'input',
            message: 'What is employee\'s ID you would like to remove?'

        }

    ]).then(answer => {
        connection.query('DELETE FROM employee WHERE ?',
            { id: answer.id },
            (err, results) => {
                if (err) throw err
                console.table(results)
                readEmployeeInfo();
                intro();
            })
    })

}

const updateEmployeeRole = () => {
    let roleArry; 
//  1. Inside updateEmployee make a call to the database to get all the employees
// 2. map over those employees, creating an array of objects with their names and ids
connection.query('SELECT * FROM employee',(err, results)=>{
            if(err) throw err                         
          let employeeArry = results.map(result=>{
            console.log(result.first_name +" "+result.last_name, result.id)

              return {name: result.first_name +" "+result.last_name,
               id: result.id}

           })
             console.log(employeeArry)              
// 3. make another call to get all the roles that exist in your database
// 4. map over the roles returned, creating an array of objects with the title and ids 
  
    connection.query('SELECT * FROM role', (err, results)=>{
        if(err) throw err                         
         roleArry = results.map(result=>{
         console.log(result.title, result.id)

           return {title: result.title,
                      id: result.id}

        })
          console.log(roleArry)  
// 5. prompt the user to choose an employee, using the new employees array as their choices
// 6. prompt the user to choose the new role, using the roles array as the choices

inquirer.prompt([
    { name: "name",
       type: "list",
       message:"Please choose employee name you would like to update",
       choices: employeeArry
    //    choices:['Olivia Park','Chris Brown','David Allen',
    //    'Jake.Lau','Kevin Tupic','Jason Brown','Ashley Judd','Robert Rodrigez','John Jake' ]

    },
{   name: "newTitle",
    type: "list",
    message: "Please choose new title for employee",
    choices: roleArry
    // choices:['Sales Lead','Salesperson','Software Engineer',
    //   'Lead Engineer','Lawyer','Legal Lead']

}

]).then(answer =>{
    // 7. Use the ids from both choices to update the database
    connection.query('UPDATE role SET ? WHERE?', [{ title:answer.newTitle},
                                                   {id:roleArry.id || employeeArry.id }], (err)=>{
           if(err) throw err
           readAllRoles()
           intro()
        })

     })

  }) 

})

// you query the data base to get your employees, so the user can choose which user to update       

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
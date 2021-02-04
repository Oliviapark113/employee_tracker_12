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

const choices = ["View All Employees",
    "View Employees info",
    "View All Employees By Department",
    "View All Employees By Manager",
    "Add Employee",
    "Remove Employee",
    "Update Employee Role",
    "Update Employee Manager",
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
                updateEmployeeManager();
                break;

            case choices[8]:
                readAllRoles();
                break;

            case choices[9]:
                readBudget();
                break;

            case choices[10]:
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
    inquirer.prompt([{
        name: 'id',
        type: 'input',
        message: 'Please enter id number that you would like to update title'
    },
    {
        name: 'title',
        type: 'list',
        message: 'Please choose title',
        choices: ['Software Engineer', 'Lead Engineer'
            , 'Salesperson', 'Sales Lead', 'Lawyer', 'Legal Lead']
    },

    {
        name: 'salary',
        type: 'input',
        message: 'Please enter updated salary',
       
    },

    {
        name: 'department_id',
        type: 'input',
        message: 'Please enter updated department_id',
       
    }

    ]).then(answer => {
        connection.query('UPDATE role SET ? WHERE?', [
            {
                 id: answer.id
            },
            {
                title: answer.title
            },
            {
                salary: answer.salary
            },

            {
                department_id: answer.department_id
            }
           ],
            (err, results) => {
                if (err) throw err
                readAllEmployee();
                intro();
            })
    })
}


const updateEmployeeManager = () => {
    inquirer.prompt([{
        name: 'action',
        type: 'list',
        message: 'What would you like to update for Manager',
        choices: ['Title', 'Salary']

    }

    ]).then(selection => {
        if (selection.action === 'Title') {
            updateManagerTitle();
        }
        else if (selection.action === 'Salary') {
            updateManagerSalary();
        }

    })

}

const updateManagerTitle = () => {
    inquirer.prompt([
        {
            name: 'id',
            type: 'input',
            message: 'Please enter manager\'s id'
        },

        {
            name: 'title',
            type: 'input',
            message: 'What is the new Title for Manager'
        }
    ]).then(answer => {
        connection.query('UPDATE role SET ? WHERE?', [
            {
                title: answer.title
            },
            {
                id: answer.id
            }],
            (err, results) => {
                if (err) throw err
                console.table(results)
                intro();
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
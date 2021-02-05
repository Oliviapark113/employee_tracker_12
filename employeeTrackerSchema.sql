DROP DATABASE IF EXISTS employeeTracker_db;

CREATE DATABASE employeeTracker_db;

USE employeeTracker_db;

CREATE TABLE department (
id INT NOT NULL AUTO_INCREMENT,
-- to hold department name
name VARCHAR(30) NOT NULL,
PRIMARY KEY (id)

);


CREATE TABLE role (
id INT NOT NULL AUTO_INCREMENT,
-- to hold role title
title VARCHAR(30) NOT NULL,
salary DECIMAL(10,2) NOT NULL,
-- INT to hold reference to department role belongs to
department_id INT(10),
PRIMARY KEY (id)

);

CREATE TABLE employee(
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR (30) NOT NULL,
  last_name VARCHAR (30) NOT NULL,
  role_id INT(10),
  manager_id INT(10),
  PRIMARY KEY (id)
);


INSERT INTO department (department) VALUES ('Engineering');
INSERT INTO department (department) VALUES ('Sales');
INSERT INTO department (department) VALUES ('Legal');

INSERT INTO role (title, salary, department_id ) 
VALUES ('Software Engineer', 95000, 1);
INSERT INTO role (title, salary, department_id ) 
VALUES ('Software Engineer', 85000, 1);
INSERT INTO role (title, salary, department_id ) 
VALUES ('Lead Engineer', 145000, 1);
INSERT INTO role (title, salary, department_id ) 
VALUES ('Salesperson', 75000, 2);
INSERT INTO role (title, salary, department_id ) 
VALUES ('Salesperson', 65000, 2);
INSERT INTO role (title, salary, department_id ) 
VALUES ('Sales Lead', 125000, 2);
INSERT INTO role (title, salary, department_id ) 
VALUES ('Lawyer', 105000, 3);
INSERT INTO role (title, salary, department_id ) 
VALUES ('Leal Lead', 135000, 3);
INSERT INTO role (title, salary, department_id ) 
VALUES ('Legal Assitant', 65000, 3);

INSERT INTO role (title, salary, department_id ) 
VALUES ('Software Engineer', 75000, 1);
INSERT INTO role (title, salary, department_id ) 
VALUES ('Salesperson', 70000, 2);
INSERT INTO role (title, salary, department_id ) 
VALUES ('Legal Assistant', 60000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES('Olivia', 'Park', 1, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES('Chris', 'Brown', 2, 3);
INSERT INTO employee (first_name, last_name, role_id)
VALUES('David', 'Allen', 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES('Jake', 'Lau', 4, 6);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES('Kevin', 'Tupic', 5, 6);
INSERT INTO employee (first_name, last_name, role_id)
VALUES('Jason', 'Brown', 6);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES('Ashley', 'Judd', 7, 8);
INSERT INTO employee (first_name, last_name, role_id)
VALUES('Robert', 'Rodrigez', 8);
INSERT INTO employee (first_name, last_name, role_id,manager_id)
VALUES('John', 'Jake', 9, 8);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES('Kim', 'Caroll', 10, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES('Tim', 'Alex', 11, 6);
INSERT INTO employee (first_name, last_name, role_id,manager_id)
VALUES('Emma', 'Thompson', 12, 8);


-- readAll employee
SELECT employee.id, employee.first_name, employee.last_name,
role.title,department.department,role.salary
FROM employee
LEFT JOIN role ON role.id = employee.role_id
LEFT JOIN department ON department.id = role.department_id;

-- readAllemloyee by Department
SELECT employee.id, employee.first_name, employee.last_name, role.title, department.department
FROM employee
LEFT JOIN role ON role.id = employee.id 
LEFT JOIN department ON department.id = role.department_id WHERE department.department = 'Engineering';

-- readAllmanager 
SELECT * FROM employee WHERE  manager_id IS null;

-- -- readAllroles Join
SELECT employee.id, employee.first_name, employee.last_name,
role.title, department.department
FROM role
LEFT JOIN employee ON role.id = employee.role_id
LEFT JOIN department ON department.id =role.department_id;


SELECT * FROM department; 
SELECT * FROM role;
SELECT * FROM employee; 

ALTER TABLE department RENAME COLUMN name TO department;

ALTER TABLE employee DROP COLUMN manager;

-- View the total utilized budget of a department -- 
-- ie the combined salaries of all employees in that department
SELECT SUM(salary) AS EngineeringBudget FROM role WHERE department_id=1;
SELECT SUM(salary) AS SalesBudget FROM role WHERE department_id=2;
SELECT SUM(salary) AS LegalBudget FROM role WHERE department_id=3;


TRUNCATE TABLE department; 
TRUNCATE TABLE role;
TRUNCATE TABLE employee; 

SELECT e.*, CONCAT (m.first_name, ' ', m.last_name) AS manager FROM employee AS e
LEFT JOIN employee AS m ON e.manager_id = m.id;
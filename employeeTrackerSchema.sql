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
-- INT to hold reference to another employee that manages the employee being Created. 
-- This field may be null if the employee has no manager
  manager_id INT(10),
  PRIMARY KEY (id)
);


INSERT INTO department (name) VALUES ('Olivia Park');
INSERT INTO role (title, salary, department_id ) 
VALUES ('Software Engineer', 95000, 10);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES('Olivia', 'Park', 10, 3);

INSERT INTO department (name) VALUES ('Chris Brown');
INSERT INTO role (title, salary, department_id ) 
VALUES ('Software Engineer', 85000, 10);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES('Chris', 'Brown', 10, 3);

INSERT INTO department (name) VALUES ('David Allen');
INSERT INTO role (title, salary, department_id ) 
VALUES ('Lead Engineer', 125000, 10);
INSERT INTO employee (first_name, last_name, role_id)
VALUES('David', 'Allen', 10);

INSERT INTO department (name) VALUES ('Jake Lau');
INSERT INTO role (title, salary, department_id ) 
VALUES ('Salesperson', 75000, 20);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES('Jake', 'Lau', 20, 6);

INSERT INTO department (name) VALUES ('Kevin Tupic');
INSERT INTO role (title, salary, department_id ) 
VALUES ('Salesperson', 65000, 20);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES('Kevin', 'Tupic', 20, 6);

INSERT INTO department (name) VALUES ('Jason Brown');
INSERT INTO role (title, salary, department_id ) 
VALUES ('Sales Lead', 135000, 20);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES('Jason', 'Brown', 20, 7);

INSERT INTO department (name) VALUES ('Ashley Judd');
INSERT INTO role (title, salary, department_id ) 
VALUES ('Lawyer', 105000, 30);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES('Ashley', 'Judd', 30, 8);

INSERT INTO department (name) VALUES ('Robert Rodrigez');
INSERT INTO role (title, salary, department_id ) 
VALUES ('Leal Lead', 235000, 30);
INSERT INTO employee (first_name, last_name, role_id)
VALUES('Robert', 'Rodrigez', 30);


ALTER TABLE role ADD department VARCHAR(30);
ALTER TABLE role ADD manager VARCHAR(30);
ALTER TABLE role
DROP COLUMN manager;
ALTER TABLE employee ADD manager VARCHAR(30);


UPDATE employee set manager = 'David Allen' WHERE manager_id =3;
UPDATE employee set manager = 'Ashley Judd' WHERE manager_id =7;
UPDATE employee set manager = 'Robert Rodrigez' WHERE manager_id =8;


-- readAll employee
SELECT employee.id, employee.first_name, employee.last_name,
role.title,employee.manager, department.department
FROM employee
LEFT JOIN role ON role.id = employee.role_id
LEFT JOIN department ON department.id = role.department_id;

-- readAllemloyee by Department 
-- SELECT employee.id, employee.first_name, employee.last_name, employee.manager, 
-- role.title, role.salary 
-- FROM employee
-- INNER JOIN role ON role.id = employee.role_id;

SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name
FROM employee
LEFT JOIN role ON role.id = employee.id 
LEFT JOIN department ON department.id = role.department_id WHERE department.department = 'Engineering';

-- readAllmanager 
-- SELECT * FROM employee WHERE manager_id IS null;

-- -- readAllroles  .. 
SELECT department.id, department.name, role.title, 
role.department 
FROM department
LEFT JOIN 
role ON department.id = role.department_id;

-- View the total utilized budget of a department 
-- ie the combined salaries of all employees in that department

-- -- Right Join
SELECT employee.id, employee.first_name, employee.last_name, employee.manager,
role.title, role.department
FROM role
RIGHT JOIN employee ON role.id = employee.role_id;

SELECT * FROM department; 
SELECT * FROM role;
SELECT * FROM employee; 

ALTER TABLE department RENAME COLUMN name TO department



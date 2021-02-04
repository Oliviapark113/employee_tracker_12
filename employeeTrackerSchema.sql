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


INSERT INTO department (name) VALUES ('Olivia Park');
INSERT INTO role (title, salary, department_id ) 
VALUES ('Software Engineer', 95000, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES('Olivia', 'Park', 1, 3);

INSERT INTO department (name) VALUES ('Chris Brown');
INSERT INTO role (title, salary, department_id ) 
VALUES ('Software Engineer', 85000, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES('Chris', 'Brown', 2, 3);

INSERT INTO department (name) VALUES ('David Allen');
INSERT INTO role (title, salary, department_id ) 
VALUES ('Lead Engineer', 125000, 1);
INSERT INTO employee (first_name, last_name, role_id)
VALUES('David', 'Allen', 3);

INSERT INTO department (name) VALUES ('Jake Lau');
INSERT INTO role (title, salary, department_id ) 
VALUES ('Salesperson', 75000, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES('Jake', 'Lau', 4, 7);

INSERT INTO department (name) VALUES ('Kevin Tupic');
INSERT INTO role (title, salary, department_id ) 
VALUES ('Salesperson', 65000, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES('Kevin', 'Tupic', 5, 7);

INSERT INTO department (name) VALUES ('Jason Brown');
INSERT INTO role (title, salary, department_id ) 
VALUES ('Sales Lead', 135000, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES('Jason', 'Brown', 6, 7);

INSERT INTO department (name) VALUES ('Ashley Judd');
INSERT INTO role (title, salary, department_id ) 
VALUES ('Lawyer', 105000, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES('Ashley', 'Judd', 7, 8);

INSERT INTO department (name) VALUES ('Robert Rodrigez');
INSERT INTO role (title, salary, department_id ) 
VALUES ('Leal Lead', 235000, 3);
INSERT INTO employee (first_name, last_name, role_id)
VALUES('Robert', 'Rodrigez', 8);

INSERT INTO department (name) VALUES ('John Jake');
INSERT INTO role (title, salary, department_id ) 
VALUES ('Salesperson', 65000, 2);
INSERT INTO employee (first_name, last_name, role_id)
VALUES('John', 'Jake', 10);
UPDATE employee set role_id = 13 WHERE id =25;
UPDATE employee set id = 13 WHERE role_id =13;
UPDATE employee set manager_id = 2 WHERE role_id =13;

UPDATE employee set manager = 'David Allen' WHERE manager_id =3;
UPDATE employee set manager = 'Ashley Judd' WHERE manager_id =7;
UPDATE employee set manager = 'Robert Rodrigez' WHERE manager_id =8;

UPDATE  role set title = 'Lawyer', salary=85000 , department_id =3 WHERE id =13;


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

SELECT * FROM employee WHERE  manager_id IS null OR role_id = 7;

-- -- readAllroles  .. 
SELECT department.id, department.department, role.title, 
role.department 
FROM department
LEFT JOIN 
role ON department.id = role.department_id;

-- View the total utilized budget of a department 
-- ie the combined salaries of all employees in that department

-- -- role Join
SELECT employee.id, employee.first_name, employee.last_name,
role.title, department.department, role.department_id
FROM role
LEFT JOIN employee ON role.id = employee.role_id
LEFT JOIN department ON department.id =role.department_id;


SELECT * FROM department; 
SELECT * FROM role;
SELECT * FROM employee; 

ALTER TABLE department RENAME COLUMN name TO department;

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES('James', 'Lau', 9, 7);

DELETE FROM employee WHERE first_name= 'Mary' AND last_name='Morgan';


ALTER TABLE employee DROP COLUMN manager;

-- View the total utilized budget of a department -- 
-- ie the combined salaries of all employees in that department

SELECT employee.id, employee.first_name, employee.last_name, 
role.title, role.salary, department.department
FROM employee
LEFT JOIN role ON role.id = employee.id 
LEFT JOIN department ON department.id = role.department_id 
WHERE department.department = 'Engineering';

SELECT SUM(salary) AS EngineeringBudget FROM role WHERE department_id=1;
SELECT SUM(salary) AS SalesBudget FROM role WHERE department_id=2;
SELECT SUM(salary) AS LegalBudget FROM role WHERE department_id=3;



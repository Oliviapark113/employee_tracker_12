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
VALUES ('Software Engineer', 95000, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES('Olivia', 'Park', 1, 3);

INSERT INTO department (name) VALUES ('Chris Brown');
INSERT INTO role (title, salary, department_id ) 
VALUES ('Software Engineer', 85000, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES('Chris', 'Brown', 2, 3);

INSERT INTO department (name) VALUES ('David Allen');
INSERT INTO role (title, salary, department_id ) 
VALUES ('Lead Engineer', 125000, 3);
INSERT INTO employee (first_name, last_name, role_id)
VALUES('David', 'Allen', 3);

INSERT INTO department (name) VALUES ('Jake Lau');
INSERT INTO role (title, salary, department_id ) 
VALUES ('Salesperson', 75000, 4);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES('Jake', 'Lau', 4, 7);

INSERT INTO department (name) VALUES ('Kevin Tupic');
INSERT INTO role (title, salary, department_id ) 
VALUES ('Salesperson', 65000, 5);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES('Kevin', 'Tupic', 5, 7);

INSERT INTO department (name) VALUES ('Jason Brown');
INSERT INTO role (title, salary, department_id ) 
VALUES ('Sales Lead', 135000, 6);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES('Jason', 'Brown', 6, 7);

INSERT INTO department (name) VALUES ('Ashley Judd');
INSERT INTO role (title, salary, department_id ) 
VALUES ('Lawyer', 105000, 7);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES('Ashley', 'Judd', 7, 8);

INSERT INTO department (name) VALUES ('Robert Rodrigez');
INSERT INTO role (title, salary, department_id ) 
VALUES ('Leal Lead', 235000, 8);
INSERT INTO employee (first_name, last_name, role_id)
VALUES('Robert', 'Rodrigez', 8);




-- DELETE FROM department WHERE id = 12;
-- DELETE FROM role WHERE id = 12;
-- DELETE FROM emloyee WHERE id=10;


-- UPDATE employee SET manager_id=2 WHERE id=1;

-- UPDATE department SET id=2 WHERE id=6;
-- UPDATE employee SET id=2 WHERE id=5;
UPDATE role SET id=2 WHERE id=6;

SELECT * FROM department; 
SELECT * FROM role;
SELECT * FROM employee;
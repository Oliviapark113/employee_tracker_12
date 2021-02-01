DROP DATABASE IF EXISTS employee_db;

CREATE DATABASE employee_db;

USE employee_db;

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
VALUES ('Software Engineer', 100000, 1);


SELECT * FROM department; 
SELECT * FROM role;
SELECT * FROM employee;
DROP DATABASE IF EXISTS employeeTracker_db;

CREATE DATABASE employeeTracker_db;

USE employeeTracker_db;

CREATE TABLE department (
id INT NOT NULL AUTO_INCREMENT,
-- to hold department name
department VARCHAR(30) NOT NULL,
PRIMARY KEY (id)

);


CREATE TABLE role (
id INT NOT NULL AUTO_INCREMENT,
-- to hold role title
title VARCHAR(30) NOT NULL,
salary DECIMAL(10,2) NOT NULL,
-- INT to hold reference to department role belongs to
department_id INT(10),
INDEX dep_ind (department_id),
CONSTRAINT fk_department
FOREIGN KEY (department_id) REFERENCES department(id)ON DELETE CASCADE,
PRIMARY KEY (id)
);


CREATE TABLE employee(
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR (30) NOT NULL,
  last_name VARCHAR (30) NOT NULL,
  role_id INT (10) NOT NULL,
  INDEX role_ind(role_id),
-- INT to hold reference to role employee has 
  CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES role(id) 
  ON DELETE CASCADE,
-- INT to hold reference to another employee that manages the employee being Created. 
-- This field may be null if the employee has no manager
  manager_id INT(10),
  INDEX man_ind (manager_id),
  CONSTRAINT fk_manager 
  FOREIGN KEY(manager_id) REFERENCES employee(id) ON DELETE SET NULL,
  PRIMARY KEY (id)
  
);

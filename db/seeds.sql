USE employee_management_system_db;

TRUNCATE TABLE department;
INSERT department (`name`) VALUES ('SALES');
INSERT department (`name`) VALUES ('ACCOUNTING');
INSERT department (`name`) VALUES ('PARTYPLANNING');



INSERT `role` (title, salary, department_id) VALUES ('MANAGER',100000,1);
INSERT `role` (title, salary, department_id) VALUES ('SALESPERSON',55000,1);
INSERT `role` (title, salary, department_id) VALUES ('ACCOUNTANT',70000,2);
INSERT `role` (title, salary, department_id) VALUES ('PARTYPLANNER',300000,3);



INSERT employee (first_name, last_name, role_id, manager_id) VALUES ('Michael','Scott',1, NULL);
INSERT employee (first_name, last_name, role_id, manager_id) VALUES ('JIM','HALPERT',2, 1);
INSERT employee (first_name, last_name, role_id, manager_id) VALUES ('DWIGHT','SCHRUTE',1, 2);
INSERT employee (first_name, last_name, role_id, manager_id) VALUES ('OSCAR','MARTINEZ',2 ,1);
INSERT employee (first_name, last_name, role_id, manager_id) VALUES ('PHYLLIS','VANCE',3 ,1);


select * from employee;





-- INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('JIM', 'HALPERT', 1, 1);
-- INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('DWIGHT', 'SCHRUTE', 1, 3);
-- INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('OSCAR', 'MARTINEZ', 2, 2);
-- INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('PHYLLIS', 'VANCE', 3, 1);
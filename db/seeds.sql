INSERT INTO department (name)
VALUES  ("Management"),
        ("Sales"),
        ("Reception");

INSERT INTO ROLE (title, salary, department_id)
VALUES  ("regionalManager", 80000, 1),
        ("assistantToTheRegionalManager", 55000, 1),
        ("salesRep1", 60000, 2),
        ("salesRep2", 50000, 2),
        ("receptionist", 35000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ("Michael","Scott", 1, NULL),
        ("Dwight","Schrute", 2, 1),
        ("Jim","Halpert", 3, 1),
        ("Stanley","Hudson", 4, 1),
        ("Pam","Beesley", 5, 1);

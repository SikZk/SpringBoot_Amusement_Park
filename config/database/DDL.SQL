/*
Created: 20.11.2024
Modified: 20.11.2024
Project: Amusement park
Model: Amusement_park_final
Author: Jakub Polak, Mikołaj Truszczyński
Database: Oracle 18c
*/


-- Create sequences section

CREATE SEQUENCE seq_amusement_parks
    INCREMENT BY 1
    START WITH 1
    NOMAXVALUE
    NOMINVALUE
    CACHE 20
/

CREATE SEQUENCE seq_owners
    INCREMENT BY 1
    START WITH 1
    NOMAXVALUE
    NOMINVALUE
    CACHE 20
/

CREATE SEQUENCE seq_addresses
    INCREMENT BY 1
    START WITH 1
    NOMAXVALUE
    NOMINVALUE
    CACHE 20
/

CREATE SEQUENCE seq_food_points
    INCREMENT BY 1
    START WITH 1
    NOMAXVALUE
    NOMINVALUE
    CACHE 20
/

CREATE SEQUENCE seq_clients
    INCREMENT BY 1
    START WITH 1
    NOMAXVALUE
    NOMINVALUE
    CACHE 20
/

CREATE SEQUENCE seq_workers
    INCREMENT BY 1
    START WITH 1
    NOMAXVALUE
    NOMINVALUE
    CACHE 20
/

CREATE SEQUENCE seq_attraction
    INCREMENT BY 1
    START WITH 1
    NOMAXVALUE
    NOMINVALUE
    CACHE 20
/

CREATE SEQUENCE seq_tickets
    INCREMENT BY 1
    START WITH 1
    NOMAXVALUE
    NOMINVALUE
    CACHE 20
/

-- Create tables section

-- Table Amusement_parks

CREATE TABLE Amusement_parks(
                                Park_id Integer NOT NULL,
                                Name Varchar2(30 ) NOT NULL,
                                Owner_id Integer,
                                Address_id Integer
);
/

-- Create indexes for table Amusement_parks

CREATE INDEX IX_Relationship1 ON Amusement_parks (Owner_id)
    /

CREATE INDEX IX_Relationship2 ON Amusement_parks (Address_id)
    /

-- Add keys for table Amusement_parks

ALTER TABLE Amusement_parks ADD CONSTRAINT PKAmusementPark
    PRIMARY KEY (Park_id)
    /

-- Table Workers

CREATE TABLE Workers(
                        Worker_id Integer NOT NULL,
                        Name Varchar2(20 ) NOT NULL,
                        Surname Varchar2(30 ) NOT NULL,
                        Date_of_birth Date NOT NULL,
                        Pesel Char(11 ) NOT NULL,
                        Sex Char(1 ) NOT NULL
                            CHECK (Sex IN ('M','F')),
                        Id_number Char(9 ) NOT NULL,
                        Employment_date Date NOT NULL,
                        Email Varchar2(30 ) NOT NULL,
                        Password Char(60 ) NOT NULL,
                        Bank_account_number Char(28 ) NOT NULL,
                        Phone_number Varchar2(12 ) NOT NULL,
                        Salary Number(10,2) NOT NULL,
                        Park_id Integer NOT NULL,
                        Address_id Integer
)
    /

-- Create indexes for table Workers

CREATE INDEX IX_Worker_works_at_park ON Workers (Park_id)
    /

CREATE INDEX IX_Relationship3 ON Workers (Address_id)
    /

-- Add keys for table Workers

ALTER TABLE Workers ADD CONSTRAINT PKWorker PRIMARY KEY (Worker_id)
    /

-- Table Food_points

CREATE TABLE Food_points(
                            Food_point_id Integer NOT NULL,
                            Name Varchar2(30 ) NOT NULL,
                            Specialization Varchar2(30 ) NOT NULL
                                CHECK (Specialization
                                    IN ('Popcorn','Chicken','Fries','Ice_cream')),
                            Food_amount Integer NOT NULL,
                            Max_workplaces_amount Integer NOT NULL,
                            Park_id Integer NOT NULL
)
    /

-- Create indexes for table Food_points

CREATE INDEX IX_Park_owns_food_point ON Food_points (Park_id)
    /

-- Add keys for table Food_points

ALTER TABLE Food_points ADD CONSTRAINT PKFoodPoint
    PRIMARY KEY (Food_point_id)
    /

-- Table Attractions

CREATE TABLE Attractions(
                            Attraction_id Integer NOT NULL,
                            Name Varchar2(30 ) NOT NULL,
                            Level_of_extreme Char(1 ) NOT NULL
                                CHECK (Level_of_extreme IN ('H','M','L')),
                            Is_paid Char(1 ) NOT NULL,
                            Spots_amount Integer NOT NULL,
                            Max_workplaces_amount Integer NOT NULL,
                            Park_id Integer NOT NULL
)
    /

-- Create indexes for table Attractions

CREATE INDEX IX_Park_owns_attraction ON Attractions (Park_id)
    /

-- Add keys for table Attractions

ALTER TABLE Attractions ADD CONSTRAINT PKAttraction
    PRIMARY KEY (Attraction_id)
    /

-- Table Tickets

CREATE TABLE Tickets(
                        Ticket_id Integer NOT NULL,
                        Ticket_date Date NOT NULL,
                        Type Varchar2(30 ) NOT NULL
                            CHECK (Type IN ('Entrance','Food_point','Attraction')),
                        Client_id Integer NOT NULL,
                        Food_point_id Integer,
                        Attraction_id Integer
)
    /

-- Create indexes for table Tickets

CREATE INDEX IX_Client_owns_ticket ON Tickets (Client_id)
    /

CREATE INDEX IX_Ticket_gives_access_to_food_point
    ON Tickets (Food_point_id)
    /

CREATE INDEX IX_Ticket_gives_access_to_attraction
    ON Tickets (Attraction_id)
    /

-- Add keys for table Tickets

ALTER TABLE Tickets ADD CONSTRAINT PKTicket PRIMARY KEY (Ticket_id)
    /

-- Table Clients

CREATE TABLE Clients(
                        Client_id Integer NOT NULL,
                        Sex Char(1 ) NOT NULL
                            CHECK (Sex IN ('M','F')),
                        Phone_number Varchar2(12 ) NOT NULL,
                        Name Varchar2(20 ) NOT NULL,
                        Surname Varchar2(30 ) NOT NULL,
                        Link Varchar2(100 ) NOT NULL,
                        Account_creation_date Date NOT NULL,
                        Email Varchar2(30 ) NOT NULL,
                        Password Char(60 ) NOT NULL,
                        Park_id Integer NOT NULL
)
    /

-- Create indexes for table Clients

CREATE INDEX IX_Client_visits_park ON Clients (Park_id)
    /

-- Add keys for table Clients

ALTER TABLE Clients ADD CONSTRAINT PK_Clients PRIMARY KEY (Client_id)
    /

-- Table Food_staff

CREATE TABLE Food_staff(
                           Booklet_expiration_date Date NOT NULL,
                           Specialization Varchar2(30 ) NOT NULL
                               CHECK (Specialization
                                   IN ('Popcorn','Chicken','Fries','Ice_cream')),
                           Worker_id Integer NOT NULL
)
    /

-- Add keys for table Food_staff

ALTER TABLE Food_staff ADD CONSTRAINT Unique_Identifier1
    PRIMARY KEY (Worker_id)
    /

-- Table Park_staff

CREATE TABLE Park_staff(
                           Is_training_completed Char(1 ) NOT NULL,
                           Fear_of_heights Char(1 ) NOT NULL,
                           Worker_id Integer NOT NULL
)
    /

-- Add keys for table Park_staff

ALTER TABLE Park_staff ADD CONSTRAINT Unique_Identifier2
    PRIMARY KEY (Worker_id)
    /

-- Table Paid_attractions

CREATE TABLE Paid_attractions(
                                 Price Number(10,2) NOT NULL,
                                 Is_free_for_children Char(1 ) NOT NULL,
                                 Attraction_id Integer NOT NULL
)
    /

-- Add keys for table Paid_attractions

ALTER TABLE Paid_attractions ADD CONSTRAINT Unique_Identifier3
    PRIMARY KEY (Attraction_id)
    /

-- Table Non-paid_attractions

CREATE TABLE Non_paid_attractions(
                                     Photos Char(1 ) NOT NULL,
                                     Is_open_on_weekends Char(1 ) NOT NULL,
                                     Attraction_id Integer NOT NULL
)
    /

-- Add keys for table Non-paid_attractions

ALTER TABLE Non_paid_attractions ADD CONSTRAINT Unique_Identifier4
    PRIMARY KEY (Attraction_id)
    /

-- Table Attraction_Worker

CREATE TABLE Attraction_Worker(
                                  Attraction_id Integer NOT NULL,
                                  Worker_id Integer NOT NULL
)
    /

-- Table Food_point_Worker

CREATE TABLE Food_point_Worker(
                                  Food_point_id Integer NOT NULL,
                                  Worker_id Integer NOT NULL
)
    /

-- Table Owners

CREATE TABLE Owners(
                       Owner_id Integer NOT NULL,
                       Name Varchar2(30 ) NOT NULL,
                       Surname Varchar2(30 ) NOT NULL
)
    /

-- Add keys for table Owners

ALTER TABLE Owners ADD CONSTRAINT PK_Owners PRIMARY KEY (Owner_id)
    /

-- Table Addresses

CREATE TABLE Addresses(
                          Address_id Integer NOT NULL,
                          Postal_code Char(6 ) NOT NULL,
                          City Varchar2(20 ) NOT NULL,
                          Street Varchar2(20 ) NOT NULL,
                          Street_number Varchar2(10 ) NOT NULL
)
    /

-- Add keys for table Addresses

ALTER TABLE Addresses ADD CONSTRAINT PK_Addresses
    PRIMARY KEY (Address_id)
    /

ALTER TABLE Addresses ADD CONSTRAINT Postal_code UNIQUE (Postal_code)
    /


-- Create foreign keys (relationships) section

ALTER TABLE Food_points ADD CONSTRAINT Park_owns_food_point
    FOREIGN KEY (Park_id) REFERENCES Amusement_parks (Park_id)
    /



ALTER TABLE Workers ADD CONSTRAINT Worker_works_at_park
    FOREIGN KEY (Park_id) REFERENCES Amusement_parks (Park_id)
    /



ALTER TABLE Attractions ADD CONSTRAINT Park_owns_attraction
    FOREIGN KEY (Park_id) REFERENCES Amusement_parks (Park_id)
    /



ALTER TABLE Tickets ADD CONSTRAINT Client_owns_ticket
    FOREIGN KEY (Client_id) REFERENCES Clients (Client_id)
    /



ALTER TABLE Clients ADD CONSTRAINT Client_visits_park
    FOREIGN KEY (Park_id) REFERENCES Amusement_parks (Park_id)
    /



ALTER TABLE Tickets ADD CONSTRAINT Ticket_gives_access_to_food_point
    FOREIGN KEY (Food_point_id) REFERENCES Food_points (Food_point_id)
    /



ALTER TABLE Tickets ADD CONSTRAINT Ticket_gives_access_to_attraction
    FOREIGN KEY (Attraction_id) REFERENCES Attractions (Attraction_id)
    /



ALTER TABLE Amusement_parks ADD CONSTRAINT Owner_own_park
    FOREIGN KEY (Owner_id) REFERENCES Owners (Owner_id)
    /



ALTER TABLE Amusement_parks ADD CONSTRAINT Park_has_address
    FOREIGN KEY (Address_id) REFERENCES Addresses (Address_id)
    /



ALTER TABLE Workers ADD CONSTRAINT Worker_has_address
    FOREIGN KEY (Address_id) REFERENCES Addresses (Address_id)
    /
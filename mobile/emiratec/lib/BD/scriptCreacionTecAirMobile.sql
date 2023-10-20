PRAGMA foreign_keys = ON;

-- USER TABLE
CREATE TABLE USERW
(
    Email       VARCHAR(25)    PRIMARY KEY,
    Upassword   VARCHAR(16)    NOT NULL,
    Unumber     VARCHAR(15)    NOT NULL,
    Fname       VARCHAR(15)    NOT NULL,
    Mname       VARCHAR(15),
    Lname1      VARCHAR(15)    NOT NULL,
    Lname2      VARCHAR(15)    NOT NULL,
    UNIQUE (Email, Unumber)
);

CREATE TABLE AIRPORT
(
    AirportID   INTEGER       PRIMARY KEY AUTOINCREMENT,
    Code        CHAR(3)       NOT NULL,
    City        VARCHAR(50)   NOT NULL,
    Aname       VARCHAR(50)   NOT NULL,
    Image       VARCHAR(250)
);

CREATE TABLE PLANE
(
    PlaneID     CHAR(6)       PRIMARY KEY,
    Capacity    INT           NOT NULL
);

CREATE TABLE FLIGHT
(
    Fnumber     INT           PRIMARY KEY,
    Ffrom       INT           NOT NULL,
    Fto         INT           NOT NULL,
    Price       INT           NOT NULL,
    Fdate       DATE          NOT NULL,
    Fstate      INTEGER       NOT NULL DEFAULT 0,
    Pid         CHAR(6)       NOT NULL,
    FOREIGN KEY (Pid) REFERENCES PLANE(PlaneID),
    FOREIGN KEY (Ffrom) REFERENCES AIRPORT(AirportID),
    FOREIGN KEY (Fto) REFERENCES AIRPORT(AirportID)
);

CREATE TABLE STUDENT
(
    StudentID   VARCHAR(10)   PRIMARY KEY,
    University  VARCHAR(30)   NOT NULL,
    Miles       INT           DEFAULT 0,
    Uemail      VARCHAR(25)   NOT NULL,
    FOREIGN KEY (Uemail) REFERENCES USERW(Email)
);

CREATE TABLE AIRADMIN
(
    AdminID     VARCHAR(5)    PRIMARY KEY,
    Uemail      VARCHAR(25)   NOT NULL,
    FOREIGN KEY (Uemail) REFERENCES USERW(Email)
);

CREATE TABLE PASSENGER
(
    Pnumber     INTEGER       PRIMARY KEY AUTOINCREMENT,
    Uemail      VARCHAR(25)   NOT NULL,
    Checked_in  INTEGER      NOT NULL DEFAULT 0,
    Fno         INT          NOT NULL,
    FOREIGN KEY (Uemail) REFERENCES USERW(Email),
    FOREIGN KEY (Fno) REFERENCES FLIGHT(Fnumber)
);

CREATE TABLE BAGGAGE
(
    Bnumber     INTEGER       PRIMARY KEY AUTOINCREMENT,
    Weight      VARCHAR(3)    NOT NULL,
    Pno         INT           NOT NULL,
    FOREIGN KEY (Pno) REFERENCES PASSENGER(Pnumber)
);

CREATE TABLE BAGGAGE_COLOR
(
    Bno         INT           NOT NULL,
    Color       VARCHAR(10)   NOT NULL,
    PRIMARY KEY (Bno, Color),
    FOREIGN KEY (Bno) REFERENCES BAGGAGE(Bnumber)
);

CREATE TABLE PROMO
(
    Fno         INT           NOT NULL,
    Image       VARCHAR(250)  NOT NULL,
    Dpercent    INT           NOT NULL,
    Final_date  DATE          NOT NULL,
    PRIMARY KEY (Fno, Image),
    FOREIGN KEY (Fno) REFERENCES FLIGHT(Fnumber)
);

CREATE TABLE SEAT
(
    Snumber     VARCHAR(2)    NOT NULL,
    Sclass      VARCHAR(10)   DEFAULT 'general',
    Pno         INT           NOT NULL,
    PRIMARY KEY (Snumber, Pno),
    FOREIGN KEY (Pno) REFERENCES PASSENGER(Pnumber)
);

CREATE TABLE STOP
(
    StopID      INTEGER       PRIMARY KEY AUTOINCREMENT,
    Sfrom       INT           NOT NULL,
    Sto         INT           NOT NULL,
    Sdate       DATE          NOT NULL,
    Departure_hour  TIME      NOT NULL,
    Arrival_hour    TIME      NOT NULL,
    Fno         INT           NOT NULL,
    FOREIGN KEY (Fno) REFERENCES FLIGHT(Fnumber),
    FOREIGN KEY (Sfrom) REFERENCES AIRPORT(AirportID),
    FOREIGN KEY (Sto) REFERENCES AIRPORT(AirportID)
);

CREATE TABLE USER_STOP
(
    Uemail      VARCHAR(25)   NOT NULL,
    Sid         INT           NOT NULL,
    PRIMARY KEY (Uemail, Sid),
    FOREIGN KEY (Uemail) REFERENCES USERW(Email),
    FOREIGN KEY (Sid) REFERENCES STOP(StopID)
);

SELECT * FROM FLIGHT
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

SELECT * FROM FLIGHT;
SELECT * FROM USERW;
SELECT * FROM PROMO;
SELECT * FROM STOP;
SELECT * FROM AIRPORT;
SELECT * FROM PASSENGER;
SELECT * FROM PLANE;


INSERT INTO USERW (Fname, Mname, Lname1, Lname2, Unumber, Email, Upassword) VALUES ('Saul', 'Ernesto', 'Monge', 'Mora', '88885555', 'monge@gmail.com', '9876')
-- INSERT INTO PROMO (Fno, Image, Dpercent, Final_date) 
-- VALUES ('1', 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Cancun_Strand_Luftbild_%2822143397586%29.jpg/268px-Cancun_Strand_Luftbild_%2822143397586%29.jpg','15','2023-11-27');

-- seleccionar el usuario si existe
-- sino hacer el registro de usuario
--SELECT Fname, Lname1 FROM USERW WHERE Email = ? [Uemail]

SELECT 
      F.Fnumber, 
      F.Price, 
      F.Fdate, 
      F.Fstate, 
      F.Pid,
      A1.Aname as OriginAirportName,   -- Datos del aeropuerto de origen
      A2.Aname as DestinationAirportName  -- Datos del aeropuerto de destino
    FROM 
      FLIGHT F
      INNER JOIN AIRPORT A1 ON F.Ffrom = A1.AirportID  -- Unión con la tabla AIRPORT para el origen
      INNER JOIN AIRPORT A2 ON F.Fto = A2.AirportID  -- Unión con la tabla AIRPORT para el destino
    WHERE 
      A1.Aname = 'Aeropuerto Juan Santamaría' AND A2.Aname = 'Aeropuerto La Aurora';  -- Filtrar basado en los nombres de los aeropuertos


-- seleccionar vuelos
SELECT 
    f.Fnumber,
    s.StopID,
    a1.City AS sfromCity,
    a2.City AS StoCity,
    a2.Image AS StoImage,
    strftime('%Y-%m-%d', f.Fdate) AS fdate,
    f.Price AS Fprice
FROM FLIGHT f
JOIN STOP s ON f.Fnumber = s.Fno
JOIN AIRPORT a1 ON s.Sfrom = a1.AirportID
JOIN AIRPORT a2 ON s.Sto = a2.AirportID
LEFT JOIN PASSENGER pas ON pas.Fno = f.Fnumber
LEFT JOIN PLANE p ON p.PlaneID = f.Pid
WHERE 
    s.Sfrom = '1' AND
    s.Sto = '2' AND
    f.Fstate = 1 AND
    (
       (s.Sdate = date('now') AND s.Departure_hour > time('now', '+2 hours'))
       OR 
       s.Sdate > date('now')
    ) AND
    (SELECT COUNT(*) FROM PASSENGER WHERE Fno = f.Fnumber) < p.Capacity
GROUP BY f.Fnumber, s.StopID, a1.City, a2.City, a2.Image, f.Fdate, f.Price;

SELECT Dpercent FROM PROMO WHERE Fno='1'
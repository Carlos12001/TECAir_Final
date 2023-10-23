-- Population Script
INSERT INTO USERW(
	email, upassword, unumber, fname, mname, lname1, lname2)
	VALUES ('pedrog@gmail.com', '1234', '12345678', 'Pedro', NULL, 'Gutierrez', 'Garcia');
	
INSERT INTO AIRADMIN(
	adminid, uemail)
	VALUES ('admi1', 'pedrog@gmail.com');

INSERT INTO PLANE(
	planeid, capacity)
	VALUES ('TEC1', 50);

INSERT INTO AIRPORT(
	code, city, aname, image)
	VALUES ('SJO', 'San Jose', 'Aeropuerto Juan Santamaría', 'https://upload.wikimedia.org/wikipedia/commons/1/11/Aeropuerto_Juan_Santamaria_terminal_internacional.jpg');

INSERT INTO AIRPORT(
	code, city, aname, image)
	VALUES ('GUA', 'Ciudad de Guatemala', 'Aeropuerto La Aurora', 'https://upload.wikimedia.org/wikipedia/commons/d/da/Airplanes_-_La_Aurora_International_Airport.jpg');

INSERT INTO AIRPORT(
	code, city, aname, image)
	VALUES ('KIN', 'Kingston', 'Aeropuerto Norman Manley', 'https://upload.wikimedia.org/wikipedia/commons/1/11/Norman_Manley_International_Airport.jpg');

INSERT INTO AIRPORT(
	code, city, aname, image)
	VALUES ('GRU', 'Sao Paulo', 'Aeropuerto de São Paulo-Guarulhos', 'https://upload.wikimedia.org/wikipedia/commons/0/04/Guarulhos5.jpg');

INSERT INTO AIRPORT(
	code, city, aname, image)
	VALUES ('BOG', 'Bogota', 'Aeropuerto El Dorado', 'https://upload.wikimedia.org/wikipedia/commons/9/96/El-dorado-from-air.jpg');

INSERT INTO AIRPORT(
	code, city, aname, image)
	VALUES ('LIM', 'Lima', 'Aeropuerto Jorge Chávez', 'https://upload.wikimedia.org/wikipedia/commons/4/4f/Airport_lima_peru.jpg');

INSERT INTO AIRPORT(
	code, city, aname, image)
	VALUES ('SCL', 'Santiago de Chile', 'Aeropuerto Arturo Merino Benítez', 'https://upload.wikimedia.org/wikipedia/commons/2/20/Terminal_Aeropuerto_Pudahuel.jpg');

INSERT INTO AIRPORT(
	code, city, aname, image)
	VALUES ('EZE', 'Buenos Aires', 'Aeropuerto Ministro Pistarini', 'https://upload.wikimedia.org/wikipedia/commons/1/1c/Aeropuerto_Internacional_Ezeiza.jpg');

INSERT INTO AIRPORT(
	code, city, aname, image)
	VALUES ('PTY', 'Ciudad de Panama', 'Aeropuerto de Tocumen', 'https://upload.wikimedia.org/wikipedia/commons/6/65/Aircraft_at_Tocumen_International_Airport_01.jpg');

INSERT INTO AIRPORT(
	code, city, aname, image)
	VALUES ('LAX', 'Los Angeles', 'Aeropuerto de Los Ángeles', 'https://upload.wikimedia.org/wikipedia/commons/4/45/Los_Angeles_International_Airport_by_Don_Ramey_Logan.jpg');

INSERT INTO AIRPORT(
	code, city, aname, image)
	VALUES ('MIA', 'Miami', 'Aeropuerto de Miami', 'https://upload.wikimedia.org/wikipedia/commons/a/a1/Miami_International_Airport_%28KMIA-MIA%29_%288204606870%29.jpg');

INSERT INTO AIRPORT(
	code, city, aname, image)
	VALUES ('JFK', 'Nueva York', 'Aeropuerto John F. Kennedy', 'https://upload.wikimedia.org/wikipedia/commons/b/b9/JFK_Aerial_Nov_14_2018.jpg');

INSERT INTO AIRPORT(
	code, city, aname, image)
	VALUES ('IAD', 'Washington D.C.', 'Aeropuerto de Washington-Dulles', 'https://upload.wikimedia.org/wikipedia/commons/9/92/Washington_Dulles_International_Airport_at_Dusk.jpg');

INSERT INTO AIRPORT(
	code, city, aname, image)
	VALUES ('YYZ', 'Toronto', 'Aeropuerto Toronto Pearson', 'https://upload.wikimedia.org/wikipedia/commons/f/f5/YYZ_airphoto.jpg');

INSERT INTO AIRPORT(
	code, city, aname, image)
	VALUES ('MEX', 'Ciudad de Mexico', 'Aeropuerto de la Ciudad de México', 'https://upload.wikimedia.org/wikipedia/commons/4/40/AICM_AIR_T2.jpg');

INSERT INTO AIRPORT(
	code, city, aname, image)
	VALUES ('CUN', 'Cancun', 'Aeropuerto de Cancún', 'https://upload.wikimedia.org/wikipedia/commons/8/8b/CUNterminal3.jpg');
	
-- //////////////////////////////////////////////////////////////////////////////////////////////////


-- Insertar aviones de ejemplo
INSERT INTO PLANE (PlaneID, Capacity)
VALUES
    ('A12345', 40),
    ('B67890', 24);

-- Insertar vuelos de ejemplo
INSERT INTO FLIGHT (Fnumber, Ffrom, Fto, Price, Fdate, Fstate, Pid)
VALUES
    (1, 1, 2, 100, '2023-11-25', TRUE, 'A12345'),
    (2, 2, 1, 120, '2023-11-27', TRUE, 'B67890');

-- Insertar escalas de ejemplo
INSERT INTO STOP (Sfrom, Sto, Sdate, Departure_hour, Arrival_hour, Fno)
VALUES
    (1, 2, '2023-11-25', '08:00:00', '10:30:00', 1),
    (2, 1, '2023-11-27', '09:00:00', '11:30:00', 2);
	
	
-- Insertar usuarios de ejemplo
INSERT INTO USERW (Email, Upassword, Unumber, Fname, Lname1, Lname2)
VALUES
    ('klein@gmail.com', '1234', '11111111', 'Klein', 'Morietti', 'Gustav'),
    ('victor@gmail.com', '4321', '22222222', 'Victor', 'nose', 'nose');
	
-- Insertar pasajeros de ejemplo
-- Para el vuelo con Fno 1
INSERT INTO PASSENGER (Uemail, Checked_in, Fno)
VALUES
    ('klein@gmail.com', false, 1),
    ('victor@gmail.com', false, 1);

-- Para el vuelo con Fno 2

INSERT INTO PASSENGER (Uemail, Checked_in, Fno)
VALUES
    ('klein@gmail.com', false, 2),
    ('victor@gmail.com', false, 2);
	
-- Insertar asientos para los vuelos de ejemplo
-- Para el vuelo con PlaneID 'A12345' que tiene una capacidad de 200, insertamos 180 asientos reservados
INSERT INTO SEAT (Snumber, Pno)
VALUES
    ('A1', 1),
    ('A2', 2);

-- Para el vuelo con PlaneID 'B67890' que tiene una capacidad de 150, insertamos 130 asientos reservados

INSERT INTO SEAT (Snumber, Sclass, Pno)
VALUES
    ('A1', 'Ejecutivo', 3),
    ('A2', 'Ejecutivo', 4);

















	
	
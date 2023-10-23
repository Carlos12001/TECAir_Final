-- /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
-- ///////////////////////////////////////////////// Population Script /////////////////////////////////////////////////
-- /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

-- /////////////////////////////////
-- //////////// Airports ///////////
-- /////////////////////////////////

INSERT INTO AIRPORT (code, city, aname, image)
VALUES
    ('SJO', 'San Jose', 'Aeropuerto Juan Santamaría', 'https://upload.wikimedia.org/wikipedia/commons/1/11/Aeropuerto_Juan_Santamaria_terminal_internacional.jpg'),
    ('GUA', 'Ciudad de Guatemala', 'Aeropuerto La Aurora', 'https://upload.wikimedia.org/wikipedia/commons/d/da/Airplanes_-_La_Aurora_International_Airport.jpg'),
    ('KIN', 'Kingston', 'Aeropuerto Norman Manley', 'https://upload.wikimedia.org/wikipedia/commons/1/11/Norman_Manley_International_Airport.jpg'),
    ('GRU', 'Sao Paulo', 'Aeropuerto de São Paulo-Guarulhos', 'https://upload.wikimedia.org/wikipedia/commons/0/04/Guarulhos5.jpg'),
    ('BOG', 'Bogota', 'Aeropuerto El Dorado', 'https://upload.wikimedia.org/wikipedia/commons/9/96/El-dorado-from-air.jpg'),
    ('LIM', 'Lima', 'Aeropuerto Jorge Chávez', 'https://upload.wikimedia.org/wikipedia/commons/4/4f/Airport_lima_peru.jpg'),
    ('SCL', 'Santiago de Chile', 'Aeropuerto Arturo Merino Benítez', 'https://upload.wikimedia.org/wikipedia/commons/2/20/Terminal_Aeropuerto_Pudahuel.jpg'),
    ('EZE', 'Buenos Aires', 'Aeropuerto Ministro Pistarini', 'https://upload.wikimedia.org/wikipedia/commons/1/1c/Aeropuerto_Internacional_Ezeiza.jpg'),
    ('PTY', 'Ciudad de Panama', 'Aeropuerto de Tocumen', 'https://upload.wikimedia.org/wikipedia/commons/6/65/Aircraft_at_Tocumen_International_Airport_01.jpg'),
    ('LAX', 'Los Angeles', 'Aeropuerto de Los Ángeles', 'https://upload.wikimedia.org/wikipedia/commons/4/45/Los_Angeles_International_Airport_by_Don_Ramey_Logan.jpg'),
    ('MIA', 'Miami', 'Aeropuerto de Miami', 'https://upload.wikimedia.org/wikipedia/commons/a/a1/Miami_International_Airport_%28KMIA-MIA%29_%288204606870%29.jpg'),
    ('JFK', 'Nueva York', 'Aeropuerto John F. Kennedy', 'https://upload.wikimedia.org/wikipedia/commons/b/b9/JFK_Aerial_Nov_14_2018.jpg'),
    ('IAD', 'Washington D.C.', 'Aeropuerto de Washington-Dulles', 'https://upload.wikimedia.org/wikipedia/commons/9/92/Washington_Dulles_International_Airport_at_Dusk.jpg'),
    ('YYZ', 'Toronto', 'Aeropuerto Toronto Pearson', 'https://upload.wikimedia.org/wikipedia/commons/f/f5/YYZ_airphoto.jpg'),
    ('MEX', 'Ciudad de Mexico', 'Aeropuerto de la Ciudad de México', 'https://upload.wikimedia.org/wikipedia/commons/4/40/AICM_AIR_T2.jpg'),
    ('CUN', 'Cancun', 'Aeropuerto de Cancún', 'https://upload.wikimedia.org/wikipedia/commons/8/8b/CUNterminal3.jpg'),
    ('CMH', 'Ohio', 'Aeropuerto John Glenn Columbus', 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Scioto_Mile_aerial_from_north.jpg/2560px-Scioto_Mile_aerial_from_north.jpg'),
    ('YHZ', 'New Scotia', 'Aeropuerto Halifax Stanfield', 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Nova_Scotia_DSC07149_-_Halifax_Stanfield_International_Airport_%2835073011524%29.jpg/1599px-Nova_Scotia_DSC07149_-_Halifax_Stanfield_International_Airport_%2835073011524%29.jpg'),
    ('MGA', 'Managua', 'Aeropuerto Augusto C. Sandino', 'https://upload.wikimedia.org/wikipedia/commons/1/12/Managua_Nicaragua.jpg'),
    ('PSY', 'Islas Malvinas', 'Aeropuerto Port Stanley', 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Stanley-Airport.JPG/1920px-Stanley-Airport.JPG');

-- /////////////////////////////////
-- ///////////// USERs /////////////
-- /////////////////////////////////

INSERT INTO USERW(
	email, upassword, unumber, fname, mname, lname1, lname2)
	VALUES 
	('pedrog@gmail.com', '1234', '12345678', 'Pedro', NULL, 'Gutierrez', 'Garcia'),
	('klein@gmail.com', '1234', '11111111', 'Klein', NULL, 'Morietti', 'Fool'),
	('melissa@gmail.com', '1234', '12121212', 'Melissa', NULL, 'Morietti', 'Fool'),
    ('victor@gmail.com', '4321', '22222222', 'Victor', NULL, 'nose', 'nose'),
	('david@gmail.com', '5049', '118200713', 'David', 'Alberto', 'Robles', 'Vargas'),
	('carlos@gmail.com', '3333', '33333333', 'Carlos', 'Andres', 'Mata', 'Calderon'),
	('felipe@gmail.com', '4444', '44444444', 'Felipe', 'Luis', 'Vargas', 'Jimenez'),
	('jose@gmail.com', '5555', '55555555', 'Jose', 'Carlos', 'Umañana', 'Rivera'),
	('audrey@gmail.com', '6666', '66666666', 'Audrey', NULL, 'Hall', 'Justice'),
	('alger@gmail.com', '7777', '77777777', 'Alger', NULL, 'Wilson', 'Hanged'),
	('sunless@gmail.com', '8888', '88888888', 'Sunless', NULL, 'Major', 'Antartica'),
	('maria@gmail.com', '9999', '99999999', 'Maria', 'Isabel', 'Garcia', 'Lopez'),
    ('john@gmail.com', '1010', '10101010', 'John', NULL, 'Smith', 'Johnson'),
    ('juan@hotmail.com', '2020', '20202020', 'Juan', 'Carlos', 'Perez', 'Rodriguez'),
    ('laura@yahoo.com', '3030', '30303030', 'Laura', NULL, 'Martinez', 'Hernandez'),
    ('william@gmail.com', '4040', '40404040', 'William', NULL, 'Davis', 'Brown'),
    ('ana@hotmail.com', '5050', '50505050', 'Ana', 'Maria', 'Lopez', 'Gutierrez'),
    ('james@gmail.com', '6060', '60606060', 'James', 'Robert', 'Johnson', 'Davis'),
    ('sofia@yahoo.com', '7070', '70707070', 'Sofia', NULL, 'Gonzalez', 'Torres'),
    ('michael@gmail.com', '8080', '80808080', 'Michael', NULL, 'Hernandez', 'Rodriguez'),
    ('linda@gmail.com', '9090', '90909090', 'Linda', NULL, 'Wilson', 'Anderson');
	
INSERT INTO STUDENT (StudentID, University, Miles, Uemail)
VALUES 
    ('2023504950', 'Tecnologico de Backlund', 100, 'melissa@gmail.com'),
    ('2019046824', 'Tecnologico de Costa Rica', 200, 'david@gmail.com'),
    ('2019654321', 'Tecnologico de Costa Rica', 150, 'carlos@gmail.com'),
	('B177777777', 'Universidad de Costa Rica', 10, 'linda@gmail.com'),
    ('2019123456', 'Tecnologico de Costa Rica', 180, 'jose@gmail.com');
	
INSERT INTO AIRADMIN(
	adminid, uemail)
	VALUES ('admi1', 'pedrog@gmail.com');
	
-- /////////////////////////////////
-- ///////////// PLANE /////////////
-- /////////////////////////////////

INSERT INTO PLANE (planeid, capacity)
VALUES 
    ('TEC1', 32),
    ('TEC2', 32),
    ('TEC3', 32),
    ('TEC4', 32),
    ('TEC5', 32),
    ('TEC6', 32),
    ('TEC7', 32),
    ('TEC8', 32),
    ('TEC9', 32),
    ('TEC10', 32),
    ('TEC11', 40),
    ('TEC12', 40),
    ('TEC13', 40),
    ('TEC14', 40),
    ('TEC15', 40),
    ('TEC16', 16),
    ('TEC17', 16),
    ('TEC18', 16),
    ('TEC19', 16),
    ('TEC20', 16);

-- Insertar vuelos de ejemplo
INSERT INTO FLIGHT (Fnumber, Ffrom, Fto, Price, Fdate, Fstate, Pid)
VALUES
    (1, 1, 2, 100, '2023-11-25', TRUE, 'TEC1'),
    (2, 19, 6, 120, '2023-11-28', false, 'TEC20'),
	(3, 20, 5, 120, '2023-12-15', false, 'TEC19'),
	(4, 6, 7, 120, '2023-11-8', TRUE, 'TEC18'),
	(5, 2, 1, 120, '2023-11-2', TRUE, 'TEC17'),
	(6, 2, 3, 120, '2023-12-13', TRUE, 'TEC15'),
	(7, 5, 14, 120, '2023-11-19', TRUE, 'TEC14'),
	(8, 13, 17, 120, '2023-11-24', TRUE, 'TEC13'),
	(9, 12, 8, 120, '2023-11-10', TRUE, 'TEC12'),
	(10, 4, 18, 120, '2023-12-28', TRUE, 'TEC11'),
	(11, 9, 11, 120, '2023-12-4', TRUE, 'TEC10'),
	(12, 20, 13, 120, '2023-12-16', TRUE, 'TEC9');
	
-- /////////////////////////////////
-- //////////// FLIGHTs ////////////
-- /////////////////////////////////	

-- //////////// Vuelo 2 ////////////

-- Insertar escalas
INSERT INTO STOP (Sfrom, Sto, Sdate, Departure_hour, Arrival_hour, Fno)
VALUES
    (1, 2, '2023-11-28', '08:00:00', '10:30:00', 2),
    (1, 6, '2023-11-28', '12:30:00', '15:00:00', 2),
	(6, 4, '2023-11-28', '17:00:00', '20:30:00', 2);
	
-- Insertar pasajeros
INSERT INTO PASSENGER (Uemail, Checked_in, Fno)
VALUES
    ('klein@gmail.com', false, 2),
    ('victor@gmail.com', false, 2),
	('jose@gmail.com', false, 2),
	('audrey@gmail.com', false, 2),
	('alger@gmail.com', false, 2),
	('sunless@gmail.com', false, 2),
	('maria@gmail.com', false, 2),
    ('john@gmail.com', false, 2),
    ('juan@hotmail.com', false, 2),
    ('laura@yahoo.com', false, 2),
    ('william@gmail.com', false, 2),
    ('ana@hotmail.com', false, 2),
    ('james@gmail.com', false, 2),
    ('sofia@yahoo.com', false, 2),
    ('michael@gmail.com', false, 2),
    ('linda@gmail.com', false, 2);

-- Insert asientos

INSERT INTO SEAT (Snumber, Sclass, Pno)
VALUES
    ('A1', 'Ejecutivo', 1),
    ('A2', 'Ejecutivo', 2),
	('A3', 'Ejecutivo', 3),
	('A4', 'Ejecutivo', 4),
	('B1', 'Turista', 5),
	('B2', 'Turista', 6),
	('B3', 'Turista', 7),
	('B4', 'Turista', 8),
	('C1', 'Turista', 9),
	('C2', 'Turista', 10),
	('C3', 'Turista', 11),
	('C4', 'Turista', 12),
	('D1', 'Turista', 13),
	('D2', 'Turista', 14),
	('D3', 'Turista', 15),
	('D4', 'Turista', 16);
	
	
-- //////////// Vuelo 3 ////////////

-- Insertar escalas
INSERT INTO STOP (Sfrom, Sto, Sdate, Departure_hour, Arrival_hour, Fno)
VALUES
    (20, 5, '2023-12-15', '08:00:00', '10:30:00', 3),
    (20, 8, '2023-12-15', '12:30:00', '15:00:00', 3),
	(8, 5, '2023-12-15', '17:00:00', '20:30:00', 3);
	
-- Insertar pasajeros
INSERT INTO PASSENGER (Uemail, Checked_in, Fno)
VALUES
    ('klein@gmail.com', false, 3),
    ('victor@gmail.com', false, 3),
	('jose@gmail.com', false, 3),
	('audrey@gmail.com', false, 3),
	('alger@gmail.com', false, 3),
	('sunless@gmail.com', false, 3),
	('maria@gmail.com', false, 3),
    ('john@gmail.com', false, 3),
    ('juan@hotmail.com', false, 3),
    ('laura@yahoo.com', false, 3),
    ('william@gmail.com', false, 3),
    ('ana@hotmail.com', false, 3),
    ('james@gmail.com', false, 3),
    ('sofia@yahoo.com', false, 3),
    ('michael@gmail.com', false, 3),
    ('linda@gmail.com', false, 3);

-- Insert asientos

INSERT INTO SEAT (Snumber, Sclass, Pno)
VALUES
    ('A1', 'Ejecutivo', 17),
    ('A2', 'Ejecutivo', 18),
	('A3', 'Ejecutivo', 19),
	('A4', 'Ejecutivo', 20),
	('B1', 'Turista', 21),
	('B2', 'Turista', 22),
	('B3', 'Turista', 23),
	('B4', 'Turista', 24),
	('C1', 'Turista', 25),
	('C2', 'Turista', 26),
	('C3', 'Turista', 27),
	('C4', 'Turista', 28),
	('D1', 'Turista', 29),
	('D2', 'Turista', 30),
	('D3', 'Turista', 31),
	('D4', 'Turista', 32);
	
-- //////////// Vuelo 4 ////////////

-- Insertar escalas
INSERT INTO STOP (Sfrom, Sto, Sdate, Departure_hour, Arrival_hour, Fno)
VALUES
    (6, 7, '2023-11-8', '08:00:00', '20:30:00', 4),
    (6, 9, '2023-11-8', '12:30:00', '15:00:00', 4),
	(9, 7, '2023-11-8', '16:30:00', '20:30:00', 4);
	
-- Insertar pasajeros
INSERT INTO PASSENGER (Uemail, Checked_in, Fno)
VALUES
    ('klein@gmail.com', false, 4),
    ('victor@gmail.com', false, 4),
	('jose@gmail.com', false, 4),
	('audrey@gmail.com', false, 4),
	('alger@gmail.com', false, 4),
	('sunless@gmail.com', false, 4),
	('maria@gmail.com', false, 4),
    ('john@gmail.com', false, 4),
    ('juan@hotmail.com', false, 4),
    ('laura@yahoo.com', false, 4),
    ('william@gmail.com', false, 4),
    ('ana@hotmail.com', false, 4),
    ('james@gmail.com', false, 4),
    ('sofia@yahoo.com', false, 4),
    ('michael@gmail.com', false, 4);

-- Insert asientos

INSERT INTO SEAT (Snumber, Sclass, Pno)
VALUES
    ('A1', 'Ejecutivo', 33),
    ('A2', 'Ejecutivo', 34),
	('A3', 'Ejecutivo', 35),
	('A4', 'Ejecutivo', 36),
	('B1', 'Turista', 37),
	('B2', 'Turista', 38),
	('B3', 'Turista', 39),
	('B4', 'Turista', 40),
	('C1', 'Turista', 41),
	('C2', 'Turista', 42),
	('C3', 'Turista', 43),
	('C4', 'Turista', 44),
	('D1', 'Turista', 45),
	('D2', 'Turista', 46),
	('D3', 'Turista', 47);
	
INSERT INTO PROMO (Fno, Image, Dpercent, Final_date)
VALUES (4, 'https://upload.wikimedia.org/wikipedia/commons/2/20/Terminal_Aeropuerto_Pudahuel.jpg', 25, '2023-11-07');
	
	
-- /////////// Vuelo 12 ////////////

-- Insertar escalas
INSERT INTO STOP (Sfrom, Sto, Sdate, Departure_hour, Arrival_hour, Fno)
VALUES
    (20, 13, '2023-12-16', '10:00:00', '21:30:00', 12),
    (20, 18, '2023-12-16', '12:30:00', '15:00:00', 12),
	(18, 13, '2023-12-16', '16:00:00', '21:30:00', 12);
	
-- Insertar pasajeros
INSERT INTO PASSENGER (Uemail, Checked_in, Fno)
VALUES
    ('klein@gmail.com', false, 12),
    ('victor@gmail.com', false, 12),
	('jose@gmail.com', false, 12),
	('audrey@gmail.com', false, 12),
	('alger@gmail.com', false, 12),
	('sunless@gmail.com', false, 12),
	('maria@gmail.com', false, 12),
    ('john@gmail.com', false, 12),
    ('juan@hotmail.com', false, 12),
    ('laura@yahoo.com', false, 12),
    ('william@gmail.com', false, 12),
    ('ana@hotmail.com', false, 12),
    ('james@gmail.com', false, 12),
    ('sofia@yahoo.com', false, 12),
    ('michael@gmail.com', false, 12);

-- Insert asientos

INSERT INTO SEAT (Snumber, Sclass, Pno)
VALUES
    ('A1', 'Ejecutivo', 48),
    ('A2', 'Ejecutivo', 49),
	('A3', 'Ejecutivo', 50),
	('A4', 'Ejecutivo', 51),
	('B1', 'Turista', 52),
	('B2', 'Turista', 53),
	('B3', 'Turista', 54),
	('B4', 'Turista', 55),
	('C1', 'Turista', 56),
	('C2', 'Turista', 57),
	('C3', 'Turista', 58),
	('C4', 'Turista', 59),
	('D1', 'Turista', 60),
	('D2', 'Turista', 61),
	('D3', 'Turista', 62);
	
INSERT INTO PROMO (Fno, Image, Dpercent, Final_date)
VALUES (12, 'https://upload.wikimedia.org/wikipedia/commons/9/92/Washington_Dulles_International_Airport_at_Dusk.jpg', 15, '2023-12-15');

-- //////////// Vuelo 5 ////////////

-- Insertar escalas
INSERT INTO STOP (Sfrom, Sto, Sdate, Departure_hour, Arrival_hour, Fno)
VALUES
    (2, 1, '2023-11-2', '16:00:00', '4:30:00', 5),
    (2, 5, '2023-11-2', '18:30:00', '20:30:00', 5),
	(17, 1, '2023-11-3', '00:30:00', '4:30:00', 5);
	
-- Insertar pasajeros
INSERT INTO PASSENGER (Uemail, Checked_in, Fno)
VALUES
    ('pedrog@gmail.com', false, 5),
    ('victor@gmail.com', false, 5);

-- Insert asientos

INSERT INTO SEAT (Snumber, Sclass, Pno)
VALUES
    ('A1', 'Ejecutivo', 63),
    ('C3', 'Turista', 64);
	
-- //////////// Vuelo 1 ////////////

-- Insertar escalas
INSERT INTO STOP (Sfrom, Sto, Sdate, Departure_hour, Arrival_hour, Fno)
VALUES
    (1, 2, '2023-11-25', '08:00:00', '10:30:00', 1),
    (1, 6, '2023-11-25', '12:30:00', '15:00:00', 1),
	(6, 4, '2023-11-25', '17:00:00', '20:30:00', 1);
	
-- Insertar pasajeros
INSERT INTO PASSENGER (Uemail, Checked_in, Fno)
VALUES
    ('klein@gmail.com', false, 1),
    ('victor@gmail.com', false, 1);

-- Insert asientos

INSERT INTO SEAT (Snumber, Sclass, Pno)
VALUES
    ('A1', 'Ejecutivo', 65),
    ('C3', 'Turista', 66);
	
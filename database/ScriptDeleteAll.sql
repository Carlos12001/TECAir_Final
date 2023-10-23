-- Eliminar las tablas en el orden inverso de sus creaciones (teniendo en cuenta las restricciones de clave externa)

-- Eliminar las restricciones de clave externa

-- Eliminar las restricciones de clave externa de la tabla USER_STOP
ALTER TABLE USER_STOP
DROP CONSTRAINT IF EXISTS USER_STOP_STOP_FK;
ALTER TABLE USER_STOP
DROP CONSTRAINT IF EXISTS USER_STOP_USER_FK;

-- Eliminar las restricciones de clave externa de la tabla STOP
ALTER TABLE STOP
DROP CONSTRAINT IF EXISTS STOP_TO_AIRPORT_FK;
ALTER TABLE STOP
DROP CONSTRAINT IF EXISTS STOP_FROM_AIRPORT_FK;
ALTER TABLE STOP
DROP CONSTRAINT IF EXISTS STOP_FLIGHT_FK;

-- Eliminar las restricciones de clave externa de la tabla SEAT
ALTER TABLE SEAT
DROP CONSTRAINT IF EXISTS SEAT_PASSENGER_FK;

-- Eliminar las restricciones de clave externa de la tabla PROMO
ALTER TABLE PROMO
DROP CONSTRAINT IF EXISTS PROMO_FLIGHT_FK;

-- Eliminar las restricciones de clave externa de la tabla FLIGHT
ALTER TABLE FLIGHT
DROP CONSTRAINT IF EXISTS FLIGHT_TO_AIRPORT_FK;
ALTER TABLE FLIGHT
DROP CONSTRAINT IF EXISTS FLIGHT_FROM_AIRPORT_FK;
ALTER TABLE FLIGHT
DROP CONSTRAINT IF EXISTS FLIGHT_PLANE_FK;

-- Eliminar las restricciones de clave externa de la tabla BAGGAGE_COLOR
ALTER TABLE BAGGAGE_COLOR
DROP CONSTRAINT IF EXISTS BAGGAGE_COLOR_BAGGAGE_FK;

-- Eliminar las restricciones de clave externa de la tabla BAGGAGE
ALTER TABLE BAGGAGE
DROP CONSTRAINT IF EXISTS BAGGAGE_PASSENGER_FK;

-- Eliminar las restricciones de clave externa de la tabla PASSENGER
ALTER TABLE PASSENGER
DROP CONSTRAINT IF EXISTS PASSENGER_FLIGHT_FK;
ALTER TABLE PASSENGER
DROP CONSTRAINT IF EXISTS PASSENGER_USER_FK;

-- Eliminar las restricciones de clave externa de la tabla AIRADMIN
ALTER TABLE AIRADMIN
DROP CONSTRAINT IF EXISTS ADMIN_USER_FK;

-- Eliminar las restricciones de clave externa de la tabla STUDENT
ALTER TABLE STUDENT
DROP CONSTRAINT IF EXISTS STUDENT_USER_FK;

-- Finalmente, eliminar las tablas en el orden inverso de su creaciÃ³n

-- Eliminar la tabla AIRPORT
DROP TABLE IF EXISTS AIRPORT;

-- Eliminar la tabla USER_STOP
DROP TABLE IF EXISTS USER_STOP;

-- Eliminar la tabla STOP
DROP TABLE IF EXISTS STOP;

-- Eliminar la tabla SEAT
DROP TABLE IF EXISTS SEAT;

-- Eliminar la tabla PROMO
DROP TABLE IF EXISTS PROMO;

-- Eliminar la tabla FLIGHT
DROP TABLE IF EXISTS FLIGHT;

-- Eliminar la tabla BAGGAGE_COLOR
DROP TABLE IF EXISTS BAGGAGE_COLOR;

-- Eliminar la tabla BAGGAGE
DROP TABLE IF EXISTS BAGGAGE;

-- Eliminar la tabla PASSENGER
DROP TABLE IF EXISTS PASSENGER;

-- Eliminar la tabla AIRADMIN
DROP TABLE IF EXISTS AIRADMIN;

-- Eliminar la tabla STUDENT
DROP TABLE IF EXISTS STUDENT;

-- Eliminar la tabla PLANE
DROP TABLE IF EXISTS PLANE;

-- Eliminar la tabla USERW
DROP TABLE IF EXISTS USERW;
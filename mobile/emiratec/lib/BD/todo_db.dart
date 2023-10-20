import 'package:emiratec/BD/sql.dart';
import 'package:emiratec/objects/flight.dart';
import 'package:emiratec/objects/layover.dart';
import 'package:emiratec/objects/promotion.dart';
import 'package:emiratec/objects/user.dart';
import 'package:sqflite/sqflite.dart';

class TodoDB {
  Future<void> createTable(Database database) async {
    List<String> commands = Sql.tables.split(';');
    for (String command in commands) {
      if (command.trim().isNotEmpty) {
        await database.execute(command);
      }
    }
  }

  // Insert
  Future<void> insertPromotion(Database database, Promotion promotion) async {
    final map = promotion.toMap();
    await database.insert('PROMO', map);
  }

  Future<void> insertFlight(Database database, Flight promotion) async {
    final map = promotion.toMap();
    await database.insert('FLIGHT', map);
  }

  Future<void> insertLayover(Database database, Layover promotion) async {
    final map = promotion.toMap();
    await database.insert('STOP', map);
  }

  Future<void> insertUser(Database database, User promotion) async {
    final map = promotion.toMap();
    await database.insert('USERW', map);
  }

  Future<List<Map<String, dynamic>>> fetchPromotions(Database database) async {
    return await database.query('PROMO');
  }

  Future<List<Map<String, dynamic>>> fetchAirportsNames(
      Database database) async {
    return await database.rawQuery('SELECT City FROM AIRPORT');
  }

  Future<List<Map<String, dynamic>>> fetchFlights(
      Database database, String origin, String destination) async {
    return await database.rawQuery('''
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
      A1.Aname = ? AND A2.Aname = ?;  -- Filtrar basado en los nombres de los aeropuertos
  ''', [
      origin,
      destination
    ]); // Usar consultas parametrizadas para evitar inyecciones SQL
  }
}

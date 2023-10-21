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

  // Future<void> insertFlight(Database database, Flight promotion) async {
  //   final map = promotion.toMap();
  //   await database.insert('FLIGHT', map);
  // }

  Future<void> insertLayover(Database database, Layover promotion) async {
    final map = promotion.toMap();
    await database.insert('STOP', map);
  }

  Future<void> insertUser(Database database, User newUser) async {
    final map = newUser.toMap();
    await database.insert('USERW', map);
  }

  Future<List<Map<String, dynamic>>> fetchPromotions(Database database) async {
    return await database.query('PROMO');
  }

  Future<List<Map<String, dynamic>>> fetchAirportsNames(
      Database database) async {
    return await database.rawQuery('SELECT City FROM AIRPORT');
  }

  Future<List<Map<String, dynamic>>> fetchAirports(Database database) async {
    return await database.query('AIRPORT', columns: ['AirportID', 'Aname      ']);
  }

  Future<List<Map<String, dynamic>>> fetchAvailableFlights(
      Database database, String sfrom, String sto) async {
    return await database.rawQuery('''
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
          s.Sfrom = ? AND
          s.Sto = ? AND
          f.Fstate = 1 AND
          (
             (s.Sdate = date('now') AND s.Departure_hour > time('now', '+2 hours'))
             OR 
             s.Sdate > date('now')
          ) AND
          (SELECT COUNT(*) FROM PASSENGER WHERE Fno = f.Fnumber) < p.Capacity
      GROUP BY f.Fnumber, s.StopID, a1.City, a2.City, a2.Image, f.Fdate, f.Price;
    ''', [sfrom, sto]);
  }

  Future<User?> getUserByEmailAndPassword(
      Database database, String email, String password) async {
    List<Map<String, dynamic>> results = await database.query(
      'USERW',
      where: 'email = ? AND upassword = ?',
      whereArgs: [email, password],
    );

    if (results.isNotEmpty) {
      return User.fromMap(results.first);
    }

    return null;
  }
}

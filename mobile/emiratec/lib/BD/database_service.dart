import 'dart:io';
import 'dart:typed_data';
import 'package:emiratec/BD/todo_db.dart';
import 'package:emiratec/objects/Airport.dart';
import 'package:emiratec/objects/Student.dart';
import 'package:emiratec/objects/flight.dart';
import 'package:emiratec/objects/layover.dart';
import 'package:emiratec/objects/promotion.dart';
import 'package:emiratec/objects/user.dart';
import 'package:flutter/services.dart';
import 'package:sqflite/sqflite.dart';
import 'package:path/path.dart';

class DatabaseService {
  Database? _database;

  Future<Database> get database async {
    if (_database != null) {
      return _database!;
    }
    _database = await _initialize();
    return _database!;
  }

  Future<String> get fullPath async {
    const name = "tecAir.db";
    final path = await getDatabasesPath();
    return join(path, name);
  }

  Future<Database> _initialize() async {
    final path = await fullPath;
    final exists = await databaseExists(path);

    if (!exists) {
      // Asegúrate de que el padre directo exista
      try {
        await Directory(dirname(path)).create(recursive: true);
      } catch (_) {}

      // Copia la base de datos desde los assets
      ByteData data =
          await rootBundle.load(join('lib', 'BD', 'tecAirMobile.db'));
      List<int> bytes = data.buffer.asUint8List();
      await File(path).writeAsBytes(bytes, flush: true);
    }

    return await openDatabase(path, version: 1, singleInstance: true);
  }

  Future<void> create(Database database, int version) async =>
      await TodoDB().createTable(database);

  Future<void> insertPromotion(Promotion promotion) async {
    final db = await database;
    await TodoDB().insertPromotion(db, promotion);
  }

  // Future<void> insertFlight(Flight flight) async {
  //   final db = await database;
  //   await TodoDB().insertFlight(db, flight);
  // }

  Future<void> insertLayover(Layover layover) async {
    final db = await database;
    await TodoDB().insertLayover(db, layover);
  }

  Future<void> insertUser(User user) async {
    final db = await database;
    await TodoDB().insertUser(db, user);
  }

  Future<void> insertStudent(Student student) async {
    final db = await database;
    await TodoDB().insertStudent(db, student);
  }


  Future<List<Map<String, dynamic>>> fetchAirports() async {
    final db = await database;
    return await db.query('AIRPORT');
  }

  Future<List<Promotion>> getPromotions() async {
    final db = await database;
    List<Map<String, dynamic>> promoMaps = await TodoDB().fetchPromotions(db);
    print("-----");
    print(promoMaps);
    print("-----");
    return Promotion.fromMapList(promoMaps);
  }

  Future<List<String>> getAirportsNames() async {
    final db = await database;
    List<Map<String, dynamic>> airportMaps =
        await TodoDB().fetchAirportsNames(db);

    return airportMaps.map((airport) => airport['City'] as String).toList();
    // 'Aname' es solo un ejemplo. Ajusta según el nombre correcto de la columna que contiene los nombres de los aeropuertos.
  }

  Future<User?> getUserByEmailAndPassword(String email, String password) async {
    final db = await database;
    return await TodoDB().getUserByEmailAndPassword(db, email, password);
  }

  Future<List<Map<String, dynamic>>> getAvailableFlights(
      String sfrom, String sto) async {
    final db = await database;
    return await TodoDB().fetchAvailableFlights(db, sfrom, sto);
  }

  Future<List<Map<String, dynamic>>> getAirports() async {
    final db = await database;
    return await TodoDB().fetchAirports(db);
  }

  Future<bool> getUserExist(String email) async {
    final db = await database;
    return await TodoDB().userExists(db, email);
  }

   Future<void> insertIntoPassenger(String email, String fnumber) async {
    final db = await database;
    await TodoDB().insertIntoPassenger(db, email, fnumber);
  }

  Future<void> insertIntoUserStop(String email, String stopid) async {
    final db = await database;
    await TodoDB().insertIntoUserStop(db, email, stopid);
  }

  Future<void> updateStudentMiles(String email) async {
    final db = await database;
    await TodoDB().updateStudentMiles(db, email);
  }

  Future<List<Map<String, dynamic>>> fetchUserData(String email, String stopid) async {
    final db = await database;
    return await TodoDB().fetchUserData(db, email, stopid);
  }
}

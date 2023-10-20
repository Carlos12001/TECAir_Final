import 'dart:io';
import 'dart:typed_data';

import 'package:emiratec/BD/todo_db.dart';
import 'package:emiratec/objects/Airport.dart';
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

  Future<void> insertFlight(Flight flight) async {
    final db = await database;
    await TodoDB().insertFlight(db, flight);
  }

  Future<void> insertLayover(Layover layover) async {
    final db = await database;
    await TodoDB().insertLayover(db, layover);
  }

  Future<void> insertUser(User user) async {
    final db = await database;
    await TodoDB().insertUser(db, user);
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

    print("-----");
    print(airportMaps);
    print("-----");

    return airportMaps.map((airport) => airport['City'] as String).toList();
    // 'Aname' es solo un ejemplo. Ajusta según el nombre correcto de la columna que contiene los nombres de los aeropuertos.
  }
}

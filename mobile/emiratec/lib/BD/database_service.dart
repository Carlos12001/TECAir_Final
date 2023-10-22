import 'dart:io';
import 'dart:typed_data';
import 'package:emiratec/BD/todo_db.dart';
import 'package:emiratec/globals.dart';
import 'package:emiratec/objects/Airport.dart';
import 'package:emiratec/objects/Student.dart';
import 'package:emiratec/objects/flight.dart';
import 'package:emiratec/objects/layover.dart';
import 'package:emiratec/objects/promotion.dart';
import 'package:emiratec/objects/user.dart';
import 'package:flutter/services.dart';
import 'package:sqflite/sqflite.dart';
import 'package:path/path.dart';
import 'package:http/http.dart' as http;
import 'dart:convert'; // Para decodificar el JSON

class DatabaseService {
  Database? _database;

  /// The `Future<Database> get database async` method is a getter method that returns a `Future` object
  /// representing the database.
  Future<Database> get database async {
    if (_database != null) {
      return _database!;
    }
    _database = await _initialize();
    return _database!;
  }

  /// The `Future<String> get fullPath async` method is a getter method that returns a `Future` object
  /// representing the full path of the database file.
  Future<String> get fullPath async {
    const name = "tecAir.db";
    final path = await getDatabasesPath();
    return join(path, name);
  }

  /// The above function initializes a database by checking if it exists, creating the necessary
  /// directories if it doesn't, and copying the database from assets if it doesn't exist.
  ///
  /// Returns:
  ///   The method `_initialize()` returns a `Future<Database>`.
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

  /// The function inserts a promotion into a database.
  ///
  /// Args:
  ///   promotion (Promotion): The promotion parameter is an object of type Promotion, which represents
  /// a promotion that you want to insert into the database.
  Future<void> insertPromotion(Promotion promotion) async {
    final db = await database;
    await TodoDB().insertPromotion(db, promotion);
  }

  /// The function inserts a layover into a database.
  ///
  /// Args:
  ///   layover (Layover): The `layover` parameter is an instance of the `Layover` class, which represents
  /// a layover object. It contains information about the layover, such as the duration, location, and any
  /// additional details.
  Future<void> insertLayover(Layover layover) async {
    final db = await database;
    await TodoDB().insertLayover(db, layover);
  }

  /// The function inserts a user into a database using Dart and SQLite.
  ///
  /// Args:
  ///   user (User): The user parameter is an instance of the User class, which represents a user object
  /// with properties such as name, email, and age.
  Future<void> insertUser(User user) async {
    final db = await database;
    await TodoDB().insertUser(db, user);
  }

  /// The function inserts a student object into a database.
  ///
  /// Args:
  ///   student (Student): The parameter "student" is of type "Student". It represents the student object
  /// that needs to be inserted into the database.
  Future<void> insertStudent(Student student) async {
    final db = await database;
    await TodoDB().insertStudent(db, student);
  }

  /// The function fetchAirports retrieves a list of airports from a database.
  ///
  /// Returns:
  ///   The fetchAirports() function is returning a Future object that resolves to a List of Map objects.
  /// Each Map object represents an airport and contains String keys and dynamic values.
  Future<List<Map<String, dynamic>>> fetchAirports() async {
    final db = await database;
    return await db.query('AIRPORT');
  }

  /// The function retrieves promotions from a database and returns them as a list of Promotion objects.
  ///
  /// Returns:
  ///   The `getPromotions()` function is returning a `Future` object that resolves to a `List` of
  /// `Promotion` objects.
  Future<List<Promotion>> getPromotions() async {
    final db = await database;
    List<Map<String, dynamic>> promoMaps = await TodoDB().fetchPromotions(db);
    return Promotion.fromMapList(promoMaps);
  }

  /// The function clears all promotions in the database.
  Future<void> clearAllPromotions() async {
    final db = await database;
    await TodoDB().clearPromotions(db);
  }

  /// The function retrieves a list of airport names from a database.
  ///
  /// Returns:
  ///   The function `getAirportsNames` returns a `Future` that resolves to a `List` of `String` values.
  Future<List<String>> getAirportsNames() async {
    final db = await database;
    List<Map<String, dynamic>> airportMaps =
        await TodoDB().fetchAirportsNames(db);

    return airportMaps.map((airport) => airport['City'] as String).toList();
  }

  /// The function `getUserByEmailAndPassword` retrieves a user from the database based on their email
  /// and password.
  ///
  /// Args:
  ///   email (String): A string representing the email of the user.
  ///   password (String): The password parameter is a string that represents the user's password.
  ///
  /// Returns:
  ///   a Future object that resolves to a User object or null.
  Future<User?> getUserByEmailAndPassword(String email, String password) async {
    final db = await database;
    return await TodoDB().getUserByEmailAndPassword(db, email, password);
  }

  /// The function `getAvailableFlights` retrieves a list of available flights from a database based on
  /// the given source and destination.
  ///
  /// Args:
  ///   sfrom (String): The parameter "sfrom" represents the starting location or origin of the flight.
  /// It is a string that specifies the location from where the flight will depart.
  ///   sto (String): The "sto" parameter represents the destination airport code.
  ///
  /// Returns:
  ///   a Future object that resolves to a List of Maps, where each Map has String keys and dynamic
  /// values.
  Future<List<Map<String, dynamic>>> getAvailableFlights(
      String sfrom, String sto) async {
    final db = await database;
    return await TodoDB().fetchAvailableFlights(db, sfrom, sto);
  }

  /// The function `getAirports` returns a Future that resolves to a list of maps containing airport
  /// data.
  ///
  /// Returns:
  ///   a `Future` object that resolves to a `List` of `Map` objects. Each `Map` object has keys of type
  /// `String` and values of type `dynamic`.
  Future<List<Map<String, dynamic>>> getAirports() async {
    final db = await database;
    return await TodoDB().fetchAirports(db);
  }

  /// The function `getUserExist` checks if a user with a given email exists in the database.
  ///
  /// Args:
  ///   email (String): The email parameter is a string that represents the email address of the user.
  ///
  /// Returns:
  ///   a `Future<bool>`.
  Future<bool> getUserExist(String email) async {
    final db = await database;
    return await TodoDB().userExists(db, email);
  }

  /// The function inserts a passenger's email and flight number into a database.
  ///
  /// Args:
  ///   email (String): The email parameter is a string that represents the email of the passenger.
  ///   fnumber (String): The parameter "fnumber" represents the flight number.
  Future<void> insertIntoPassenger(String email, String fnumber) async {
    final db = await database;
    await TodoDB().insertIntoPassenger(db, email, fnumber);
  }

  /// The function inserts a user's email and stop ID into a database table called "UserStop".
  ///
  /// Args:
  ///   email (String): A string representing the email of the user.
  ///   stopid (String): The `stopid` parameter is a string that represents the ID of a stop.
  Future<void> insertIntoUserStop(String email, String stopid) async {
    final db = await database;
    await TodoDB().insertIntoUserStop(db, email, stopid);
  }

  /// The function `updateStudentMiles` updates the miles of a student in a database using their email as
  /// a parameter.
  ///
  /// Args:
  ///   email (String): The email parameter is a string that represents the email address of a student.
  Future<void> updateStudentMiles(String email) async {
    final db = await database;
    await TodoDB().updateStudentMiles(db, email);
  }

  /// The function fetches user data from a database based on the provided email and stopid.
  ///
  /// Args:
  ///   email (String): The email parameter is a string that represents the user's email address.
  ///   stopid (String): The `stopid` parameter is a string that represents the ID of a stop. It is used
  /// to fetch user data related to a specific stop.
  ///
  /// Returns:
  ///   The function `fetchUserData` is returning a `Future` object that resolves to a `List` of `Map`
  /// objects. Each `Map` object has keys of type `String` and values of type `dynamic`.
  Future<List<Map<String, dynamic>>> fetchUserData(
      String email, String stopid) async {
    final db = await database;
    return await TodoDB().fetchUserData(db, email, stopid);
  }

  Future<List<dynamic>> fetchAirportsFromAPI() async {
    final response = await http.get(Uri.parse('$apiLink/api/airport'));

    if (response.statusCode == 200) {
      return json.decode(response.body);
    } else {
      throw Exception('Failed to load airports from API');
    }
  }

  Future<void> syncAirports() async {
    final apiData = await fetchAirportsFromAPI();

    for (var airportData in apiData) {
      Airport airport = Airport.fromMap(airportData);
      // Aquí puedes verificar si el aeropuerto ya existe en tu base de datos
      // Si existe, actualiza el registro, de lo contrario, insértalo.
      // Usaré un pseudo método `airportExists` y `updateAirport` que deberías implementar.

      if (await airportExists(airport.airportID)) {
        await updateAirport(airport);
      } else {
        await insertAirport(airport);
      }
    }
  }

  Future<bool> airportExists(int airportId) async {
    final db = await database;
    final result = await db
        .query('AIRPORT', where: 'AirportID = ?', whereArgs: [airportId]);
    return result.isNotEmpty;
  }

  Future<void> updateAirport(Airport airport) async {
    final db = await database;
    await db.update('AIRPORT', airport.toMap(),
        where: 'AirportID = ?', whereArgs: [airport.airportID]);
  }

  Future<void> insertAirport(Airport airport) async {
    final db = await database;
    await db.insert('AIRPORT', airport.toMap());
  }

  List<Promotion> convertApiDataToPromotions(List<dynamic> apiData) {
    return apiData.map((data) {
      return Promotion(
          originCity: '', // El API no proporciona city, dejar vacío o modificar
          destinationCity: '', // Lo mismo aquí
          endDate: DateTime.parse(data['final_date']),
          imgPath: data['image'],
          percentage: data['dpercent'],
          fno: data['fno']);
    }).toList();
  }

  Future<List<dynamic>> fetchPromosFromAPI() async {
    final response = await http.get(Uri.parse('$apiLink/api/promo'));

    if (response.statusCode == 200) {
      return json.decode(response.body);
    } else {
      throw Exception('Failed to load promos from API');
    }
  }

  Future<void> syncPromotions() async {
    List<dynamic> apiData = await fetchPromosFromAPI();
    List<Promotion> promotions = convertApiDataToPromotions(apiData);

    for (Promotion promotion in promotions) {
      // Intentar actualizar la promoción, si falla, insertarla
      bool success = await updatePromotion(promotion);
      if (!success) {
        await insertPromotion(promotion);
      }
    }
  }

  Future<bool> updatePromotion(Promotion promotion) async {
    final db = await database;
    int updatedRows = await db.update(
      'PROMO',
      promotion.toMap(),
      where: 'Fno = ? AND Image = ?',
      whereArgs: [promotion.fno, promotion.imgPath],
    );

    // Retorna true si alguna fila fue actualizada
    return updatedRows > 0;
  }
}

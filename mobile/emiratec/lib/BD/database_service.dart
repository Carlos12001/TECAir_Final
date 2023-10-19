import 'package:emiratec/BD/todo_db.dart';
import 'package:emiratec/objects/flight.dart';
import 'package:emiratec/objects/layover.dart';
import 'package:emiratec/objects/promotion.dart';
import 'package:emiratec/objects/user.dart';
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
    var database = await openDatabase(
      path,
      version: 1,
      onCreate: create,
      singleInstance: true,
    );
    return database;
  }

  Future<void> create(Database database, int version) async => await TodoDB().createTable(database);

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
}

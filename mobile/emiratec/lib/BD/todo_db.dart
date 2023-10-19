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
}

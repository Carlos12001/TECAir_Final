import 'package:emiratec/BD/sql.dart';
import 'package:sqflite/sqflite.dart';

class TodoDB {
  final tableName = "todos";

  Future<void> createTable(Database database) async {
    await database.execute(Sql.tables);
  }

  //Future<int> insertReservation({required })
  
  // insert

  // updates

  // delete

}

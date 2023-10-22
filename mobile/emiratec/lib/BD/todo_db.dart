import 'package:emiratec/BD/sql.dart';
import 'package:emiratec/objects/Student.dart';
import 'package:emiratec/objects/flight.dart';
import 'package:emiratec/objects/layover.dart';
import 'package:emiratec/objects/promotion.dart';
import 'package:emiratec/objects/user.dart';
import 'package:sqflite/sqflite.dart';

class TodoDB {
  /// The function creates tables in a database using a list of SQL commands.
  ///
  /// Args:
  ///   database (Database): The `database` parameter is an instance of the `Database` class, which
  /// represents a connection to a SQLite database.
  Future<void> createTable(Database database) async {
    List<String> commands = Sql.tables.split(';');
    for (String command in commands) {
      if (command.trim().isNotEmpty) {
        await database.execute(command);
      }
    }
  }

  /// The function inserts a promotion object into a database table named 'PROMO'.
  ///
  /// Args:
  ///   database (Database): The `database` parameter is an instance of the `Database` class, which
  /// represents a connection to a database. It is used to perform database operations such as inserting
  /// data.
  ///   promotion (Promotion): The promotion object that needs to be inserted into the database.
  Future<void> insertPromotion(Database database, Promotion promotion) async {
    final map = promotion.toMap();
    await database.insert('PROMO', map);
  }

  /// The function clears all promotions from a database.
  ///
  /// Args:
  ///   database (Database): The database parameter is an instance of the Database class, which
  /// represents a connection to a database.
  Future<void> clearPromotions(Database database) async {
    await database.delete('PROMO');
  }

  /// The function inserts a layover promotion into a database.
  ///
  /// Args:
  ///   database (Database): The `database` parameter is an instance of the `Database` class, which
  /// represents a connection to a SQLite database. It is used to perform database operations such as
  /// inserting data.
  ///   promotion (Layover): The `promotion` parameter is an object of type `Layover` that represents a
  /// layover promotion.
  Future<void> insertLayover(Database database, Layover promotion) async {
    final map = promotion.toMap();
    await database.insert('STOP', map);
  }

  /// The function checks if a user with a given email exists in a database table named 'USERW'.
  ///
  /// Args:
  ///   database (Database): The database parameter is an instance of the Database class, which
  /// represents a connection to a SQLite database. It is used to perform database operations such as
  /// querying and updating data.
  ///   email (String): The email parameter is a string that represents the email address of the user we
  /// want to check for existence in the database.
  ///
  /// Returns:
  ///   The function `userExists` returns a `Future<bool>`.
  Future<bool> userExists(Database database, String email) async {
    List<Map<String, dynamic>> result = await database.query(
      'USERW',
      where: 'email = ?',
      whereArgs: [email],
    );

    return result.isNotEmpty;
  }

  /// The function inserts a new user into a database if the user does not already exist.
  ///
  /// Args:
  ///   database (Database): The database parameter is an instance of the Database class, which
  /// represents a connection to a database. It is used to perform database operations such as inserting
  /// data.
  ///   newUser (User): The `newUser` parameter is an instance of the `User` class, which represents the
  /// user to be inserted into the database. It contains information such as the user's email, name, and
  /// other relevant details.
  Future<void> insertUser(Database database, User newUser) async {
    bool exists = await userExists(database, newUser.email);

    if (!exists) {
      final map = newUser.toMap();
      await database.insert('USERW', map);
    } else {
      throw Exception('User with this email already exists!');
    }
  }

  /// The function inserts a new student into a database table.
  ///
  /// Args:
  ///   database (Database): The `database` parameter is an instance of the `Database` class, which
  /// represents a connection to a database. It is used to perform operations such as inserting,
  /// updating, and querying data.
  ///   newStudent (Student): The `newStudent` parameter is an instance of the `Student` class.
  Future<void> insertStudent(Database database, Student newStudent) async {
    final map = newStudent.toMap();
    await database.insert('STUDENT', map);
  }

  /// The function fetchPromotions fetches a list of promotions from a database, including information
  /// about the flight, image, discount percentage, final date, origin city, and destination city.
  ///
  /// Args:
  ///   database (Database): The `database` parameter is an instance of the `Database` class, which
  /// represents a connection to a database. It is used to execute SQL queries and interact with the
  /// database.
  ///
  /// Returns:
  ///   The fetchPromotions function is returning a Future object that resolves to a List of Maps. Each
  /// Map represents a row of data from the query result. The keys in the Map represent the column names
  /// from the query result, and the values represent the corresponding values for each column in that
  /// row. The values can be of any type, as indicated by the "dynamic" type.
  Future<List<Map<String, dynamic>>> fetchPromotions(Database database) async {
    return await database.rawQuery('''
      SELECT 
          P.Fno,
          P.Image,
          P.Dpercent,
          P.Final_date,
          A1.City AS OriginCity,
          A2.City AS DestinationCity
      FROM PROMO P
      JOIN FLIGHT F ON P.Fno = F.Fnumber
      JOIN AIRPORT A1 ON F.Ffrom = A1.AirportID
      JOIN AIRPORT A2 ON F.Fto = A2.AirportID
    ''');
  }

  /// The function fetches the names of airports from a database.
  ///
  /// Args:
  ///   database (Database): The database parameter is an instance of the Database class, which
  /// represents a connection to a SQLite database. It is used to execute SQL queries and interact with
  /// the database.
  ///
  /// Returns:
  ///   a Future object that resolves to a List of Maps. Each Map has a String key and a dynamic value.
  Future<List<Map<String, dynamic>>> fetchAirportsNames(
      Database database) async {
    return await database.rawQuery('SELECT City FROM AIRPORT');
  }

  /// The function fetches a list of airports from a database, including their ID and name.
  ///
  /// Args:
  ///   database (Database): The `database` parameter is an instance of the `Database` class, which
  /// represents a connection to a SQLite database. It is used to execute SQL queries and interact with
  /// the database.
  ///
  /// Returns:
  ///   a Future object that resolves to a List of Maps. Each Map contains String keys and dynamic values.
  Future<List<Map<String, dynamic>>> fetchAirports(Database database) async {
    return await database.query('AIRPORT', columns: ['AirportID', 'Aname']);
  }

  /// The function fetches available flights from a database based on the source and destination airports.
  ///
  /// Args:
  ///   database (Database): The database parameter is an instance of the Database class, which represents
  /// a connection to a SQLite database. It is used to execute SQL queries and interact with the database.
  ///   sfrom (String): The parameter "sfrom" represents the code or ID of the departure airport.
  ///   sto (String): The parameter "sto" represents the destination airport code or ID.
  ///
  /// Returns:
  ///   The function `fetchAvailableFlights` returns a `Future` object that resolves to a `List` of `Map`
  /// objects. Each `Map` object represents a row of data from the query result and contains key-value
  /// pairs where the keys are `String` and the values can be of any type (`dynamic`).
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

  /// The function `getUserByEmailAndPassword` retrieves a user from a database based on their email and
  /// password.
  ///
  /// Args:
  ///   database (Database): The database parameter is an instance of the Database class, which represents
  /// the database connection. It is used to perform database operations such as querying and updating
  /// data.
  ///   email (String): The email parameter is a string that represents the user's email address.
  ///   password (String): The password parameter is a string that represents the user's password.
  ///
  /// Returns:
  ///   a `Future<User?>`.
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

  /// The function inserts a new record into the PASSENGER table in the database with the provided email
  /// and flight number.
  ///
  /// Args:
  ///   database (Database): The database parameter is an instance of the Database class, which
  /// represents the database you want to insert data into.
  ///   email (String): The email parameter is a string that represents the email of the passenger.
  ///   fnumber (String): The `fnumber` parameter represents the flight number.
  Future<void> insertIntoPassenger(
      Database database, String email, String fnumber) async {
    await database.rawInsert(
        'INSERT INTO PASSENGER(uemail, fno) VALUES(?, ?)', [email, fnumber]);
  }

  /// The function inserts a new record into the USER_STOP table in a database, with the provided email
  /// and stopid values.
  ///
  /// Args:
  ///   database (Database): The database parameter is an instance of the Database class, which represents
  /// the SQLite database that you want to insert data into.
  ///   email (String): The email parameter is a string that represents the email of the user.
  ///   stopid (String): The `stopid` parameter is a string that represents the ID of a stop.
  Future<void> insertIntoUserStop(
      Database database, String email, String stopid) async {
    await database.rawInsert(
        'INSERT INTO USER_STOP(uemail, sid) VALUES(?, ?)', [email, stopid]);
  }

  /// The function updates the miles of a student in a database by adding 100 to their current miles if
  /// their email exists in the database.
  ///
  /// Args:
  ///   database (Database): The database parameter is an instance of the Database class, which
  /// represents a connection to a SQLite database. It is used to execute SQL queries and interact with
  /// the database.
  ///   email (String): The email parameter is a string that represents the email of the student whose
  /// miles need to be updated.
  Future<void> updateStudentMiles(Database database, String email) async {
    await database.rawUpdate(
        'UPDATE STUDENT SET Miles = Miles + 100 WHERE Uemail = ? AND EXISTS (SELECT 1 FROM STUDENT WHERE Uemail = ?)',
        [email, email]);
  }

  /// The function fetches user data from a database based on their email and stop ID.
  ///
  /// Args:
  ///   database (Database): The database parameter is an instance of the Database class, which represents
  /// a connection to a SQLite database. It is used to execute SQL queries and interact with the database.
  ///   email (String): The email parameter is a string that represents the email of the user for whom we
  /// want to fetch the data.
  ///   stopid (String): The `stopid` parameter is a string that represents the ID of a stop. It is used
  /// in the SQL query to filter the results based on the specified stop ID.
  ///
  /// Returns:
  ///   The function `fetchUserData` is returning a `Future` object that resolves to a `List` of `Map`
  /// objects. Each `Map` object represents a row of data fetched from the database and has keys of type
  /// `String` and values of type `dynamic`.
  Future<List<Map<String, dynamic>>> fetchUserData(
      Database database, String email, String stopid) async {
    return await database.rawQuery('''
      SELECT U.Email, P.Pnumber, S.Departure_hour
      FROM USERW AS U
      JOIN PASSENGER AS P ON U.Email = P.Uemail
      JOIN FLIGHT AS F ON F.Fnumber = P.Fno
      JOIN STOP AS S ON F.Fnumber = S.Fno
      WHERE U.Email = ? AND S.StopID = ?
      ''', [email, stopid]);
  }
}

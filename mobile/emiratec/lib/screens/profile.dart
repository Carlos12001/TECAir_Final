import 'package:emiratec/BD/database_service.dart';
import 'package:emiratec/globals.dart';
import 'package:emiratec/objects/Student.dart';
import 'package:emiratec/objects/user.dart';
import 'package:flutter/material.dart';

/// The `Profile` class is a stateful widget in Dart that takes a callback function `onVerified` as a
/// parameter.
class Profile extends StatefulWidget {
  final Function(int) onVerified;

  const Profile({Key? key, required this.onVerified}) : super(key: key);

  @override
  State<Profile> createState() => ProfileState();
}

/// The `ProfileState` class represents the state of the `Profile` widget and builds the UI for the
/// profile screen.
class ProfileState extends State<Profile> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        decoration: const BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
            colors: [
              Color.fromRGBO(2, 0, 36, 1),
              Color.fromRGBO(9, 50, 121, 1),
              Color.fromRGBO(0, 212, 255, 1),
            ],
            stops: [0.0, 0.4, 1.0],
          ),
        ),
        child: Center(
          child: Column(
            children: [
              SizedBox(
                height: MediaQuery.of(context).size.height * 0.05,
              ),
              const Text(
                'Profile',
                textAlign: TextAlign.left,
                style: TextStyle(
                  color: Colors.white,
                  fontSize: 25.0,
                  fontWeight: FontWeight.bold,
                ),
              ),
              SizedBox(
                height: MediaQuery.of(context).size.height * 0.02,
              ),
              Expanded(
                child: Padding(
                  padding: EdgeInsets.all(10.0),
                  child: UserInfoBox(onVerified: widget.onVerified),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

/// The `UserInfoBox` class is a stateful widget in Dart that allows users to provide a verification
/// function.
class UserInfoBox extends StatefulWidget {
  final Function(int) onVerified;

  const UserInfoBox({Key? key, required this.onVerified}) : super(key: key);

  @override
  _UserInfoBoxState createState() => _UserInfoBoxState();
}

/// The `_UserInfoBoxState` class is a stateful widget that manages the text editing controllers and the
/// UI elements for a user information box, including sign-in and registration forms.
class _UserInfoBoxState extends State<UserInfoBox> {
  final firstNameController = TextEditingController();
  final middleNameController = TextEditingController();
  final firstLastNameController = TextEditingController();
  final secondLastNameController = TextEditingController();
  final telController = TextEditingController();
  final emailController = TextEditingController();
  final passwordController = TextEditingController();
  final sign_in_emailController = TextEditingController();
  final sign_in_passwordController = TextEditingController();
  final universityController = TextEditingController();
  final studentIDController = TextEditingController();
  final milesController = TextEditingController();

  /// The dispose function is used to dispose of all the controllers when the widget is removed.
  @override
  void dispose() {
    // Dispose of the controllers when the widget is removed
    firstNameController.dispose();
    middleNameController.dispose();
    firstLastNameController.dispose();
    secondLastNameController.dispose();
    telController.dispose();
    emailController.dispose();
    passwordController.dispose();
    universityController.dispose();
    studentIDController.dispose();
    milesController.dispose();
    sign_in_emailController.dispose();
    sign_in_passwordController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16.0),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16.0),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.1),
            spreadRadius: 10,
            blurRadius: 5,
            offset: const Offset(5, 5),
          ),
        ],
      ),
      child: SingleChildScrollView(
        child: Column(
          children: [
            //---------
            Padding(
              padding: const EdgeInsets.all(8.0),
              child: Column(
                children: [
                  const Text(
                    'Sign in',
                    style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
                  ),
                  readOnlyTextField("Email", sign_in_emailController),
                  readOnlyTextField("Contraseña", sign_in_passwordController),
                  ElevatedButton(
                      onPressed: _verifyUserLogin,
                      child: const Text('Iniciar sesión'))
                ],
              ),
            ),
            const Divider(),
            //------------
            const Text(
              'Registrarse',
              style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
            ),
            readOnlyTextField("Primer nombre", firstNameController),
            readOnlyTextField("Segundo nombre", middleNameController),
            Row(
              children: [
                Expanded(
                    child: readOnlyTextField(
                        "1er apellido", firstLastNameController)),
                const SizedBox(width: 16.0),
                Expanded(
                    child: readOnlyTextField(
                        "2do apellido", secondLastNameController)),
              ],
            ),
            readOnlyTextField("Tel", telController),
            readOnlyTextField("Email", emailController),
            readOnlyTextField("Contraseña", passwordController),
            const Divider(),
            readOnlyTextField("Universidad", universityController),
            readOnlyTextField("ID de Estudiante", studentIDController),

            ElevatedButton(
              onPressed: _addUser,
              child: const Text("Registrarse"),
            )
          ],
        ),
      ),
    );
  }

  /// The `_verifyUserLogin` function checks if a user's email and password match in the database and
  /// performs certain actions based on the result.
  Future<void> _verifyUserLogin() async {
    final dbService = DatabaseService();
    User? user = await dbService.getUserByEmailAndPassword(
        sign_in_emailController.text, sign_in_passwordController.text);

    if (user != null) {
      widget.onVerified(0);
      // Agregar usuario global
      globalUser = sign_in_emailController.text;
      print(globalUser);
    } else {
      _showErrorDialog();
    }
  }

  /// The `_showErrorDialog` function displays an error dialog with a title, content, and a close button.
  ///
  /// Returns:
  ///   The `_showErrorDialog` function is returning an `AlertDialog` widget.
  void _showErrorDialog() {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: const Text('Error'),
          content: const Text('Email o contraseña incorrectos.'),
          actions: <Widget>[
            ElevatedButton(
              child: const Text('Cerrar'),
              onPressed: () {
                Navigator.of(context).pop();
              },
            ),
          ],
        );
      },
    );
  }

  /// The `_showUserExistsDialog` function displays an error dialog with a message indicating that a user
  /// with the provided email is already registered.
  ///
  /// Returns:
  ///   an AlertDialog widget.
  void _showUserExistsDialog() {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: const Text('Error'),
          content: const Text('El usuario con este email ya está registrado.'),
          actions: <Widget>[
            ElevatedButton(
              child: const Text('Cerrar'),
              onPressed: () {
                Navigator.of(context).pop();
              },
            ),
          ],
        );
      },
    );
  }

  /// The function `_addUserStudent` adds a user and a student asynchronously.
  Future<void> _addUserStudent() async {
    _addUser();
    _addStudent();
  }

  /// The function `_addUser` checks if a user exists in the database and inserts a new user if they do
  /// not exist.
  Future<void> _addUser() async {
    final dbService = DatabaseService();

    bool exists = await dbService.getUserExist(emailController.text);

    if (exists) {
      _showUserExistsDialog();
    } else {
      dbService.insertUser(User(
        Fname: firstNameController.text,
        Sname: middleNameController.text,
        FLname: firstLastNameController.text,
        SLname: secondLastNameController.text,
        Pnumber: int.parse(telController.text),
        email: emailController.text,
        upassword: passwordController.text,
      ));
    }
  }

  /// The `_addStudent` function adds a student to a database and displays success or error messages to
  /// the user.
  Future<void> _addStudent() async {
    final dbService = DatabaseService();
    if (studentIDController.text.isNotEmpty &&
        universityController.text.isNotEmpty &&
        emailController.text.isNotEmpty) {
      try {
        await dbService.insertStudent(Student(
            studentId: studentIDController.text,
            university: universityController.text,
            uemail: emailController.text));

        // Opcionalmente: Mostrar un mensaje de éxito al usuario.
        ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(content: Text('Estudiante agregado con éxito!')));
      } catch (e) {
        // Mostrar el error al usuario o registrar en algún log.
        ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(content: Text('Error al agregar el estudiante: $e')));
      }
    } else {
      // Opcionalmente: Notificar al usuario que todos los campos son requeridos.
      ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Todos los campos son requeridos.')));
    }
  }

  /// The function returns a read-only text field widget with a given title and a controller for managing
  /// the text.
  ///
  /// Args:
  ///   title (String): A string that represents the title or label for the text field.
  ///   controller (TextEditingController): The TextEditingController is a class that allows you to
  /// control the text being edited in a TextField widget. It provides methods to set and retrieve the
  /// text value, as well as listen for changes to the text.

  Widget readOnlyTextField(String title, TextEditingController controller) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 8.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(title, style: const TextStyle(fontWeight: FontWeight.bold)),
          const SizedBox(height: 4.0),
          TextField(
            controller: controller,
            decoration: InputDecoration(
              filled: true,
              fillColor: Colors.grey[200],
              border: const OutlineInputBorder(),
            ),
          ),
        ],
      ),
    );
  }
}

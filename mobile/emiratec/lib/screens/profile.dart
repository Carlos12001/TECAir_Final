import 'package:emiratec/BD/database_service.dart';
import 'package:emiratec/objects/user.dart';
import 'package:flutter/material.dart';

class Profile extends StatefulWidget {
  final Function(int) onVerified;

  const Profile({Key? key, required this.onVerified}) : super(key: key);

  @override
  State<Profile> createState() => ProfileState();
}

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

class UserInfoBox extends StatefulWidget {
  final Function(int) onVerified;

  const UserInfoBox({Key? key, required this.onVerified}) : super(key: key);

  @override
  _UserInfoBoxState createState() => _UserInfoBoxState();
}

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

  Future<void> _verifyUserLogin() async {
    final dbService = DatabaseService();
    User? user = await dbService.getUserByEmailAndPassword(
        sign_in_emailController.text, sign_in_passwordController.text);

    if (user != null) {
      widget.onVerified(0);
      print("Usuario verificado con éxito!");
    } else {
      _showErrorDialog();
    }
  }

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

  Future<void> _addUser() async {
    final dbService = DatabaseService();
    dbService.insertUser(User(
        Fname: firstNameController.text,
        Sname: middleNameController.text,
        FLname: firstLastNameController.text,
        SLname: secondLastNameController.text,
        Pnumber: int.parse(telController.text),
        email: emailController.text,
        upassword: passwordController.text));
  }

  Future<void> _printValues() async {
    print(sign_in_emailController.text);
    print(sign_in_passwordController.text);
  }

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

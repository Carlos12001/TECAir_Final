import 'package:flutter/material.dart';

class Profile extends StatefulWidget {
  const Profile({Key? key}) : super(key: key);

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
              Text(
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
                  padding: const EdgeInsets.all(10.0),
                  child: UserInfoBox(),
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
    universityController.dispose();
    studentIDController.dispose();
    milesController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.all(16.0),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16.0),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.1),
            spreadRadius: 10,
            blurRadius: 5,
            offset: Offset(5, 5),
          ),
        ],
      ),
      child: SingleChildScrollView(
        child: Column(
          children: [
            readOnlyTextField("First Name", firstNameController),
            readOnlyTextField("Middle Name", middleNameController),
            Row(
              children: [
                Expanded(
                    child: readOnlyTextField(
                        "First Lastname", firstLastNameController)),
                SizedBox(width: 16.0),
                Expanded(
                    child: readOnlyTextField(
                        "Second Lastname", secondLastNameController)),
              ],
            ),
            readOnlyTextField("Tel", telController),
            readOnlyTextField("Email", emailController),
            readOnlyTextField("Universidad", universityController),
            Row(
              children: [
                Expanded(
                    child: readOnlyTextField(
                        "ID de Estudiante", studentIDController)),
                SizedBox(width: 16.0),
                Expanded(child: readOnlyTextField("Millas", milesController)),
              ],
            ),
            ElevatedButton(
              onPressed: _printValues,
              child: Text("Print Values"),
            )
          ],
        ),
      ),
    );
  }

  void _printValues() {
    print("First Name: ${firstNameController.text}");
    print("Middle Name: ${middleNameController.text}");
    print("First Lastname: ${firstLastNameController.text}");
    print("Second Lastname: ${secondLastNameController.text}");
    print("Tel: ${telController.text}");
    print("Email: ${emailController.text}");
    print("Universidad: ${universityController.text}");
    print("ID de Estudiante: ${studentIDController.text}");
    print("Millas: ${milesController.text}");
  }

  Widget readOnlyTextField(String title, TextEditingController controller) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 8.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(title, style: TextStyle(fontWeight: FontWeight.bold)),
          SizedBox(height: 4.0),
          TextField(
            controller: controller,
            decoration: InputDecoration(
              filled: true,
              fillColor: Colors.grey[200],
              border: OutlineInputBorder(),
            ),
          ),
        ],
      ),
    );
  }
}

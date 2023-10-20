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
          ))),
    );
  }
}

class UserInfoBox extends StatelessWidget {
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
            mainAxisSize: MainAxisSize.min,
            children: [
              readOnlyTextField("First Name", "Pedro"),
              readOnlyTextField("Middle Name", ""),
              Row(
                children: [
                  Expanded(
                      child: readOnlyTextField("First Lastname", "Gutierrez")),
                  SizedBox(width: 16.0),
                  Expanded(
                      child: readOnlyTextField("Second Lastname", "Garcia")),
                ],
              ),
              readOnlyTextField("Tel", "86431346"),
              readOnlyTextField("Email", "pedrog@gmail.com"),
              readOnlyTextField("Universidad", "Tec"),
              Row(
                children: [
                  Expanded(
                      child: readOnlyTextField("ID de Estudiante", "123456")),
                  SizedBox(width: 16.0),
                  Expanded(child: readOnlyTextField("Millas", "580")),
                ],
              ),
            ],
          ),
        ));
  }

  Widget readOnlyTextField(String title, String value) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 8.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(title, style: TextStyle(fontWeight: FontWeight.bold)),
          SizedBox(height: 4.0),
          TextField(
            controller: TextEditingController(text: value),
            decoration: InputDecoration(
              filled: true,
              fillColor: Colors.grey[200],
              border: OutlineInputBorder(),
            ),
            enabled: false, // Makes it read-only
          ),
        ],
      ),
    );
  }
}

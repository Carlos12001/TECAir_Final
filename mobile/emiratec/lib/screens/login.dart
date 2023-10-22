import 'package:flutter/material.dart';

/// The Login class is a StatefulWidget in Dart.
class Login extends StatefulWidget {
  const Login({Key? key}) : super(key: key);

  @override
  State<Login> createState() => LoginState();
}

/// The LoginState class represents the state of the Login widget and contains the UI elements for the
/// login screen.
class LoginState extends State<Login> {
  double opacity = 0;
  static final loginController = TextEditingController();
  static final passwordController = TextEditingController();

  callback(double newOpacity) {
    setState(() {
      opacity = newOpacity;
    });
  }

  @override
  Widget build(BuildContext context) {
    //SizeConfig().init(context);

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
        child: const Center(
          child: Padding(
            padding: EdgeInsets.symmetric(
                horizontal: 40.0), // Add padding to left and right
            child: Column(
              mainAxisAlignment:
                  MainAxisAlignment.center, // center everything vertically
              children: [
                Text(
                  'Welcome to',
                  textAlign: TextAlign.left,
                  style: TextStyle(
                    color: Color.fromRGBO(174, 254, 255, 1),
                    fontSize: 20.0,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                Text(
                  'TecAir!',
                  textAlign: TextAlign.left,
                  style: TextStyle(
                    color: Colors.white,
                    fontSize: 50.0,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                SizedBox(height: 50.0),
                FloatingLoginBox(),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

/// The FloatingLoginBox class is a StatefulWidget in Dart that represents a floating login box.
class FloatingLoginBox extends StatefulWidget {
  const FloatingLoginBox({super.key});

  @override
  _FloatingLoginBoxState createState() => _FloatingLoginBoxState();
}

/// The `_FloatingLoginBoxState` class is a stateful widget that represents a floating login box with
/// email and password text fields, and login and sign-in buttons.
class _FloatingLoginBoxState extends State<FloatingLoginBox> {
  TextEditingController emailController = TextEditingController();
  TextEditingController passwordController = TextEditingController();

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
            spreadRadius: 5,
            blurRadius: 7,
            offset: const Offset(0, 3),
          ),
        ],
      ),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          TextField(
            controller: emailController,
            decoration: const InputDecoration(
              labelText: 'Email',
              border: OutlineInputBorder(),
            ),
          ),
          const SizedBox(height: 16.0),
          TextField(
            controller: passwordController,
            obscureText: true,
            decoration: const InputDecoration(
              labelText: 'Password',
              border: OutlineInputBorder(),
            ),
          ),
          const SizedBox(height: 16.0),
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              const SizedBox(width: 15.0),
              Expanded(
                child: ElevatedButton(
                  onPressed: () {},
                  style: ElevatedButton.styleFrom(backgroundColor: Colors.blue),
                  child: const Text('Login'),
                ),
              ),
              const SizedBox(width: 30.0),
              Expanded(
                child: ElevatedButton(
                  onPressed: () {
                    // Code for signing in can be added here.
                  },
                  style: ElevatedButton.styleFrom(backgroundColor: Colors.blue),
                  child: const Text('Sign In'),
                ),
              ),
              const SizedBox(width: 15.0),
            ],
          ),
        ],
      ),
    );
  }
}

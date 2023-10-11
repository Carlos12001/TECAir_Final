import 'package:emiratec/ads_home_page.dart';
import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Emiratec mobile',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(
          primary: const Color(0xFFC42F17),
          seedColor: Colors.amber,
        ),
        useMaterial3: true,
      ),
      home: const MyHomePage(title: 'Emiratec'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({super.key, required this.title});

  final String title;

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  int _selectedIndex = 1;

  /// The function updates the selected index and triggers a state change.
  ///
  /// Args:
  ///   index (int): The index parameter represents the index of the item that was tapped. It is used to
  /// update the _selectedIndex variable, which is typically used to keep track of the currently selected
  /// item in a list or menu.
  void _onItemTapped(int index) {
    setState(() {
      _selectedIndex = index;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF222222),
      appBar: AppBar(
        backgroundColor: Theme.of(context).colorScheme.primary,
        title: Center(
            child: Text(
          widget.title,
          style: const TextStyle(color: Color(0xFFfdfcfc)),
        )),
      ),
      bottomNavigationBar: homeNavigationBar(),
      body: <Widget>[
        homePage(),
        //locationPage(cinemas),
        Container(
          color: Color(0xFF222222),
          alignment: Alignment.center,
          child: const Text(
            'reservar...',
            style: TextStyle(fontSize: 30, color: Color(0xFFfdfcfc)),
          ),
        ),
        Container(
          color: Color(0xFF222222),
          alignment: Alignment.center,
          child: const Text(
            'mis viajes...',
            style: TextStyle(fontSize: 30, color: Color(0xFFfdfcfc)),
          ),
        ),
        Container(
          color: Color(0xFF222222),
          alignment: Alignment.center,
          child: const Text(
            'perfil...',
            style: TextStyle(fontSize: 30, color: Color(0xFFfdfcfc)),
          ),
        ),
      ][_selectedIndex],
    );
  }

   Column homePage() {
    return Column(
      //crossAxisAlignment: CrossAxisAlignment.stretch,
      mainAxisAlignment: MainAxisAlignment.start,
      children: <Widget>[
        adsHomePage(),
        Container(
          color: const Color(0xFF404040),
          child: const Center(
              child: Text(
            "Promociones",
            style: TextStyle(
              fontSize: 24.0, // TODO hacer constantes globales
              color: Colors.white,
            ),
          )),
        ),
        // TODO hacer un listview para mostrar una lista de objetos promociones
      ],
    );
  }

  BottomNavigationBar homeNavigationBar() {
    return BottomNavigationBar(
      type: BottomNavigationBarType.fixed,
      backgroundColor: const Color(0xFF222222),
      items: const <BottomNavigationBarItem>[
        BottomNavigationBarItem(
          icon: Icon(Icons.home),
          label: 'Inicio',
          activeIcon: Icon(Icons.home, color: Colors.red),
        ),
        BottomNavigationBarItem(
          icon: Icon(Icons.airplanemode_active),
          label: "Reservar",
          activeIcon: Icon(Icons.airplanemode_active, color: Colors.red),
        ),
        BottomNavigationBarItem(
          icon: Icon(Icons.airplane_ticket),
          label: "Mis viajes",
          activeIcon:
              Icon(Icons.airplane_ticket, color: Colors.red),
        ),
        BottomNavigationBarItem(
          icon: Icon(Icons.person),
          label: "Perfil",
          activeIcon:
              Icon(Icons.person, color: Colors.red),
        ),
      ],
      currentIndex: _selectedIndex,
      selectedItemColor: Colors.red, // Color de la letra cuando está activo
      unselectedItemColor:
          Colors.white, // Color de la letra cuando no está activo
      onTap: _onItemTapped,
    );
  }
}


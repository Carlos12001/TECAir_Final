import 'dart:ffi';

import 'package:emiratec/BD/database_service.dart';
import 'package:emiratec/components/ads_home_page.dart';
import 'package:emiratec/components/class_selection.dart';
import 'package:emiratec/components/promotions_home_page.dart';
import 'package:emiratec/components/reservation_page.dart';
import 'package:emiratec/objects/promotion.dart';
import 'package:emiratec/screens/scheduled.dart';
import 'package:flutter/material.dart';

import 'package:emiratec/screens/login.dart';
import 'package:emiratec/screens/profile.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'TecAir mobile',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(
          primary: const Color(0xFFC42F17),
          seedColor: Colors.black,
        ),
        useMaterial3: true,
      ),
      home: const MyHomePage(title: 'Emiratec'),
      //home: Login(),
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
  int _selectedIndex = 3;
  DateTime now1 = DateTime.now();
  String? selectedOrigin;
  List<String> origins = [
    'Origen 1',
    'Origen 2',
    'Origen 3'
  ]; // Tus valores de origen

  String? selectedDestination;
  List<String> destinations = ['Destino 1', 'Destino 2', 'Destino 3'];
  DateTime fechaInicio = DateTime.now();
  DateTime fechaFin = DateTime.now();
  int cantPasajeros = 1;
  classSelection seatSelection = classSelection();
  final dbService = DatabaseService();


  // Ejemplo de lista promocion
  // TODO: obtener de la BD la lista de promociones
  List<Promotion> promo = [
    Promotion(
        startDate: DateTime.utc(2023, 02, 9),
        endDate: DateTime.utc(2023, 04, 9),
        imgPath:
            "https://i0.wp.com/www.ofertasahora.com/wp-content/uploads/2016/02/Promociones-de-san-valentin-2016-para-viajar-en-avianca.jpg?fit=1428%2C1815&ssl=1",
        percentage: 10.5)
  ];

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

  _insertPromotion() async {
      final promotion = Promotion(
        startDate: DateTime.now(),
        endDate: DateTime.now().add(Duration(days: 10)),
        imgPath: "/path/to/image.jpg",
        percentage: 15.0,
      );
      await dbService.insertPromotion(promotion);
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
        homePage(promo),
        flightSearchBar(),
        Scheduled(),
        Profile()
      ][_selectedIndex],
    );
  }

  Container flightSearchBar() {
    return Container(
      color: const Color(0xFF222222),
      padding: const EdgeInsets.all(8),
      child: Column(
        children: [
          const Text(
            'Buscar vuelos',
            style: TextStyle(fontSize: 20, color: Color(0xFFfdfcfc)),
          ),
          Container(
            color: Colors.grey[400],
            child: Column(
              children: [
                IntrinsicHeight(
                  child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                      children: [
                        Column(
                          children: [
                            const Text("Desde"),
                            DropdownButton<String>(
                              value: selectedOrigin,
                              hint: const Text("Origen"),
                              items: origins.map((String value) {
                                return DropdownMenuItem<String>(
                                  value: value,
                                  child: Text(value),
                                );
                              }).toList(),
                              onChanged: (String? newValue) {
                                setState(() {
                                  selectedOrigin = newValue;
                                });
                              },
                            ),
                          ],
                        ),
                        const VerticalDivider(
                          color: Colors.grey,
                          thickness: 2,
                        ),
                        Column(
                          children: [
                            const Text("A"),
                            DropdownButton<String>(
                              value: selectedDestination,
                              hint: const Text("Destino"),
                              items: destinations.map((String value) {
                                return DropdownMenuItem<String>(
                                  value: value,
                                  child: Text(value),
                                );
                              }).toList(),
                              onChanged: (String? newValue) {
                                setState(() {
                                  selectedDestination = newValue;
                                });
                              },
                            ),
                          ],
                        )
                      ]),
                ),
                const Divider(
                  color: Colors.grey,
                  thickness: 2,
                ),
                const Text(
                  "Seleccione el tipo de asiento",
                  style: TextStyle(fontSize: 18),
                ),
                seatSelection,
              ],
            ),
          ),
          ElevatedButton(
            onPressed: () {
              if (selectedOrigin != null && selectedDestination != null) {
                _insertPromotion();
                Navigator.push(
                  context,
                  MaterialPageRoute(
                      builder: (context) => reservationPage(
                          title: "Reservación",
                          origin: selectedOrigin!,
                          destination: selectedDestination!,
                          seatType_: seatSelection.getType()!)),
                );
              }
            },
            child: const Text("Buscar"),
          ),
        ],
      ),
    );
  }

  Column homePage(List<Promotion> promoss) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      mainAxisAlignment: MainAxisAlignment.start,
      children: <Widget>[
        adsHomePage(),
        const Divider(),
        promotionsHomePage(promoss),
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
          activeIcon: Icon(Icons.airplane_ticket, color: Colors.red),
        ),
        BottomNavigationBarItem(
          icon: Icon(Icons.person),
          label: "Perfil",
          activeIcon: Icon(Icons.person, color: Colors.red),
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

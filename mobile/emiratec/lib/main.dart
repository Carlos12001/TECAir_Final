import 'package:emiratec/components/ads_home_page.dart';
import 'package:emiratec/components/promotions_home_page.dart';
import 'package:emiratec/objects/promotion.dart';
import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Emiratec mobile',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(
          primary: const Color(0xFFC42F17),
          seedColor: Colors.black,
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
  int _selectedIndex = 0;
  DateTime now1 = DateTime.now();

  // Ejemplo de lista promocion
  // TODO: obtener de la BD la lista de promociones
  List<promotion> promo = [
    promotion(
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
        Container(
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
                child: const Column(
                  children: [
                    IntrinsicHeight(
                      child: Row(
                          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                          children: [
                            Column(
                              children: [
                                Text("Desde"),
                                Text("Seleccionar origen")
                              ],
                            ),
                            VerticalDivider(
                              color: Colors.grey,
                              thickness: 2,
                            ),
                            Column(
                              children: [
                                Text("A"),
                                Text("Seleccionar destino")
                              ],
                            )
                          ]),
                    ),
                    Divider(
                      color: Colors.grey,
                      thickness: 2,
                    ),
                    IntrinsicHeight(
                      child: Row(
                          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                          children: [
                            Column(
                              children: [
                                Text("Fecha ida"),
                                Text("Seleccionar fecha")
                              ],
                            ),
                            VerticalDivider(
                              color: Colors.grey,
                              thickness: 2,
                            ),
                            Column(
                              children: [
                                Text("Fecha llegada"),
                                Text("Seleccionar fecha")
                              ],
                            )
                          ]),
                    ),
                    Divider(
                      color: Colors.grey,
                      thickness: 2,
                    ),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                      children: [
                        Column(
                          children: [
                            Text("Cantidad de pasajeros"),
                            Text("1 adulto")
                          ],
                        ),
                      ],
                    )
                  ],
                ),
              ),
              ElevatedButton(
                onPressed: () {},
                child: const Text("Buscar"),
              ),
            ],
          ),
        ),
        Container(
          color: const Color(0xFF222222),
          alignment: Alignment.center,
          child: const Text(
            'mis viajes...',
            style: TextStyle(fontSize: 30, color: Color(0xFFfdfcfc)),
          ),
        ),
        Container(
          color: const Color(0xFF222222),
          alignment: Alignment.center,
          child: const Text(
            'perfil...',
            style: TextStyle(fontSize: 30, color: Color(0xFFfdfcfc)),
          ),
        ),
      ][_selectedIndex],
    );
  }

  Column homePage(List<promotion> promoss) {
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

import 'package:emiratec/BD/database_service.dart';
import 'package:emiratec/components/class_selection.dart';
import 'package:emiratec/globals.dart';
import 'package:emiratec/objects/flight.dart';
import 'package:emiratec/objects/promotion.dart';
import 'package:flutter/material.dart';

class FlightDetailsPage extends StatefulWidget {
  final Flight reservedflight;
  final seatType seatType__;

  FlightDetailsPage({required this.reservedflight, required this.seatType__});

  @override
  _FlightDetailsPageState createState() => _FlightDetailsPageState();
}

class _FlightDetailsPageState extends State<FlightDetailsPage> {
  late TextEditingController _controller;
  late TextEditingController _controllerSC;
  late TextEditingController _controllerDate;
  late TextEditingController _controllerTitular;

  @override
  void initState() {
    super.initState();
    _controller = TextEditingController();
    _controllerSC = TextEditingController();
    _controllerDate = TextEditingController();
    _controllerTitular = TextEditingController();
  }

  @override
  void dispose() {
    _controller.dispose();
    _controllerDate.dispose();
    _controllerSC.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    // Obtiene el tamaño de la pantalla
    var screenSize = MediaQuery.of(context).size;

    // Decide el padding basado en la orientación
    final double paddingValue = screenSize.width > 600 ? 32.0 : 16.0;

    return Scaffold(
      appBar: AppBar(
        title: const Center(child: Text("Detalles del Vuelo")),
      ),
      body: LayoutBuilder(
        builder: (context, constraints) {
          return SingleChildScrollView(
            child: Padding(
              padding: EdgeInsets.all(paddingValue),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.center,
                children: <Widget>[
                  Image.network(widget.reservedflight
                      .stoImage), // Usa Image.network si es una URL

                  Text("Fecha: ${widget.reservedflight.fdate}"),
                  Text("Ciudad salida: ${widget.reservedflight.sfromCity}"),
                  Text("Ciudad llegada: ${widget.reservedflight.stoCity}"),
                  Text("No. de vuelo: ${widget.reservedflight.fNumber}"),
                  Text("Precio: \$${widget.reservedflight.fPrice}"),
                  Text("Tipo de asiento: ${widget.seatType__.name}"),
                  const Divider(),
                  readOnlyTextField('Nombre del titular', _controllerTitular),
                  readOnlyTextField(
                      'Numero de tarjeta de crédito', _controller),
                  readOnlyTextField('Código de seguridad', _controllerSC),
                  readOnlyTextField('Fecha de caducidad', _controllerDate),

                  const SizedBox(height: 20.0),
                  ElevatedButton(
                    onPressed: () async {
                      try {
  
                        // Llamando al método insertIntoPassenger de DatabaseService
                        await DatabaseService()
                            .insertIntoPassenger(globalUser, widget.reservedflight.fNumber.toString());
                        await DatabaseService().insertIntoUserStop(globalUser, widget.reservedflight.fNumber.toString());
                        await DatabaseService().updateStudentMiles(globalUser);
                        print("reservado con exito");
                      } catch (error) {
                        // Si hay un error, lo mostramos
                        ScaffoldMessenger.of(context).showSnackBar(SnackBar(
                            content: Text(
                                'Error al registrar el pasajero: $error')));
                      }
                    },
                    child: const Text("Reservar"),
                  )
                ],
              ),
            ),
          );
        },
      ),
    );
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

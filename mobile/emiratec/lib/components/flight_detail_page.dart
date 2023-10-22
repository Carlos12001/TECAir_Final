import 'package:emiratec/BD/database_service.dart';
import 'package:emiratec/components/class_selection.dart';
import 'package:emiratec/globals.dart';
import 'package:emiratec/objects/flight.dart';
import 'package:emiratec/objects/promotion.dart';
import 'package:flutter/material.dart';
/// The `FlightDetailsPage` class is a stateful widget that displays the details of a reserved flight
/// and the selected seat type.

class FlightDetailsPage extends StatefulWidget {
  final Flight reservedflight;
  final seatType seatType__;

  FlightDetailsPage({required this.reservedflight, required this.seatType__});

  @override
  _FlightDetailsPageState createState() => _FlightDetailsPageState();
}

/// The `_FlightDetailsPageState` class is a stateful widget that displays flight details and allows the
/// user to make a reservation by filling in their personal information.
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
                      .stoImage),

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
                        if (_controllerTitular.text.isNotEmpty &&
                            _controllerDate.text.isNotEmpty &&
                            _controller.text.isNotEmpty &&
                            _controllerSC.text.isNotEmpty &&
                            globalUser.isNotEmpty) {
                          // Llamando al método insertIntoPassenger de DatabaseService
                          await DatabaseService().insertIntoPassenger(
                              globalUser,
                              widget.reservedflight.fNumber.toString());
                          await DatabaseService().insertIntoUserStop(globalUser,
                              widget.reservedflight.fNumber.toString());
                          await DatabaseService()
                              .updateStudentMiles(globalUser);
                          print("reservado con exito");
                        }
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

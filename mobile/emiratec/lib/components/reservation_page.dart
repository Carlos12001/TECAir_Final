import 'package:emiratec/components/class_selection.dart';
import 'package:emiratec/components/flights_listview.dart';
import 'package:emiratec/objects/flight.dart';
import 'package:flutter/material.dart';

/// The `reservationPage` class is a stateful widget that displays the details of a movie, including its
/// title and information about the movie itself.
class reservationPage extends StatefulWidget {
  reservationPage(
      {super.key,
      required this.title,
      required this.origin,
      required this.destination,
      required this.seatType_,
      required this.availableFlights});

  final String title;
  final String origin;
  final String destination;
  final seatType seatType_;
  List<Flight> availableFlights;

  @override
  State<reservationPage> createState() => _reservationPageState();
}

/// The `_reservationPageState` class is responsible for displaying movie details and allowing the user to
/// select a showtime and proceed to seat selection.
class _reservationPageState extends State<reservationPage> {
  // TODO agregar lectura de la BD
  List<String> times = ["10:00", '15:00', '22:00'];
  String? selectedTime;

  /// The `_showErrorDialog` function displays an error dialog with a title, content, and an OK button
  /// that closes the dialog when pressed.
  ///
  /// Args:
  ///   context (BuildContext): The `BuildContext` object represents the location in the widget tree where
  /// the dialog should be shown. It is typically obtained from the `BuildContext` parameter of the
  /// enclosing widget's build method.
  ///
  /// Returns:
  ///   The `_showErrorDialog` function returns an `AlertDialog` widget.
  void _showErrorDialog(BuildContext context) {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: const Text('Error'),
          content: const Text('Por favor selecciona el horario'),
          actions: <Widget>[
            TextButton(
              child: const Text('OK'),
              onPressed: () {
                Navigator.of(context).pop(); // Cierra el diálogo
              },
            ),
          ],
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    //Movie peliculaN = widget.pelicula;
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
      body: Container(
          alignment: Alignment.center,
          child: Column(
            children: [
              // Container(
              //   padding: const EdgeInsets.all(8.0),
              //   child: Row(
              //     mainAxisAlignment: MainAxisAlignment.spaceAround,
              //     children: [
              //       SizedBox(width: 150, height: 170, child: Text("hola")),
              //     ],
              //   ),
              // ),
              Container(
                color: const Color(0xFF404040),
                child: Center(
                    child: Text(
                  "Vuelos ${widget.origin} -> ${widget.destination}",
                  style: TextStyle(
                    fontSize: 18.0, // TODO hacer constantes globales
                    color: Colors.white,
                  ),
                )),
              ),
              //listview de los vueslo que cumplen con las fechas y destinos
              flightListview(widget.availableFlights, widget.seatType_),
            ],
          )),
    );
  }
}

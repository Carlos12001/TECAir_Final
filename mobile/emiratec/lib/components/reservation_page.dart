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
      required this.seatType_,
      required this.availableFlights});

  final String title;
  final seatType seatType_;
  List<Flight> availableFlights;

  @override
  State<reservationPage> createState() => _reservationPageState();
}

/// The `_reservationPageState` class is responsible for displaying movie details and allowing the user to
/// select a showtime and proceed to seat selection.
class _reservationPageState extends State<reservationPage> {

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
           
              //listview de los vueslo que cumplen con las fechas y destinos
              flightListview(widget.availableFlights, widget.seatType_),
            ],
          )),
    );
  }
}

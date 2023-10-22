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

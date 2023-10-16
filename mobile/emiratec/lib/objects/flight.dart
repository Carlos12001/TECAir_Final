
import 'package:emiratec/components/class_selection.dart';

/// The `flight` class in Dart represents a flight with properties such as origin, destination, flight
/// number, departure and arrival hours, date, and price.
class flight {
  String origin;
  String destination;
  int noFlight;
  String departureHour;
  String arrivalHour;
  int price;
  DateTime date;
  String? selectedSeat;
  seatType? selectedSeatType;
  // agregar estado


/// The code `flight({ ... })` is a constructor for the `flight` class in Dart. It is used to create a
/// new instance of the `flight` class with the specified parameters.
  flight({
    required this.origin,
    required this.destination,
    required this.noFlight,
    required this.arrivalHour,
    required this.departureHour,
    required this.date,
    required this.price
  });
}
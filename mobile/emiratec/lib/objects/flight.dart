import 'package:emiratec/components/class_selection.dart';

class Flight {
  String origin;
  String destination;
  int noFlight;
  String departureHour;
  String arrivalHour;
  int price;
  DateTime date;
  String? selectedSeat;
  seatType? selectedSeatType;

  Flight({
    required this.origin,
    required this.destination,
    required this.noFlight,
    required this.arrivalHour,
    required this.departureHour,
    required this.date,
    required this.price,
  });

  // Convertir un objeto Flight a un Map
  Map<String, dynamic> toMap() {
    return {
      'Ffrom': origin,
      'Fto': destination,
      'Fnumber': noFlight,
      'departureHour': departureHour,
      'arrivalHour': arrivalHour,
      'Price': price,
      'Fdate': date.toIso8601String(),
      'selectedSeat': selectedSeat,
      'selectedSeatType': selectedSeatType?.toString()
    };
  }

  // Convertir un Map a un objeto Flight
  static Flight fromMap(Map<String, dynamic> map) {
    return Flight(
      origin: map['origin'],
      destination: map['destination'],
      noFlight: map['noFlight'],
      departureHour: map['departureHour'],
      arrivalHour: map['arrivalHour'],
      date: DateTime.parse(map['date']),
      price: map['price'],
    )..selectedSeat = map['selectedSeat']
     ..selectedSeatType = map['selectedSeatType'] != null ? seatType.values.firstWhere((e) => e.toString() == map['selectedSeatType']) : null;
  }
}

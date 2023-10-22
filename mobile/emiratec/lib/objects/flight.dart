import 'package:emiratec/components/class_selection.dart';

/// The Flight class represents a flight with various properties such as flight number, cities, image,
/// date, price, selected seat, and selected seat type.
class Flight {
  String sfromCity;
  String stoCity;
  String stoImage;
  int fNumber;
  DateTime fdate;
  int fPrice;
  String? selectedSeat;
  seatType? selectedSeatType;

  /// The code snippet is defining a constructor for the `Flight` class. The constructor takes in several
  /// required parameters (`fNumber`, `sfromCity`, `stoCity`, `stoImage`, `fdate`, `fPrice`) and
  /// initializes the corresponding instance variables with the provided values. The `required` keyword
  /// indicates that these parameters must be provided when creating an instance of the `Flight` class.
  Flight({
    required this.fNumber,
    required this.sfromCity,
    required this.stoCity,
    required this.stoImage,
    required this.fdate,
    required this.fPrice,
  });

  // Convertir un Map a un objeto Flight
  /// The function `fromMap` takes a map as input and returns a Flight object with properties initialized
  /// from the values in the map.
  ///
  /// Args:
  ///   map (Map<String, dynamic>): A map containing key-value pairs where the keys are strings and the
  /// values can be of any type.
  ///
  /// Returns:
  ///   a Flight object.
  static Flight fromMap(Map<String, dynamic> map) {
    return Flight(
      fNumber: map['Fnumber'],
      sfromCity: map['sfromCity'],
      stoCity: map['StoCity'],
      stoImage: map['StoImage'],
      fdate: DateTime.parse(map['fdate']),
      fPrice: map['Fprice'],
    )
      ..selectedSeat = map['selectedSeat']
      ..selectedSeatType = map['selectedSeatType'] != null
          ? seatType.values
              .firstWhere((e) => e.toString() == map['selectedSeatType'])
          : null;
  }
}

/// The `Layover` class represents a layover in a travel itinerary, with properties for the origin,
/// destination, date, departure hour, and arrival hour.
class Layover {
  int? id; // Identificador para la escala
  String origin;
  String destination;
  DateTime date;
  String departureHour;
  String arrivalHour;

  /// The `Layover` class has a constructor that takes in several parameters.
  Layover({
    this.id,
    required this.origin,
    required this.destination,
    required this.arrivalHour,
    required this.date,
    required this.departureHour,
  });

  // Convertir un objeto Layover a un Map
  /// The function converts an object into a map with string keys and dynamic values.
  ///
  /// Returns:
  ///   The method is returning a Map<String, dynamic> object.
  Map<String, dynamic> toMap() {
    return {
      'id': id,
      'origin': origin,
      'destination': destination,
      'departureHour': departureHour,
      'arrivalHour': arrivalHour,
      'date': date.toIso8601String(),
    };
  }

  // Convertir un Map a un objeto Layover
  /// The function `fromMap` takes a map and returns a `Layover` object with the values from the map.
  ///
  /// Args:
  ///   map (Map<String, dynamic>): A map containing key-value pairs where the keys are strings and the
  /// values can be of any type.
  ///
  /// Returns:
  ///   an instance of the Layover class.
  static Layover fromMap(Map<String, dynamic> map) {
    return Layover(
      id: map['id'],
      origin: map['origin'],
      destination: map['destination'],
      departureHour: map['departureHour'],
      arrivalHour: map['arrivalHour'],
      date: DateTime.parse(map['date']),
    );
  }
}

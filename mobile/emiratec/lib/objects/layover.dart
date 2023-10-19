
class Layover {
  int? id;  // Identificador para la escala
  String origin;
  String destination;
  DateTime date;
  String departureHour;
  String arrivalHour;

  Layover({
    this.id,
    required this.origin,
    required this.destination,
    required this.arrivalHour,
    required this.date,
    required this.departureHour,
  });

  // Convertir un objeto Layover a un Map
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

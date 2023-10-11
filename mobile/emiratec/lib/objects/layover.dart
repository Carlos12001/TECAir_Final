
/// The `layover` class represents a layover in a flight itinerary and has properties for the origin,
/// destination, arrival hour, date, and departure hour.
class layover {
  String origin;
  String destination;
  DateTime date;
  String departureHour;
  String arrivalHour;
  // agregar id escala, preguntar el tipo 

/// The `layover` class has a constructor that takes in several required parameters: `origin`,
/// `destination`, `arrivalHour`, `date`, and `departureHour`.
  layover({
    required this.origin,
    required this.destination,
    required this.arrivalHour,
    required this.date,
    required this.departureHour
  });
}
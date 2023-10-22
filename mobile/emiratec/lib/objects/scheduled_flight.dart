/// The `ScheduledFlight` class represents a scheduled flight with properties such as flight number,
/// date and time, origin, and destination.
class ScheduledFlight {
  final String flightNumber;
  final DateTime dateTime;
  final String origin;
  final String destination;

  /// The code `ScheduledFlight({ ... })` is defining a constructor for the `ScheduledFlight` class.
  ScheduledFlight({
    required this.flightNumber,
    required this.dateTime,
    required this.origin,
    required this.destination,
  });
}

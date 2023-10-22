import 'package:emiratec/objects/scheduled_flight.dart';
import 'package:flutter/material.dart';

class Scheduled extends StatefulWidget {
  const Scheduled({Key? key}) : super(key: key);

  @override
  State<Scheduled> createState() => ScheduledState();
}

class ScheduledState extends State<Scheduled> {
  final key = GlobalKey();
  List<ScheduledFlight> scheduledFlights = [];
  double opacity = 0;

  callback(double newOpacity) {
    setState(() {
      opacity = newOpacity;
    });
  }

  // Create a FlightSchedule instance
  ScheduledFlight newFlight = ScheduledFlight(
    flightNumber: "FL1234",
    dateTime: DateTime.now(),
    origin: "SJO, Costa Rica",
    destination: "Miami, USA",
  );

  @override
  Widget build(BuildContext context) {
    addScheduledFlight(newFlight);
    //SizeConfig().init(context);

    return ListView.builder(
      itemCount: scheduledFlights.length,
      itemBuilder: (context, index) {
        final flight = scheduledFlights[index];
        return Card(
          margin: EdgeInsets.all(10),
          child: Padding(
            padding: const EdgeInsets.all(10.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text("Numero de vuelo: ${flight.flightNumber}"),
                SizedBox(height: 5),
                Text(
                    "Fecha: ${flight.dateTime.toLocal().toIso8601String().split('T')[0]}"),
                SizedBox(height: 5),
                Text(
                    "Hora: ${flight.dateTime.toLocal().toIso8601String().split('T')[1].split('.')[0]}"),
                SizedBox(height: 5),
                Text("Origen: ${flight.origin}"),
                SizedBox(height: 5),
                Text("Destino: ${flight.destination}"),
              ],
            ),
          ),
        );
      },
    );
  }

  void addScheduledFlight(ScheduledFlight flight) {
    setState(() {
      scheduledFlights.add(flight);
    });
  }

// Add the new flight to the list
}

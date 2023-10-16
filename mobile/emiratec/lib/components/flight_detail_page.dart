import 'package:emiratec/components/class_selection.dart';
import 'package:emiratec/objects/flight.dart';
import 'package:emiratec/objects/promotion.dart';
import 'package:flutter/material.dart';

class FlightDetailsPage extends StatelessWidget {
  final flight reservedflight;
  final seatType seatType__;
  String _data = "";

  FlightDetailsPage({required this.reservedflight, required this.seatType__});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Center(child: Text("Detalles del Vuelo")),
      ),
      body: Center(
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.center,
            children: <Widget>[
              Text("Fecha: ${reservedflight.date}"),
              Text("Hora salida: ${reservedflight.departureHour}"),
              Text("Hora llegada: ${reservedflight.arrivalHour}"),
              Text("No. de vuelo: ${reservedflight.noFlight}"),
              Text("Precio: \$${reservedflight.price}"),
              Text("Tipo de asiento: ${seatType__.name}"),
              Spacer(),

              ElevatedButton(
                onPressed: () {
                  // Lógica para la acción de "reservar"
                },
                child: Text("Reservar"),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

import 'package:emiratec/objects/flight.dart';
import 'package:emiratec/objects/promotion.dart';
import 'package:flutter/material.dart';

class FlightDetailsPage extends StatelessWidget {
  final flight reservedflight;
  final int cantPasajeros;

  FlightDetailsPage({required this.reservedflight, required this.cantPasajeros});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Detalles del Vuelo"),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: <Widget>[
            Text("Fecha: ${reservedflight.date}"),
            Text("Hora salida: ${reservedflight.departureHour}"),
            Text("Hora llegada: ${reservedflight.arrivalHour}"),
            Text("No. de vuelo: ${reservedflight.noFlight}"),
            Text("Precio: \$${reservedflight.price}"),
            Text("Cantidad pasajeros: ${cantPasajeros}"),
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
    );
  }
}

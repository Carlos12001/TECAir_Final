import 'package:emiratec/components/flight_detail_page.dart';
import 'package:emiratec/objects/flight.dart';
import 'package:emiratec/objects/promotion.dart';
import 'package:flutter/material.dart';

Expanded flightListview(List<flight>? flightList, int cantPasajeros_) {
  return Expanded(
    flex: 4,
    child: FutureBuilder<List<flight>>(
      future: getFlightsList(
          flightList), // Aquí se supone que tendrías una función que retorna Future<List<Movie>>
      builder: (BuildContext context, AsyncSnapshot<List<flight>> snapshot) {
        if (snapshot.connectionState == ConnectionState.waiting) {
          return const Center(
              child:
                  CircularProgressIndicator()); // Muestra un indicador de progreso mientras se espera.
        } else if (snapshot.hasError) {
          return Text(
              'Error: ${snapshot.error}'); // Muestra un mensaje de error si algo sale mal.
        } else {
          List<flight>? flights = snapshot.data;

          return ListView.separated(
            padding: const EdgeInsets.all(8),
            itemCount: flights!.length,
            itemBuilder: (context, index) {
              flight currentFlight = flights[index];

              return InkWell(
                // Lógica para navegar a la nueva página
                onTap: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (context) =>
                          FlightDetailsPage(reservedflight: currentFlight, cantPasajeros: cantPasajeros_,),
                    ),
                  );
                },

                child: SizedBox(
                  height: 150,
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: <Widget>[
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Expanded(
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.end,
                              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                              children: [
                                Text(
                                  "Fecha: ${currentFlight.date}",
                                  overflow: TextOverflow.clip,
                                  maxLines: 3,
                                  style:
                                      const TextStyle(color: Color(0xFFfdfcfc)),
                                ),
                                Text(
                                  "Hora salida: ${currentFlight.departureHour}",
                                  overflow: TextOverflow.clip,
                                  maxLines: 3,
                                  style:
                                      const TextStyle(color: Color(0xFFfdfcfc)),
                                ),
                                Text(
                                  "Hora llegada: ${currentFlight.arrivalHour}",
                                  overflow: TextOverflow.clip,
                                  maxLines: 3,
                                  style:
                                      const TextStyle(color: Color(0xFFfdfcfc)),
                                ),
                                Text(
                                  "No. de vuelo: ${currentFlight.noFlight}",
                                  overflow: TextOverflow.clip,
                                  maxLines: 3,
                                  style:
                                      const TextStyle(color: Color(0xFFfdfcfc)),
                                ),
                                Text(
                                  "Precio: \$${currentFlight.price}",
                                  overflow: TextOverflow.clip,
                                  maxLines: 3,
                                  style:
                                      const TextStyle(color: Color(0xFFfdfcfc)),
                                ),
                              ],
                            ),
                          ),
                        ],
                      ),
                    ],
                  ),
                ),
              );
            },
            separatorBuilder: (BuildContext context, int index) =>
                const Divider(),
          );
        }
      },
    ),
  );
}

Future<List<flight>> getFlightsList(List<flight>? flightList) async {
  if (flightList != null) {
    return flightList;
  } else {
    return [];
  }
}

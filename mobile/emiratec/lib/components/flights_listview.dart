import 'package:emiratec/components/class_selection.dart';
import 'package:emiratec/components/flight_detail_page.dart';
import 'package:emiratec/objects/flight.dart';
import 'package:emiratec/objects/promotion.dart';
import 'package:flutter/material.dart';

/// The function expands a flight list view based on the seat type.
///
/// Args:
///   flightList (List<Flight>): A list of Flight objects. Each Flight object represents a flight with
/// various properties such as flight number, departure time, arrival time, etc.
///   seatType_ (seatType): The seatType_ parameter is a variable of type seatType, which represents the
/// type of seat that the user wants to filter the flight list by.

Expanded flightListview(List<Flight>? flightList, seatType seatType_) {
  return Expanded(
    flex: 4,
    child: FutureBuilder<List<Flight>>(
      future: getFlightsList(flightList),
      builder: (BuildContext context, AsyncSnapshot<List<Flight>> snapshot) {
        if (snapshot.connectionState == ConnectionState.waiting) {
          return const Center(
              child:
                  CircularProgressIndicator()); // Muestra un indicador de progreso mientras se espera.
        } else if (snapshot.hasError) {
          return Text(
              'Error: ${snapshot.error}'); // Muestra un mensaje de error si algo sale mal.
        } else {
          List<Flight>? flights = snapshot.data;

          return ListView.separated(
            padding: const EdgeInsets.all(8),
            itemCount: flights!.length,
            itemBuilder: (context, index) {
              Flight currentFlight = flights[index];

              return InkWell(
                // Lógica para navegar a la nueva página
                onTap: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (context) => FlightDetailsPage(
                        reservedflight: currentFlight,
                        seatType__: seatType_,
                      ),
                    ),
                  );
                },

                child: SizedBox(
                  height: 250,
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: <Widget>[
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Expanded(
                            flex: 1,
                            child: Image.network(currentFlight.stoImage),
                          ),
                          Expanded(
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                              children: [
                                Text(
                                  "Fecha: ${currentFlight.fdate}",
                                  overflow: TextOverflow.clip,
                                  maxLines: 3,
                                  style:
                                      const TextStyle(color: Color(0xFFfdfcfc)),
                                ),
                                Text(
                                  "Ciudad de salida: ${currentFlight.sfromCity}",
                                  overflow: TextOverflow.clip,
                                  maxLines: 3,
                                  style:
                                      const TextStyle(color: Color(0xFFfdfcfc)),
                                ),
                                Text(
                                  "Ciudad de llegada: ${currentFlight.stoCity}",
                                  overflow: TextOverflow.clip,
                                  maxLines: 3,
                                  style:
                                      const TextStyle(color: Color(0xFFfdfcfc)),
                                ),
                                Text(
                                  "No. de vuelo: ${currentFlight.fNumber}",
                                  overflow: TextOverflow.clip,
                                  maxLines: 3,
                                  style:
                                      const TextStyle(color: Color(0xFFfdfcfc)),
                                ),
                                Text(
                                  "Precio: \$${currentFlight.fPrice}",
                                  overflow: TextOverflow.clip,
                                  maxLines: 3,
                                  style:
                                      const TextStyle(color: Color(0xFFfdfcfc)),
                                ),
                                Text(
                                  "Tipo de asiento: ${seatType_.name}",
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

/// The function returns a list of flights, or an empty list if the input flight list is null.
///
/// Args:
///   flightList (List<Flight>): The flightList parameter is a List of Flight objects.
///
/// Returns:
///   a `Future` object that resolves to a `List<Flight>`. If the `flightList` parameter is not null, it
/// will return the `flightList` itself. Otherwise, it will return an empty list `[]`.

Future<List<Flight>> getFlightsList(List<Flight>? flightList) async {
  if (flightList != null) {
    return flightList;
  } else {
    return [];
  }
}

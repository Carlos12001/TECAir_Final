import 'package:emiratec/objects/promotion.dart';
import 'package:flutter/material.dart';

/// The function `promotionsHomePage` returns an `Expanded` widget that displays a list of promotions
/// using a `FutureBuilder` to handle asynchronous data loading.
///
/// Args:
///   promotionList (List<Promotion>): The promotionList parameter is a List of Promotion objects. It is
/// used as the data source for displaying the promotions on the home page.
///
/// Returns:
///   an Expanded widget.

Expanded promotionsHomePage(List<Promotion>? promotionList) {
  return Expanded(
    flex: 4,
    child: FutureBuilder<List<Promotion>>(
      future: getPromotionList(
          promotionList), // Aquí se supone que tendrías una función que retorna Future<List<Movie>>
      builder: (BuildContext context, AsyncSnapshot<List<Promotion>> snapshot) {
        if (snapshot.connectionState == ConnectionState.waiting) {
          return const Center(
              child:
                  CircularProgressIndicator()); // Muestra un indicador de progreso mientras se espera.
        } else if (snapshot.hasError) {
          return Text(
              'Error: ${snapshot.error}'); // Muestra un mensaje de error si algo sale mal.
        } else {
          List<Promotion>? promotions = snapshot.data;

          return ListView.separated(
            padding: const EdgeInsets.all(8),
            itemCount: promotions!.length,
            itemBuilder: (context, index) {
              Promotion currentPromotion = promotions[index];

              return InkWell(
                // Lógica para navegar a la nueva página
                // onTap: () {
                //   // Lógica para navegar a la nueva página
                //   Navigator.push(
                //     context,
                //     MaterialPageRoute(
                //       builder: (context) => MovieDetails(title: "Horarios",
                //           pelicula:
                //               peliculaActual), // Suponiendo que tienes una página llamada DetallePelicula
                //     ),
                //   );
                // },
                child: SizedBox(
                  height: 150,
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: <Widget>[
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          SizedBox(
                            width: 100,
                            height: 120,
                            child: FittedBox(
                                fit: BoxFit.fill,
                                child: Image.network(currentPromotion.imgPath)),
                          ),
                          Expanded(
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.end,
                              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                              children: [
                                Text(
                                  "Origen: ${currentPromotion.originCity}",
                                  overflow: TextOverflow.clip,
                                  maxLines: 3,
                                  style:
                                      const TextStyle(color: Color(0xFFfdfcfc)),
                                ),
                                Text(
                                  "Destino: ${currentPromotion.destinationCity}",
                                  overflow: TextOverflow.clip,
                                  maxLines: 3,
                                  style:
                                      const TextStyle(color: Color(0xFFfdfcfc)),
                                ),
                                Text(
                                  "Porcentaje de descuento: ${currentPromotion.percentage}",
                                  overflow: TextOverflow.clip,
                                  maxLines: 3,
                                  style:
                                      const TextStyle(color: Color(0xFFfdfcfc)),
                                ),
                                Text(
                                  "Fin de promoción: ${currentPromotion.endDate.day}-${currentPromotion.endDate.month}-${currentPromotion.endDate.year}",
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

/// The function returns a list of promotions, or an empty list if the input list is null.
///
/// Args:
///   promotionsList (List<Promotion>): A nullable list of Promotion objects.
///
/// Returns:
///   a `Future` object that resolves to a `List` of `Promotion` objects.
Future<List<Promotion>> getPromotionList(
    List<Promotion>? promotionsList) async {
  if (promotionsList != null) {
    return promotionsList;
  } else {
    return [];
  }
}

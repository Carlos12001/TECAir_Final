import 'package:emiratec/objects/promotion.dart';
import 'package:flutter/material.dart';

Expanded promotionsHomePage(List<promotion>? promotionList) {
  return Expanded(
    flex: 4,
    child: FutureBuilder<List<promotion>>(
      future: getPromotionList(
          promotionList), // Aquí se supone que tendrías una función que retorna Future<List<Movie>>
      builder: (BuildContext context, AsyncSnapshot<List<promotion>> snapshot) {
        if (snapshot.connectionState == ConnectionState.waiting) {
          return const Center(
              child:
                  CircularProgressIndicator()); // Muestra un indicador de progreso mientras se espera.
        } else if (snapshot.hasError) {
          return Text(
              'Error: ${snapshot.error}'); // Muestra un mensaje de error si algo sale mal.
        } else {
          List<promotion>? promotions = snapshot.data;

          return ListView.separated(
            padding: const EdgeInsets.all(8),
            itemCount: promotions!.length,
            itemBuilder: (context, index) {
              promotion currentPromotion = promotions[index];

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
                              crossAxisAlignment:CrossAxisAlignment.end,
                              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                              children: [
                                Text(
                                  "Inicion de promoción: ${currentPromotion.startDate.day}-${currentPromotion.startDate.month}-${currentPromotion.startDate.year}",
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

Future<List<promotion>> getPromotionList(
    List<promotion>? promotionsList) async {
  if (promotionsList != null) {
    return promotionsList;
  } else {
    return [];
  }
}

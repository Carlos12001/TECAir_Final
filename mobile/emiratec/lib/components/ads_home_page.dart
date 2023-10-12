import 'package:flutter/material.dart';
import 'package:carousel_slider/carousel_slider.dart';

/// The `adsHomePage` function returns an expanded widget containing a carousel slider with multiple
/// images.
/// 
/// Returns:
///   an Expanded widget that contains a ListView widget. Inside the ListView, there is a CarouselSlider
/// widget that displays a carousel of images.
Expanded adsHomePage() {
  return Expanded(
    flex: 2,
    child: ListView(
      children: [
        CarouselSlider(
          items: [
            //1ra Imagen
            Container(
              margin: const EdgeInsets.all(2.0),
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(8.0),
                image: const DecorationImage(
                  // se puede cambiar por un networkImage
                  image: AssetImage("lib/resources/dubai.jpg"),
                  fit: BoxFit.cover,
                ),
              ),
            ),

            //2da Imagen
            Container(
              margin: const EdgeInsets.all(2.0),
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(8.0),
                image: const DecorationImage(
                  image: AssetImage("lib/resources/tokio.jpg"),
                  fit: BoxFit.cover,
                ),
              ),
            ),

            //3ra Imagen
            Container(
              margin: const EdgeInsets.all(2.0),
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(8.0),
                image: const DecorationImage(
                  image: AssetImage("lib/resources/mexico.jpg"),
                  fit: BoxFit.cover,
                ),
              ),
            ),

            //4th}a Imagen
            Container(
              margin: const EdgeInsets.all(2.0),
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(8.0),
                image: const DecorationImage(
                  image: AssetImage("lib/resources/maldivas.jpg"),
                  fit: BoxFit.cover,
                ),
              ),
            ),

            //5ta Imagen
            Container(
              margin: const EdgeInsets.all(2.0),
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(8.0),
                image: const DecorationImage(
                  image: AssetImage("lib/resources/bangkok.jpg"),
                  fit: BoxFit.cover,
                ),
              ),
            ),
          ],

          // Configuracion del carrusel de imagenes 
          options: CarouselOptions(
            height: 180.0,
            enlargeCenterPage: true,
            autoPlay: true,
            aspectRatio: 16 / 9,
            autoPlayCurve: Curves.fastOutSlowIn,
            enableInfiniteScroll: true,
            autoPlayAnimationDuration: const Duration(milliseconds: 800),
            //viewportFraction: 1,
          ),
        ),
      ],
    ),
  );
}

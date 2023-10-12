import 'package:flutter/material.dart';

Container flightSearchBar() {
    return Container(
        color: const Color(0xFF222222),
        padding: const EdgeInsets.all(8),
        child: Column(
          children: [
            const Text(
              'Buscar vuelos',
              style: TextStyle(fontSize: 20, color: Color(0xFFfdfcfc)),
            ),
            Container(
              color: Colors.grey[400],
              child: const Column(
                children: [
                  IntrinsicHeight(
                    child: Row(
                        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                        children: [
                          Column(
                            children: [
                              Text("Desde"),
                              Text("Seleccionar origen")
                            ],
                          ),
                          VerticalDivider(
                            color: Colors.grey,
                            thickness: 2,
                          ),
                          Column(
                            children: [
                              Text("A"),
                              Text("Seleccionar destino")
                            ],
                          )
                        ]),
                  ),
                  Divider(
                    color: Colors.grey,
                    thickness: 2,
                  ),
                  IntrinsicHeight(
                    child: Row(
                        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                        children: [
                          Column(
                            children: [
                              Text("Fecha ida"),
                              Text("Seleccionar fecha")
                            ],
                          ),
                          VerticalDivider(
                            color: Colors.grey,
                            thickness: 2,
                          ),
                          Column(
                            children: [
                              Text("Fecha llegada"),
                              Text("Seleccionar fecha")
                            ],
                          )
                        ]),
                  ),
                  Divider(
                    color: Colors.grey,
                    thickness: 2,
                  ),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                    children: [
                      Column(
                        children: [
                          Text("Cantidad de pasajeros"),
                          Text("1 adulto")
                        ],
                      ),
                    ],
                  )
                ],
              ),
            ),
            ElevatedButton(
              onPressed: () {},
              child: const Text("Buscar"),
            ),
          ],
        ),
      );
  }

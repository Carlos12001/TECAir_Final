import 'dart:ffi';

class promotion {
  DateTime startDate;
  DateTime endDate;
  String imgPath;
  double percentage;

  promotion({
    required this.startDate,
    required this.endDate,
    required this.imgPath,
    required this.percentage,
  });

  // TODO hacer un metodo toMap para poder escribir en la BD
}

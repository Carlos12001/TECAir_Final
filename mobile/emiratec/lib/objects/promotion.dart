import 'dart:ffi';

class Promotion {
  DateTime startDate;
  DateTime endDate;
  String imgPath;
  double percentage;

  Promotion({
    required this.startDate,
    required this.endDate,
    required this.imgPath,
    required this.percentage,
  });

  Map<String, dynamic> toMap() {
    return {
      'startDate': startDate.toIso8601String(),  // Convertir DateTime a String
      'endDate': endDate.toIso8601String(),      // Convertir DateTime a String
      'imgPath': imgPath,
      'percentage': percentage,
    };
  }

  // Método fromMap
  static Promotion fromMap(Map<String, dynamic> map) {
    return Promotion(
      startDate: DateTime.parse(map['startDate']),
      endDate: DateTime.parse(map['endDate']),
      imgPath: map['imgPath'],
      percentage: map['percentage'],
    );
  }
}

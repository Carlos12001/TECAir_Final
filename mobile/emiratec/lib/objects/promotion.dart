import 'dart:ffi';

class Promotion {
  //DateTime startDate;
  DateTime endDate;
  String imgPath;
  int percentage;
  int fno;

  Promotion({
    //required this.startDate,
    required this.endDate,
    required this.imgPath,
    required this.percentage,
    required this.fno,
  });

  Map<String, dynamic> toMap() {
    return {
      //'startDate': startDate.toIso8601String(), // Convertir DateTime a String
      'Final_date': endDate.toIso8601String(), // Convertir DateTime a String
      'Image': imgPath,
      'Dpercent': percentage,
      'Fno': fno.toString(),
    };
  }

  // Método fromMap
  static Promotion fromMap(Map<String, dynamic> map) {
    return Promotion(
      //startDate: DateTime.parse(map['startDate']),
      endDate: DateTime.parse(map['Final_date']),
      imgPath: map['Image'],
      percentage: map['Dpercent'],
      fno: map['Fno'],
    );
  }

  static List<Promotion> fromMapList(List<Map<String, dynamic>> mapList) {
    return mapList.map((map) => fromMap(map)).toList();
  }
}

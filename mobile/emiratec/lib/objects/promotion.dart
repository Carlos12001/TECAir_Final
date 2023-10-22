import 'dart:ffi';

class Promotion {
  String originCity;
  String destinationCity;
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
    required this.originCity,
    required this.destinationCity,
  });

  Map<String, dynamic> toMap() {
    return {
      'Final_date': endDate.toIso8601String(), 
      'Image': imgPath,
      'Dpercent': percentage,
      'Fno': fno.toString(),
      'OriginCity': originCity,
      'DestinationCity': destinationCity,
    };
  }

  // Método fromMap
  static Promotion fromMap(Map<String, dynamic> map) {
    return Promotion(
      endDate: DateTime.parse(map['Final_date']),
      imgPath: map['Image'],
      percentage: map['Dpercent'],
      fno: map['Fno'],
      originCity: map['OriginCity'],
      destinationCity: map['DestinationCity']
    );
  }

  static List<Promotion> fromMapList(List<Map<String, dynamic>> mapList) {
    return mapList.map((map) => fromMap(map)).toList();
  }
}

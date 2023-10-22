import 'dart:ffi';

/// The `Promotion` class represents a promotion with details such as origin city, destination city, end
/// date, image path, percentage, and flight number.
class Promotion {
  String originCity;
  String destinationCity;
  DateTime endDate;
  String imgPath;
  int percentage;
  int fno;

  /// The code snippet is defining a constructor for the `Promotion` class. The constructor takes in
  /// several required parameters: `endDate`, `imgPath`, `percentage`, `fno`, `originCity`, and
  /// `destinationCity`. These parameters are used to initialize the corresponding properties of a
  /// `Promotion` object. The `required` keyword indicates that these parameters must be provided when
  /// creating a new `Promotion` object.
  Promotion({
    //required this.startDate,
    required this.endDate,
    required this.imgPath,
    required this.percentage,
    required this.fno,
    required this.originCity,
    required this.destinationCity,
  });

  /// The function `toMap()` converts the given data into a map with specific key-value pairs.
  ///
  /// Returns:
  ///   The method is returning a Map object with keys and values. The keys are 'Final_date', 'Image',
  /// 'Dpercent', 'Fno', 'OriginCity', and 'DestinationCity'. The values are the corresponding properties
  /// of the object, such as endDate.toIso8601String(), imgPath, percentage, fno.toString(), originCity,
  /// and destinationCity.
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
  /// The function `fromMap` takes a map as input and returns a Promotion object with properties
  /// initialized using the values from the map.
  ///
  /// Args:
  ///   map (Map<String, dynamic>): A map containing key-value pairs where the keys are strings and the
  /// values can be of any type.
  ///
  /// Returns:
  ///   an instance of the Promotion class.
  static Promotion fromMap(Map<String, dynamic> map) {
    return Promotion(
        endDate: DateTime.parse(map['Final_date']),
        imgPath: map['Image'],
        percentage: map['Dpercent'],
        fno: map['Fno'],
        originCity: map['OriginCity'],
        destinationCity: map['DestinationCity']);
  }

  /// The function converts a list of maps into a list of Promotion objects.
  ///
  /// Args:
  ///   mapList (List<Map<String, dynamic>>): The parameter `mapList` is a list of maps, where each map
  /// represents a promotion. Each map contains key-value pairs, where the keys are strings and the values
  /// can be of any type.
  ///
  /// Returns:
  ///   The method is returning a List of Promotion objects.
  static List<Promotion> fromMapList(List<Map<String, dynamic>> mapList) {
    return mapList.map((map) => fromMap(map)).toList();
  }
}

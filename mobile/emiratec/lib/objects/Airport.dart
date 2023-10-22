/// The `Airport` class represents an airport with properties such as airport ID, code, city, name, and
/// image.
class Airport {
  int airportID;
  String code;
  String city;
  String aname;
  String image;

  Airport(
      {required this.airportID,
      required this.code,
      required this.city,
      required this.aname,
      required this.image});

  /// The function converts an object's properties into a map with string keys and dynamic values.
  ///
  /// Returns:
  ///   The method `toMap()` is returning a `Map<String, dynamic>` object.
  Map<String, dynamic> toMap() {
    return {
      "AirportID": airportID,
      "Code": code,
      "City": city,
      "Aname": aname,
      "Image": image,
    };
  }

  /// The function "fromMap" takes a map as input and returns an Airport object with hardcoded values for
  /// airportID, code, city, aname, and image.
  ///
  /// Args:
  ///   map (Map<String, dynamic>): A map containing key-value pairs where the keys are strings and the
  /// values can be of any type.
  ///
  /// Returns:
  ///   An instance of the Airport class is being returned.
  static Airport fromMap(Map<String, dynamic> map) {
    return Airport(
        airportID: map['AirportID'],
        code: 'Code',
        city: 'City',
        aname: 'Aname',
        image: 'Image');
  }

  /// The function converts a list of maps into a list of Airport objects.
  ///
  /// Args:
  ///   mapList (List<Map<String, dynamic>>): The parameter `mapList` is a list of maps, where each map
  /// represents an airport. Each map contains key-value pairs, where the keys are strings and the values
  /// can be of any type.
  ///
  /// Returns:
  ///   The method is returning a List of Airport objects.
  static List<Airport> fromMapList(List<Map<String, dynamic>> mapList) {
    return mapList.map((map) => fromMap(map)).toList();
  }
}

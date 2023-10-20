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

  Map<String, dynamic> toMap() {
    return {
      "AirportID": airportID,
      "Code": code,
      "City": city,
      "Aname": aname,
      "Image": image,
    };
  }

  static Airport fromMap(Map<String, dynamic> map) {
    return Airport(
        airportID: map['AirportID'],
        code: 'Code',
        city: 'City',
        aname: 'Aname',
        image: 'Image');
  }

    static List<Airport> fromMapList(List<Map<String, dynamic>> mapList) {
    return mapList.map((map) => fromMap(map)).toList();
  }
}

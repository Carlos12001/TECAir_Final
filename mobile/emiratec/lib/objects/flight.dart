import 'package:emiratec/components/class_selection.dart';

class Flight {
  String sfromCity;
  String stoCity;
  String stoImage;
  int fNumber;
  DateTime fdate;
  int fPrice;
  String? selectedSeat;
  seatType? selectedSeatType;

  Flight({
    required this.fNumber,
    required this.sfromCity,
    required this.stoCity,
    required this.stoImage,
    required this.fdate,
    required this.fPrice,
  });

  // Convertir un Map a un objeto Flight
  static Flight fromMap(Map<String, dynamic> map) {
    return Flight(
      fNumber: map['Fnumber'],
      sfromCity: map['sfromCity'],
      stoCity: map['StoCity'],
      stoImage: map['StoImage'],
      fdate: DateTime.parse(map['fdate']),
      fPrice: map['Fprice'],
    )..selectedSeat = map['selectedSeat']
     ..selectedSeatType = map['selectedSeatType'] != null ? seatType.values.firstWhere((e) => e.toString() == map['selectedSeatType']) : null;
  }
}

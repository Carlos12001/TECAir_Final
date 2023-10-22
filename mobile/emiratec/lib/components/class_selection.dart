import 'package:flutter/material.dart';

enum seatType { Turista, Ejecutivo }

/// The class `classSelection` is a stateful widget in Dart that allows the user to select a seat type,
/// with a default value of `Turista`.
class classSelection extends StatefulWidget {
  classSelection({super.key});
  seatType? _seatType = seatType.Turista;
  @override
  State<classSelection> createState() => _classSelectionState();

  seatType? getType() {return this._seatType;}
}

class _classSelectionState extends State<classSelection> {
  
  @override
  Widget build(BuildContext context) {
    return Column(
      children: <Widget>[
        ListTile(
          title: const Text("Turista"),
          leading: Radio<seatType>(
            value: seatType.Turista,
            groupValue: widget._seatType,
            onChanged: (seatType? value) {
              setState(() {
                widget._seatType = value;
              });
            },
          ),
        ),
        ListTile(
          title: const Text("Ejecutivo"),
          leading: Radio<seatType>(
            value: seatType.Ejecutivo,
            groupValue: widget._seatType,
            onChanged: (seatType? value) {
              setState(() {
                widget._seatType = value;
              });
            },
          ),
        ),
      ],
    );
  }


}

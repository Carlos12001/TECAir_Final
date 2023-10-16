import 'package:flutter/material.dart';

enum seatType { Turista, Ejecutivo }

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

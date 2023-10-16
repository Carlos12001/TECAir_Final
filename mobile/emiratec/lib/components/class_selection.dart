import 'package:flutter/material.dart';

enum seatType { Standard, Premium }

class classSelection extends StatefulWidget {
  classSelection({super.key});
  seatType? _seatType = seatType.Standard;
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
          title: const Text("Standard"),
          leading: Radio<seatType>(
            value: seatType.Standard,
            groupValue: widget._seatType,
            onChanged: (seatType? value) {
              setState(() {
                widget._seatType = value;
              });
            },
          ),
        ),
        ListTile(
          title: const Text("Premium"),
          leading: Radio<seatType>(
            value: seatType.Premium,
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

import 'package:flutter/material.dart';

/// The `FechaInput` class is a stateful widget in Dart that allows the user to select a date and
/// notifies the parent widget when a date is selected.
class FechaInput extends StatefulWidget {
  final ValueChanged<DateTime> onDateSelected;

  const FechaInput({super.key, required this.onDateSelected});

  @override
  _FechaInputState createState() => _FechaInputState();
}

/// The _FechaInputState class is a state class in Dart.
class _FechaInputState extends State<FechaInput> {
  DateTime selectedDate = DateTime.now();

  _selectDate(BuildContext context) async {
    DateTime? pickedDate = await showDatePicker(
      context: context,
      initialDate: selectedDate,
      firstDate: DateTime(2000),
      lastDate: DateTime(2100),
      initialEntryMode: DatePickerEntryMode.calendarOnly,
    );

    if (pickedDate != null && pickedDate != selectedDate) {
      setState(() {
        selectedDate = pickedDate;
        widget.onDateSelected(pickedDate);
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () => _selectDate(context),
      child: AbsorbPointer(
        child: TextFormField(
          decoration: InputDecoration(
            //labelText: "Seleccione la fecha",
            hintText: '${selectedDate.toLocal()}'
                .split(' ')[0], // muestra solo la fecha, no la hora
          ),
          onSaved: (value) {
            // Lógica adicional si es necesario
          },
        ),
      ),
    );
  }
}
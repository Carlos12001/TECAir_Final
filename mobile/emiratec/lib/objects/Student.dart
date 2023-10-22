/// The Student class represents a student with properties such as student ID, university, and email.
class Student {
  String studentId;
  String university;
  //int miles;
  String uemail;

  /// The code `Student({ ... })` is a constructor for the `Student` class. It is used to create a new
  /// instance of the `Student` class with the specified properties.
  Student({
    required this.studentId,
    required this.university,
    // required this.miles,
    required this.uemail,
  });

  /// The function returns a map containing the student's ID, university, and email.
  ///
  /// Returns:
  ///   The method `toMap()` is returning a `Map<String, dynamic>` object.
  Map<String, dynamic> toMap() {
    return {
      'StudentID': studentId,
      'University': university,
      //'Miles': miles,
      'Uemail': uemail,
    };
  }

  /// The function takes a map as input and returns a Student object with the values extracted from the
  /// map.
  ///
  /// Args:
  ///   map (Map<String, dynamic>): A map containing key-value pairs where the keys are strings and the
  /// values can be of any type.
  ///
  /// Returns:
  ///   The method is returning an instance of the Student class.
  static Student fromMap(Map<String, dynamic> map) {
    return Student(
        studentId: map['StudentID'],
        university: map['University'],
        //miles: map['Miles'],
        uemail: map['Uemail']);
  }
}

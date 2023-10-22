class Student {
  String studentId;
  String university;
  //int miles;
  String uemail;

  Student({
    required this.studentId,
    required this.university,
   // required this.miles,
    required this.uemail,
  });

  Map<String, dynamic> toMap() {
    return {
      'StudentID': studentId,
      'University': university,
      //'Miles': miles,
      'Uemail': uemail,
    };
  }

  static Student fromMap(Map<String, dynamic> map) {
    return Student(
        studentId: map['StudentID'],
        university: map['University'],
        //miles: map['Miles'],
        uemail: map['Uemail']);
  }
}

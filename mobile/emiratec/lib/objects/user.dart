/// The User class represents a user with various properties such as first name, last name, phone
/// number, email, university, student ID, and miles.
class User {
  String Fname;
  String Sname;
  String FLname;
  String SLname;
  int Pnumber;
  String email;
  String? university;
  int? studentId;
  int? miles;

  User({
    required this.Fname,
    required this.Sname,
    required this.FLname,
    required this.SLname,
    required this.Pnumber,
    required this.email,
    this.university,
    this.studentId,
    this.miles,
  });

  // Convertir un objeto User a un Map
  Map<String, dynamic> toMap() {
    return {
      'Fname': Fname,
      'Sname': Sname,
      'FLname': FLname,
      'SLname': SLname,
      'Pnumber': Pnumber,
      'email': email,
      'university': university,
      'studentId': studentId,
      'miles': miles
    };
  }

  // Convertir un Map a un objeto User
  static User fromMap(Map<String, dynamic> map) {
    return User(
      Fname: map['Fname'],
      Sname: map['Sname'],
      FLname: map['FLname'],
      SLname: map['SLname'],
      Pnumber: map['Pnumber'],
      email: map['email'],
      university: map['university'],
      studentId: map['studentId'] != null ? map['studentId'] : null,
      miles: map['miles'] != null ? map['miles'] : null
    );
  }
}

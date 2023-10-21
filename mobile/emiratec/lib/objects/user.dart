/// The User class represents a user with various properties such as first name, last name, phone
/// number, email, university, student ID, and miles.
class User {
  String Fname;
  String? Sname;
  String FLname;
  String SLname;
  int Pnumber;
  String email;
  String upassword;

  User(
      {required this.Fname,
      this.Sname,
      required this.FLname,
      required this.SLname,
      required this.Pnumber,
      required this.email,
      required this.upassword});

  // Convertir un objeto User a un Map
  Map<String, dynamic> toMap() {
    return {
      'Fname': Fname,
      'Mname': Sname,
      'Lname1': FLname,
      'Lname2': SLname,
      'Unumber': Pnumber,
      'Email': email,
      'Upassword': upassword
    };
  }

  // Convertir un Map a un objeto User
  static User fromMap(Map<String, dynamic> map) {
    return User(
        Fname: map['Fname'],
        Sname: map['Mname'],
        FLname: map['Lname1'],
        SLname: map['Lname2'],
        Pnumber: int.parse(map['Unumber']),
        email: map['Email'],
        upassword: map['Upassword']);
  }
}

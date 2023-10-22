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
  /// The function "toMap" returns a map containing the values of various properties.
  ///
  /// Returns:
  ///   The method is returning a Map object with string keys and dynamic values. The keys are 'Fname',
  /// 'Mname', 'Lname1', 'Lname2', 'Unumber', 'Email', and 'Upassword'. The values are the corresponding
  /// variables Fname, Sname, FLname, SLname, Pnumber, email, and upassword.
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
  /// The function takes a map as input and returns a User object with the values extracted from the map.
  ///
  /// Args:
  ///   map (Map<String, dynamic>): A map containing key-value pairs where the keys are strings and the
  /// values can be of any type.
  ///
  /// Returns:
  ///   The method is returning a User object.
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

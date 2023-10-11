/// The `user` class in Dart represents a user with properties such as first name, last name, phone
/// number, email, university, student ID, and miles.
class user {
  String Fname;
  String Sname;
  String FLname;
  String SLname;
  int Pnumber;
  String email;
  String? university;
  int? studentId;
  int? miles;

/// The code `user({ ... })` is defining a constructor for the `user` class. The constructor takes in
/// several required parameters (`Fname`, `Sname`, `FLname`, `SLname`, `Pnumber`, `email`) and assigns
/// them to the corresponding class properties. The `required` keyword indicates that these parameters
/// must be provided when creating an instance of the `user` class.
  user({
    required this.Fname,
    required this.Sname,
    required this.FLname,
    required this.SLname,
    required this.Pnumber,
    required this.email,
  });
}

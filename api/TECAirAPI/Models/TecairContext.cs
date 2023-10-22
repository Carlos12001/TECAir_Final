using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace TECAirAPI.Models;

public partial class TecairContext : DbContext
{
   /* The above code is defining a constructor for a class called TecairContext in C#. Constructors are special methods that are called when an object of a class is created. In this case, the constructor is empty and does not have any parameters or code inside it. */
    public TecairContext()
    {
    }

   /* The above code is defining a constructor for the TecairContext class in C#. It takes in an argument of type DbContextOptions<TecairContext> named options. It then calls the base constructor of the DbContext class, passing in the options argument. */
    public TecairContext(DbContextOptions<TecairContext> options)
        : base(options)
    {
    }

/* The above code is declaring a property called "Airadmins" of type DbSet<Airadmin>. DbSet is a class in Entity Framework that represents a collection of entities from a database table. In this case, it is likely representing a collection of Airadmin entities, which could be a table in a database. The "virtual" keyword indicates that this property can be overridden in derived classes. */
    public virtual DbSet<Airadmin> Airadmins { get; set; }

  /* The above code is declaring a property called "Airports" of type DbSet<Airport>. DbSet is a class in Entity Framework that represents a collection of entities from a database table. In this case, the DbSet is used to represent a collection of Airport entities. The "virtual" keyword indicates that the property can be overridden in derived classes. */
    public virtual DbSet<Airport> Airports { get; set; }

   /* The above code is declaring a property called "Baggages" of type DbSet<Baggage>. DbSet is a class in Entity Framework that represents a collection of entities from a database table. In this case, it is declaring a collection of "Baggage" entities. */
    public virtual DbSet<Baggage> Baggages { get; set; }

    /* The above code is declaring a property called "BaggageColors" of type DbSet<BaggageColor>. DbSet is a class in Entity Framework that represents a collection of entities from a database table. In this case, it is declaring a collection of entities of type BaggageColor. */
    public virtual DbSet<BaggageColor> BaggageColors { get; set; }

    /* The above code is declaring a property called "Flights" of type DbSet<Flight>. DbSet is a class in Entity Framework that represents a collection of entities from a database table. This property can be used to query and manipulate the Flight entities in the database. */
    public virtual DbSet<Flight> Flights { get; set; }

   /* The above code is declaring a property called "Passengers" of type DbSet<Passenger>. DbSet is a class in Entity Framework that represents a collection of entities from a database table. In this case, the DbSet is used to represent a collection of Passenger entities. The "virtual" keyword indicates that the property can be overridden in derived classes. */
    public virtual DbSet<Passenger> Passengers { get; set; }

    /* The above code is declaring a property called "Planes" of type DbSet<Plane>. DbSet is a class in Entity Framework that represents a collection of entities from a database table. In this case, the DbSet is used to represent a collection of Plane objects. The "virtual" keyword indicates that the property can be overridden in derived classes. The "get; set;" syntax indicates that the property has both a getter and a setter, allowing it to be read and modified. */
    public virtual DbSet<Plane> Planes { get; set; }

   /* The above code is declaring a property called "Promos" of type DbSet<Promo>. DbSet is a class in Entity Framework that represents a collection of entities from a database table. In this case, the DbSet is used to represent a collection of "Promo" entities, which likely corresponds to a database table named "Promos". The "virtual" keyword indicates that the property can be overridden in derived classes. */
    public virtual DbSet<Promo> Promos { get; set; }

 /* The above code is declaring a property called "Seats" of type DbSet<Seat>. DbSet is a class in Entity Framework that represents a collection of entities from a database table. This property is virtual, which means it can be overridden in derived classes. */
    public virtual DbSet<Seat> Seats { get; set; }

   /* The above code is declaring a property called "Stops" of type DbSet<Stop>. DbSet is a class in Entity Framework that represents a collection of entities from a database table. In this case, the DbSet is being used to represent a collection of "Stop" entities. */
    public virtual DbSet<Stop> Stops { get; set; }

    /* The above code is declaring a property called "Students" of type DbSet<Student>. DbSet is a class in Entity Framework that represents a collection of entities from a database table. In this case, the DbSet<Student> represents a collection of Student entities. The "virtual" keyword indicates that the property can be overridden in derived classes. The "get; set;" syntax indicates that the property has both a getter and a setter, allowing it to be read and modified. */
    public virtual DbSet<Student> Students { get; set; }

/* The above code is declaring a property called "Userws" of type DbSet<Userw>. DbSet is a class in Entity Framework that represents a collection of entities from a database table. In this case, it is declaring a collection of entities of type "Userw". The "virtual" keyword indicates that this property can be overridden in derived classes. */
    public virtual DbSet<Userw> Userws { get; set; }

   /// <summary>
   /// The `OnModelCreating` function is used to configure the relationships and properties of the entities in the database model.
   /// </summary>
   /// <param name="ModelBuilder">The `ModelBuilder` parameter is an instance of the `ModelBuilder` class, which is used to configure the database model for your application. It provides methods for defining entities, properties, relationships, and other aspects of the database schema.</param>
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Airadmin>(entity =>
        {
            entity.HasKey(e => e.Adminid).HasName("airadmin_pkey");

            entity.ToTable("airadmin");

            entity.Property(e => e.Adminid)
                .HasMaxLength(5)
                .HasColumnName("adminid");
            entity.Property(e => e.Uemail)
                .HasMaxLength(25)
                .HasColumnName("uemail");

            entity.HasOne(d => d.UemailNavigation).WithMany(p => p.Airadmins)
                .HasForeignKey(d => d.Uemail)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("admin_user_fk");
        });

        modelBuilder.Entity<Airport>(entity =>
        {
            entity.HasKey(e => e.Airportid).HasName("airport_pkey");

            entity.ToTable("airport");

            entity.Property(e => e.Airportid).HasColumnName("airportid");
            entity.Property(e => e.Aname)
                .HasMaxLength(50)
                .HasColumnName("aname");
            entity.Property(e => e.City)
                .HasMaxLength(50)
                .HasColumnName("city");
            entity.Property(e => e.Code)
                .HasMaxLength(3)
                .IsFixedLength()
                .HasColumnName("code");
            entity.Property(e => e.Image)
                .HasMaxLength(250)
                .HasColumnName("image");
        });

        modelBuilder.Entity<Baggage>(entity =>
        {
            entity.HasKey(e => e.Bnumber).HasName("baggage_pkey");

            entity.ToTable("baggage");

            entity.Property(e => e.Bnumber).HasColumnName("bnumber");
            entity.Property(e => e.Pno).HasColumnName("pno");
            entity.Property(e => e.Weight)
                .HasMaxLength(3)
                .HasColumnName("weight");

            entity.HasOne(d => d.PnoNavigation).WithMany(p => p.Baggages)
                .HasForeignKey(d => d.Pno)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("baggage_passenger_fk");
        });

        modelBuilder.Entity<BaggageColor>(entity =>
        {
            entity.HasKey(e => new { e.Bno, e.Color }).HasName("baggage_color_pkey");

            entity.ToTable("baggage_color");

            entity.Property(e => e.Bno).HasColumnName("bno");
            entity.Property(e => e.Color)
                .HasMaxLength(10)
                .HasColumnName("color");

            entity.HasOne(d => d.BnoNavigation).WithMany(p => p.BaggageColors)
                .HasForeignKey(d => d.Bno)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("baggage_color_baggage_fk");
        });

        modelBuilder.Entity<Flight>(entity =>
        {
            entity.HasKey(e => e.Fnumber).HasName("flight_pkey");

            entity.ToTable("flight");

            entity.Property(e => e.Fnumber)
                .ValueGeneratedNever()
                .HasColumnName("fnumber");
            entity.Property(e => e.Fdate).HasColumnName("fdate");
            entity.Property(e => e.Ffrom).HasColumnName("ffrom");
            entity.Property(e => e.Fstate).HasColumnName("fstate");
            entity.Property(e => e.Fto).HasColumnName("fto");
            entity.Property(e => e.Pid)
                .HasMaxLength(6)
                .IsFixedLength()
                .HasColumnName("pid");
            entity.Property(e => e.Price).HasColumnName("price");

            entity.HasOne(d => d.FfromNavigation).WithMany(p => p.FlightFfromNavigations)
                .HasForeignKey(d => d.Ffrom)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("flight_from_airport_fk");

            entity.HasOne(d => d.FtoNavigation).WithMany(p => p.FlightFtoNavigations)
                .HasForeignKey(d => d.Fto)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("flight_to_airport_fk");

            entity.HasOne(d => d.PidNavigation).WithMany(p => p.Flights)
                .HasForeignKey(d => d.Pid)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("flight_plane_fk");
        });

        modelBuilder.Entity<Passenger>(entity =>
        {
            entity.HasKey(e => e.Pnumber).HasName("passenger_pkey");

            entity.ToTable("passenger");

            entity.Property(e => e.Pnumber).HasColumnName("pnumber");
            entity.Property(e => e.CheckedIn).HasColumnName("checked_in");
            entity.Property(e => e.Fno).HasColumnName("fno");
            entity.Property(e => e.Uemail)
                .HasMaxLength(25)
                .HasColumnName("uemail");

            entity.HasOne(d => d.FnoNavigation).WithMany(p => p.Passengers)
                .HasForeignKey(d => d.Fno)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("passenger_flight_fk");

            entity.HasOne(d => d.UemailNavigation).WithMany(p => p.Passengers)
                .HasForeignKey(d => d.Uemail)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("passenger_user_fk");
        });

        modelBuilder.Entity<Plane>(entity =>
        {
            entity.HasKey(e => e.Planeid).HasName("plane_pkey");

            entity.ToTable("plane");

            entity.Property(e => e.Planeid)
                .HasMaxLength(6)
                .IsFixedLength()
                .HasColumnName("planeid");
            entity.Property(e => e.Capacity).HasColumnName("capacity");
        });

        modelBuilder.Entity<Promo>(entity =>
        {
            entity.HasKey(e => new { e.Fno, e.Image }).HasName("promo_pkey");

            entity.ToTable("promo");

            entity.Property(e => e.Fno).HasColumnName("fno");
            entity.Property(e => e.Image)
                .HasMaxLength(250)
                .HasColumnName("image");
            entity.Property(e => e.Dpercent).HasColumnName("dpercent");
            entity.Property(e => e.FinalDate).HasColumnName("final_date");

            entity.HasOne(d => d.FnoNavigation).WithMany(p => p.Promos)
                .HasForeignKey(d => d.Fno)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("promo_flight_fk");
        });

        modelBuilder.Entity<Seat>(entity =>
        {
            entity.HasKey(e => new { e.Snumber, e.Pno }).HasName("seat_pkey");

            entity.ToTable("seat");

            entity.Property(e => e.Snumber)
                .HasMaxLength(2)
                .HasColumnName("snumber");
            entity.Property(e => e.Pno).HasColumnName("pno");
            entity.Property(e => e.Sclass)
                .HasMaxLength(10)
                .HasDefaultValueSql("'general'::character varying")
                .HasColumnName("sclass");

            entity.HasOne(d => d.PnoNavigation).WithMany(p => p.Seats)
                .HasForeignKey(d => d.Pno)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("seat_passenger_fk");
        });

        modelBuilder.Entity<Stop>(entity =>
        {
            entity.HasKey(e => e.Stopid).HasName("stop_pkey");

            entity.ToTable("stop");

            entity.Property(e => e.Stopid).HasColumnName("stopid");
            entity.Property(e => e.ArrivalHour).HasColumnName("arrival_hour");
            entity.Property(e => e.DepartureHour).HasColumnName("departure_hour");
            entity.Property(e => e.Fno).HasColumnName("fno");
            entity.Property(e => e.Sdate).HasColumnName("sdate");
            entity.Property(e => e.Sfrom).HasColumnName("sfrom");
            entity.Property(e => e.Sto).HasColumnName("sto");

            entity.HasOne(d => d.FnoNavigation).WithMany(p => p.Stops)
                .HasForeignKey(d => d.Fno)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("stop_flight_fk");

            entity.HasOne(d => d.SfromNavigation).WithMany(p => p.StopSfromNavigations)
                .HasForeignKey(d => d.Sfrom)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("stop_from_airport_fk");

            entity.HasOne(d => d.StoNavigation).WithMany(p => p.StopStoNavigations)
                .HasForeignKey(d => d.Sto)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("stop_to_airport_fk");
        });

        modelBuilder.Entity<Student>(entity =>
        {
            entity.HasKey(e => e.Studentid).HasName("student_pkey");

            entity.ToTable("student");

            entity.Property(e => e.Studentid)
                .HasMaxLength(10)
                .IsFixedLength()
                .HasColumnName("studentid");
            entity.Property(e => e.Miles)
                .HasDefaultValueSql("0")
                .HasColumnName("miles");
            entity.Property(e => e.Uemail)
                .HasMaxLength(25)
                .HasColumnName("uemail");
            entity.Property(e => e.University)
                .HasMaxLength(30)
                .HasColumnName("university");

            entity.HasOne(d => d.UemailNavigation).WithMany(p => p.Students)
                .HasForeignKey(d => d.Uemail)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("student_user_fk");
        });

        modelBuilder.Entity<Userw>(entity =>
        {
            entity.HasKey(e => e.Email).HasName("userw_pkey");

            entity.ToTable("userw");

            entity.HasIndex(e => new { e.Email, e.Unumber }, "userw_email_unumber_key").IsUnique();

            entity.Property(e => e.Email)
                .HasMaxLength(25)
                .HasColumnName("email");
            entity.Property(e => e.Fname)
                .HasMaxLength(15)
                .HasColumnName("fname");
            entity.Property(e => e.Lname1)
                .HasMaxLength(15)
                .HasColumnName("lname1");
            entity.Property(e => e.Lname2)
                .HasMaxLength(15)
                .HasColumnName("lname2");
            entity.Property(e => e.Mname)
                .HasMaxLength(15)
                .HasColumnName("mname");
            entity.Property(e => e.Unumber)
                .HasMaxLength(10)
                .IsFixedLength()
                .HasColumnName("unumber");
            entity.Property(e => e.Upassword)
                .HasMaxLength(16)
                .HasColumnName("upassword");

            entity.HasMany(d => d.Sids).WithMany(p => p.Uemails)
                .UsingEntity<Dictionary<string, object>>(
                    "UserStop",
                    r => r.HasOne<Stop>().WithMany()
                        .HasForeignKey("Sid")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("user_stop_stop_fk"),
                    l => l.HasOne<Userw>().WithMany()
                        .HasForeignKey("Uemail")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("user_stop_user_fk"),
                    j =>
                    {
                        j.HasKey("Uemail", "Sid").HasName("user_stop_pkey");
                        j.ToTable("user_stop");
                        j.IndexerProperty<string>("Uemail")
                            .HasMaxLength(25)
                            .HasColumnName("uemail");
                        j.IndexerProperty<int>("Sid").HasColumnName("sid");
                    });
        });

        OnModelCreatingPartial(modelBuilder);
    }

/// <summary>
/// The function is a placeholder for additional model configuration in the OnModelCreating method.
/// </summary>
/// <param name="ModelBuilder">The ModelBuilder class is used to configure the shape of your entity model. It provides a fluent API for configuring various aspects of your model, such as entity types, properties, relationships, and more.</param>
    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}

using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace TECAirAPI.Models;

public partial class TecairContext : DbContext
{
    public TecairContext()
    {
    }

    public TecairContext(DbContextOptions<TecairContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Airadmin> Airadmins { get; set; }

    public virtual DbSet<Airport> Airports { get; set; }

    public virtual DbSet<Baggage> Baggages { get; set; }

    public virtual DbSet<BaggageColor> BaggageColors { get; set; }

    public virtual DbSet<Flight> Flights { get; set; }

    public virtual DbSet<Passenger> Passengers { get; set; }

    public virtual DbSet<Plane> Planes { get; set; }

    public virtual DbSet<Promo> Promos { get; set; }

    public virtual DbSet<Seat> Seats { get; set; }

    public virtual DbSet<Stop> Stops { get; set; }

    public virtual DbSet<Student> Students { get; set; }

    public virtual DbSet<Userw> Userws { get; set; }

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
            entity.Property(e => e.Pemail)
                .HasMaxLength(25)
                .HasColumnName("pemail");
            entity.Property(e => e.Weight)
                .HasMaxLength(3)
                .HasColumnName("weight");

            entity.HasOne(d => d.PemailNavigation).WithMany(p => p.Baggages)
                .HasForeignKey(d => d.Pemail)
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
            entity.HasKey(e => e.Uemail).HasName("passenger_pkey");

            entity.ToTable("passenger");

            entity.Property(e => e.Uemail)
                .HasMaxLength(25)
                .HasColumnName("uemail");
            entity.Property(e => e.CheckedIn).HasColumnName("checked_in");
            entity.Property(e => e.Fno).HasColumnName("fno");

            entity.HasOne(d => d.FnoNavigation).WithMany(p => p.Passengers)
                .HasForeignKey(d => d.Fno)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("passenger_flight_fk");

            entity.HasOne(d => d.UemailNavigation).WithOne(p => p.Passenger)
                .HasForeignKey<Passenger>(d => d.Uemail)
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
            entity.HasKey(e => e.Snumber).HasName("seat_pkey");

            entity.ToTable("seat");

            entity.Property(e => e.Snumber)
                .HasMaxLength(2)
                .HasColumnName("snumber");
            entity.Property(e => e.Pemail)
                .HasMaxLength(25)
                .HasColumnName("pemail");
            entity.Property(e => e.Pid)
                .HasMaxLength(6)
                .IsFixedLength()
                .HasColumnName("pid");
            entity.Property(e => e.Sclass)
                .HasMaxLength(10)
                .HasDefaultValueSql("'general'::character varying")
                .HasColumnName("sclass");

            entity.HasOne(d => d.PemailNavigation).WithMany(p => p.Seats)
                .HasForeignKey(d => d.Pemail)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("seat_passenger_fk");

            entity.HasOne(d => d.PidNavigation).WithMany(p => p.Seats)
                .HasForeignKey(d => d.Pid)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("seat_plane_fk");
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
                .HasMaxLength(10)
                .HasColumnName("fname");
            entity.Property(e => e.Lname1)
                .HasMaxLength(15)
                .HasColumnName("lname1");
            entity.Property(e => e.Lname2)
                .HasMaxLength(15)
                .HasColumnName("lname2");
            entity.Property(e => e.Mname)
                .HasMaxLength(10)
                .HasColumnName("mname");
            entity.Property(e => e.Unumber)
                .HasMaxLength(8)
                .IsFixedLength()
                .HasColumnName("unumber");
            entity.Property(e => e.Upassword)
                .HasMaxLength(10)
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

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}

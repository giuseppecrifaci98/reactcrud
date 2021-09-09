﻿using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.Extensions.Configuration;

#nullable disable

namespace ReactCrudDemo.Models
{
    public partial class ReactCrudDemoDBContext : DbContext
    {
        private IConfigurationRoot _config;
        public ReactCrudDemoDBContext()
        {
        }

        public ReactCrudDemoDBContext(IConfigurationRoot config, DbContextOptions<ReactCrudDemoDBContext> options)
            : base(options)
        {
            _config = config;
        }

        public virtual DbSet<City> Cities { get; set; }
        public virtual DbSet<Employee> Employees { get; set; }

        public virtual DbSet<Department> Departments { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Data Source = (localdb)\\MSSQLLocalDB;Initial Catalog=ReactCrudDemoDB");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "SQL_Latin1_General_CP1_CI_AS");

            modelBuilder.Entity<City>(entity =>
            {
                entity.Property(e => e.CityName).IsUnicode(false);
            });

            modelBuilder.Entity<Employee>(entity =>
            {
                entity.Property(e => e.City).IsUnicode(false);

                modelBuilder.Entity<Employee>()
          .HasOne(e => e.Department)
          .WithMany(c => c.Employees);

                entity.Property(e => e.Gender).IsUnicode(false);

                entity.Property(e => e.Name).IsUnicode(false);
            });

            modelBuilder.Entity<Department>(entity =>
            {
                modelBuilder.Entity<Department>()
         .HasMany(c => c.Employees)
         .WithOne(e => e.Department);
                entity.Property(e => e.DepartmentName).IsUnicode(false);
            });


            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}

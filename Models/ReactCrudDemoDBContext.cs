using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

#nullable disable

namespace ReactCrudDemo.Models
{
    public partial class ReactCrudDemoDBContext : DbContext,IReactCrudDemoContext
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
        public virtual DbSet<User> Users { get; set; }
        public void MarkAsModified(City item)
        {
            Entry(item).State = EntityState.Modified;
        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
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

                modelBuilder.Entity<Employee>()
        .HasOne(e => e.City)
        .WithMany(c => c.Employees);
 

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

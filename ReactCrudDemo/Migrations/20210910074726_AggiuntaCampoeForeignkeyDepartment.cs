using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using ReactCrudDemo.Models;

namespace ReactCrudDemo.Migrations
{
    public partial class AggiuntaCampoeForeignkeyDepartment : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
      name: "Department",
      columns: table => new
      {
          DepartmentId = table.Column<int>(nullable: false)
              .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
          DepartmentName = table.Column<string>(nullable: true),
      });

            migrationBuilder.DropColumn(
        name: "Department",
        table: "Employee");

            migrationBuilder.AddColumn<int>(table: "Employee", name: "DepartmentId", nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
            name: "Department",
            table: "Employee");

            migrationBuilder.AddColumn<int>(table: "Employee", name: "DepartmentId", nullable: true);
        }
    }
}

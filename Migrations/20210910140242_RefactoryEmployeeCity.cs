using Microsoft.EntityFrameworkCore.Migrations;

namespace ReactCrudDemo.Migrations
{
    public partial class RefactoryEmployeeCity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {

            migrationBuilder.DropColumn(
        name: "cityName",
        table: "Employee");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {

            migrationBuilder.DropColumn(
               name: "cityName",
               table: "Employee");
        }
    }
}

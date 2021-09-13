using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ReactCrudDemo.Migrations
{
    public partial class ModificaSalvataggioImmagine : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<byte[]>(
                name: "DataFiles",
                table: "Employee",
                type: "varbinary(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DataFiles",
                table: "Employee");
        }
    }
}

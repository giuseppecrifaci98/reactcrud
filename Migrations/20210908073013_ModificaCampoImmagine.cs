using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ReactCrudDemo.Migrations
{
    public partial class ModificaCampoImmagine : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Picture",
                table: "Employee");

            migrationBuilder.RenameColumn(
                name: "FileName",
                table: "Employee",
                newName: "PhotoFileName");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "PhotoFileName",
                table: "Employee",
                newName: "FileName");

            migrationBuilder.AddColumn<byte[]>(
                name: "Picture",
                table: "Employee",
                type: "varbinary(max)",
                nullable: false,
                defaultValue: new byte[0]);
        }
    }
}

using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ReactCrudDemo.Migrations
{
    public partial class AggiuntaCampoImmagine : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "FileName",
                table: "Employee",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<byte[]>(
                name: "Picture",
                table: "Employee",
                type: "varbinary(max)",
                nullable: false,
                defaultValue: new byte[0]);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FileName",
                table: "Employee");

            migrationBuilder.DropColumn(
                name: "Picture",
                table: "Employee");
        }
    }
}

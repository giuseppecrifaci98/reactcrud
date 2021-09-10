using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

#nullable disable

namespace ReactCrudDemo.Models
{
    [Table("Employee")]
    public partial class Employee
    {
        [Key]
        [Column("EmployeeID")]
        public int EmployeeId { get; set; }
        [Required]
        [StringLength(20)]
        public string Name { get; set; }

        [NotMapped]
        public string CityName { get; set; }

        [ForeignKey("CityID")]
        public int CityId { get; set; }

        public City City { get; set; }


        [NotMapped]
        public string DepartmentName { get; set; }

        public int DepartmentId { get; set; }

        public Department Department { get; set; }

        [ForeignKey("DepartmentId")]
        [Required]
        [StringLength(6)]
        public string Gender { get; set; }

        [Column(TypeName = "nvarchar(100)")]
        public string ImageName { get; set; }

        [NotMapped]
        public IFormFile ImageFile { get; set; }

        [NotMapped]
        public string ImageSrc { get; set; }

    }
}

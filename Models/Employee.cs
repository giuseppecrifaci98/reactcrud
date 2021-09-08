using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
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
        [Required]
        [StringLength(20)]
        public string City { get; set; }
        [Required]
        [StringLength(20)]
        public string Department { get; set; }
        [Required]
        [StringLength(6)]
        public string Gender { get; set; }

        [Required]
        public string FileName { get; set; }

        [Required]
        public byte[] Picture { get; set; }


    }
}

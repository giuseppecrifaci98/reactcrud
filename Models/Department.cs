using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ReactCrudDemo.Models
{
    [Table("Department")]
    public class Department
    {
        [Key]
        [Column("DepartmentId")]
        public int DepartmentId { get; set; }
        [Required]
        [StringLength(20)]
        public string DepartmentName { get; set; }
        public ICollection<Employee> Employees { get; set; }
    }
}

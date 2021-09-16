using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ReactCrudDemo.Models
{
    [Table("TaskStatus")]
    public partial class TaskStatus
    {
        [Key]
        [Column("TaskStatusId")]
        public int TaskStatusId { get; set; }
        [Required]
        [StringLength(255)]
        public string TaskStatusName { get; set; }
        public ICollection<Tasks> Tasks { get; set; }
    }
}

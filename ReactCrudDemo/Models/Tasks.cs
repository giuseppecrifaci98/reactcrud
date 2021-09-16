using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ReactCrudDemo.Models
{
    [Table("Tasks")]
    public partial class Tasks
    {
        [Key]
        [Column("TasksID")]
        public int TasksId { get; set; }
        [Required]
        [StringLength(255)]
        public string TasksName { get; set; }

        [ForeignKey("TaskStatusId")]
        public int TaskStatusId { get; set; }
        public TaskStatus TaskStatus { get; set; }

        [NotMapped]
        public string UserEmail { get; set; }

        [ForeignKey("UserId")]
        public int UserId { get; set; }

        public User User { get; set; }

    }
}

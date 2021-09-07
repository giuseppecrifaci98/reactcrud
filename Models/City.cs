using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

#nullable disable

namespace ReactCrudDemo.Models
{
    [Table("City")]
    public partial class City
    {
        [Key]
        [Column("CityID")]
        public int CityId { get; set; }
        [Required]
        [StringLength(20)]
        public string CityName { get; set; }
    }
}

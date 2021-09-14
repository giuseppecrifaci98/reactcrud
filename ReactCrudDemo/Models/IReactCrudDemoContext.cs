using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReactCrudDemo.Models
{
    public interface IReactCrudDemoContext:IDisposable
    {
        DbSet<City> Cities { get; }
        int SaveChanges();
        void MarkAsModified(City city);


    }
}

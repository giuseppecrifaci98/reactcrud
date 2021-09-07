using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReactCrudDemo.Models
{
    public class EmployeeDataAccessLayer
    {
        private readonly ReactCrudDemoDBContext db = new ReactCrudDemoDBContext();

        public IEnumerable<Employee> GetEmployees()
        {
            try
            {
                return db.Employees.OrderBy(x => x.Name).Distinct().ToList();
            }
            catch
            {
                throw;
            }
        }

        // To Add new Employee record
        public int AddEmployee(Employee employee)
        {
            try
            {
                int result = 1;
                var findUser = db.Employees.Where(x => x.Name == employee.Name).FirstOrDefault();
                if (findUser != null)
                    result = 0;
                else if (findUser == null)
                {
                    db.Employees.Add(employee);
                    db.SaveChanges();
                    result = 1;
                }
                return result;
            }
            catch
            {
                throw;
            }
        }

        // To Update the records of a particular employee
        public int UpdateEmployee(Employee employee)
        {
            try
            {
                db.Entry(employee).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                db.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }
        }

        // Get the details of a particular employee
        public Employee GetEmployeeData(int id)
        {
            try
            {
                Employee employee = db.Employees.Find(id);
                return employee;
            }
            catch
            {
                throw;
            }
        }

        // To Delete the record of a particular employee
        public int DeleteEmployee(int id)
        {
            try
            {
                Employee emp = db.Employees.Find(id);
                db.Employees.Remove(emp);
                db.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }
        }

        // To Get the list of Cities
        public List<City> GetCities()
        {
            List<City> lstCity = new List<City>();
            lstCity = (from CityList in db.Cities select CityList).OrderBy(x=>x.CityName).Distinct().ToList();
            return lstCity;
        }

    }
}

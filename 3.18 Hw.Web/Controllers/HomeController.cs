using _3._18_Hw.Data;
using _3._18_Hw.Web.Models;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace _3._18_Hw.Web.Controllers
{
    public class HomeController : Controller
    {
        private string _connectionString = @"Data Source=.\sqlexpress; Initial Catalog=NewDatabase;Integrated Security=True;";

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult GetPeople()
        {
            var repo = new PeopleRepository(_connectionString);
            List<Person> people = repo.GetAll();
            return Json(people);

        }

        [HttpPost]
        public IActionResult AddPerson(Person p)
        {
            var repo = new PeopleRepository(_connectionString);
            repo.Add(p);
            return Json(p);
        }
        [HttpPost]
        public IActionResult EditPerson(Person p)
        {
            var repo = new PeopleRepository(_connectionString);
            repo.Edit(p);
            return Json(p);
        }
        public IActionResult GetPerson(int id)
        {
            var repo = new PeopleRepository(_connectionString);
            Person p = repo.GetById(id);
            return Json(p);
        }
        public IActionResult DeletePerson(int id)
        {
            var repo = new PeopleRepository(_connectionString);
            repo.Delete(id);
            return Json(id);

        }
    }
}
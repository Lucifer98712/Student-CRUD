using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReactWithCrud.Server.Models;

namespace ReactWithCrud.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentController : ControllerBase
    {
        private readonly StudentDbContext _studentDbContext;

        public StudentController(StudentDbContext studentDbContext)
        {
            _studentDbContext = studentDbContext;
        }

        [HttpGet]
        [Route("GetStudent")]

        public async Task<IEnumerable<Student>> GetStudents()
        {
            return await _studentDbContext.Student.ToListAsync();
        }

        [HttpPost]
        [Route("AddStudent")]

        public async Task<Student> AddStudent(Student s)
        {
            _studentDbContext.Student.Add(s);
            await _studentDbContext.SaveChangesAsync();
            return s;
        }

        [HttpPatch]
        [Route("UpdateStudent/{id}")]

        public async Task<Student> UpdateStudent(Student s)
        {
            _studentDbContext.Entry(s).State = EntityState.Modified;
            await _studentDbContext.SaveChangesAsync();
            return s;
        }

        [HttpDelete]
        [Route("DeleteStudent/{id}")]

        public bool DeleteStudent(int id)
        {
            bool a = false;
            var student = _studentDbContext.Student.Find(id);
            if(student != null)
            {
                a = true;
                _studentDbContext.Entry(student).State = EntityState.Deleted;
                _studentDbContext.SaveChanges();
            }
            return a;
        }
    }
}

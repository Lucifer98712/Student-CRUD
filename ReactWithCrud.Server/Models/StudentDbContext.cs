using Microsoft.EntityFrameworkCore;

namespace ReactWithCrud.Server.Models
{
    public class StudentDbContext : DbContext
    {
        public StudentDbContext(DbContextOptions<StudentDbContext> options) : base(options)
        {
        }
        public DbSet<Student> Student { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Data Source=PEACE;  initial catalog = reactEg; trustServerCertificate=true; integrated security=sspi;");
        }
        
    }
}

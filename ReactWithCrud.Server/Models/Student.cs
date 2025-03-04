using System.ComponentModel.DataAnnotations;

namespace ReactWithCrud.Server.Models
{
    public class Student
    {
        [Key]
        public int ID { get; set; }

        public string Name { get; set; }
        public string Course { get; set; }
    }
}

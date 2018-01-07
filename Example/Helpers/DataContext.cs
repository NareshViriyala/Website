using Example.Entities;
using Microsoft.EntityFrameworkCore;

namespace Example.Helpers
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options){}
        public DbSet<User> Users{get; set;}
    }
}
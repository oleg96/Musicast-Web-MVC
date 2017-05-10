using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace Musicast_Web_MVC.Models
{
    public class AppContext : DbContext
    {
        public AppContext()
            : base("DefaultConnection")
        { }

        public DbSet<Picture> Pictures { set; get; }

        public DbSet<Image> Images { set; get; }

        public DbSet<Message> Messages { set; get; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Picture>()
                .HasMany(p => p.Images)
                .WithRequired(p => p.Picture)
                .HasForeignKey(p => p.Fk_Picture_Id);

            base.OnModelCreating(modelBuilder);
        }
    }
}
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace Musicast_Web_MVC.Models
{
    public class PictureContext : DbContext
    {
        public PictureContext()
            : base("DefaultConnection")
        { }

        public DbSet<Picture> Pictures { set; get; }
    }
}
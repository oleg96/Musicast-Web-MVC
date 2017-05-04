using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace Musicast_Web_MVC.Models
{
    public class ImageContext : DbContext
    {
        public ImageContext()
            : base("DefaultConnection")
        { }

        public DbSet<Image> Images { set; get; }
    }
}
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace Musicast_Web_MVC.Models
{
    public class MessageContext : DbContext
    {
        public MessageContext()
            : base("DefaultConnection")
        { }

        public DbSet<Message> Messages { set; get; }
    }
}
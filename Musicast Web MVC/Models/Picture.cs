using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Musicast_Web_MVC.Models
{
    public class Picture
    {
        public int Id { set; get; }
        public string Author { set; get; }
        public string Name { set; get; }
        public string Description { set; get; }
        public byte[] Image { set; get; }
        public string Owner { set; get; }
        public string Key { set; get; }
        public string Song { set; get; }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Musicast_Web_MVC.Models
{
    public class Note
    {
        public int position { get; set; }
        public int note { get; set; }
        public int length { get; set; }
    }

    public class Pattern
    {
        public List<Note> notes { get; set; }
    }
}
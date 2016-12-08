using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Musicast_Web_MVC.Models
{
    public class Message
    {
        public int Id { set; get; }
        public string Author { set; get; }
        public string UserMessage { set; get; }
        public DateTime DateTime { set; get; }
    }
}
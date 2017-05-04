using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Musicast_Web_MVC.Models
{
    public class Image
    {
        public int Id { set; get; }
        public byte[] ByteImage { set; get; }
        public string Song { set; get; }
        public string Key { set; get; }
        public int Fk_Picture_Id { set; get; }
    }
}
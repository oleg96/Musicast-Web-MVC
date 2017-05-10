using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
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
        public float Saturation { set; get; }
        public float Brightness { set; get; }
        public float Hue { set; get; }
        public int pixelCount { get; set; }
        public float coefficient { set; get; }
        public int Fk_Picture_Id { get; set; }
        public virtual Picture Picture { get; set; }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Musicast_Web_MVC.Models
{
    public class GeneratedNote
    {
        public string Name { set; get; }
        public int Length { set; get; }
        public int Position { set; get; }
        public GeneratedNote(string Name, int Length, int Position)
        {
            this.Name = Name;
            this.Length = Length;
            this.Position = Position;
        }
    }
}
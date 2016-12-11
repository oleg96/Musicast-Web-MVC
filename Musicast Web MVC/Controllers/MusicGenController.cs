using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

using Musicast_Web_MVC.Models;
using System.Data.Entity;
using System.Drawing;
using Newtonsoft.Json;

namespace Musicast_Web_MVC.Controllers
{
    public class MusicGenController : Controller
    {
        PictureContext db = new PictureContext();

        public ActionResult MusicGen()
        {
            return View(db.Pictures);
        }

        private void GenerateMusic(Picture picture)
        {
            byte[] image = picture.Image;
            ImageConverter ic = new ImageConverter();
            Image img = (Image)ic.ConvertFrom(image);
            Bitmap bitmap = new Bitmap(img);
            string song = "";
            int width = bitmap.Width;
            int height = bitmap.Height;
            List<GeneratedNote> noteSequence = new List<GeneratedNote>();
            string key = GetKey(bitmap);
            string result = "";
            string lastResult = "0";
            int length = 0;
            int position = 0;
            for (int x = 0; x < width; x+=100)
            {
                for (int y = 0; y < height; y+=100)
                {
                    Color pixelColor = bitmap.GetPixel(x, y);
                    result = SearchNearestColor(pixelColor);
                    if (result != lastResult)
                    {
                        length = 1;
                        noteSequence.Add(new GeneratedNote(result, length, position));
                    }
                    else
                    {
                        length++;
                        noteSequence.Last().Length = length;
                    }
                    lastResult = result;
                }
            }
            foreach (GeneratedNote note in noteSequence)
            {
                if (key == "C# major" || key == "A# minor")
                {
                    if (note.Name == "C")
                    {
                        note.Name = "C#";
                    }
                    if (note.Name == "D")
                    {
                        note.Name = "D#";
                    }
                    if (note.Name == "E")
                    {
                        note.Name = "F";
                    }
                    if (note.Name == "F")
                    {
                        note.Name = "F#";
                    }
                    if (note.Name == "G")
                    {
                        note.Name = "G#";
                    }
                    if (note.Name == "A")
                    {
                        note.Name = "A#";
                    }
                    if (note.Name == "B")
                    {
                        note.Name = "C";
                    }
                }
                if (key == "D major" || key == "B minor")
                {
                    if (note.Name == "C")
                    {
                        note.Name = "C#";
                    }
                    if (note.Name == "F")
                    {
                        note.Name = "F#";
                    }
                }
                if (key == "D# major" || key == "C minor")
                {
                    if (note.Name == "B")
                    {
                        note.Name = "A#";
                    }
                    if (note.Name == "E")
                    {
                        note.Name = "D#";
                    }
                    if (note.Name == "A")
                    {
                        note.Name = "G#";
                    }
                }
                if (key == "E major" || key == "C# minor")
                {
                    if (note.Name == "С")
                    {
                        note.Name = "С#";
                    }
                    if (note.Name == "D")
                    {
                        note.Name = "D#";
                    }
                    if (note.Name == "F")
                    {
                        note.Name = "F#";
                    }
                    if (note.Name == "G")
                    {
                        note.Name = "G#";
                    }
                }
                if (key == "F major" || key == "D minor")
                {
                    if (note.Name == "B")
                    {
                        note.Name = "A#";
                    }
                }
                if (key == "F# major" || key == "D# minor")
                {
                    if (note.Name == "F")
                    {
                        note.Name = "F#";
                    }
                    if (note.Name == "C")
                    {
                        note.Name = "C#";
                    }
                    if (note.Name == "G")
                    {
                        note.Name = "G#";
                    }
                    if (note.Name == "D")
                    {
                        note.Name = "D#";
                    }
                    if (note.Name == "A")
                    {
                        note.Name = "A#";
                    }
                    if (note.Name == "E")
                    {
                        note.Name = "F";
                    }
                }
                if (key == "G major" || key == "E minor")
                {
                    if (note.Name == "F")
                    {
                        note.Name = "F#";
                    }
                }
                if (key == "G# major" || key == "F minor")
                {
                    if (note.Name == "F")
                    {
                        note.Name = "G";
                    }
                    if (note.Name == "C")
                    {
                        note.Name = "C#";
                    }
                    if (note.Name == "G")
                    {
                        note.Name = "G#";
                    }
                    if (note.Name == "D")
                    {
                        note.Name = "D#";
                    }
                    if (note.Name == "A")
                    {
                        note.Name = "A#";
                    }
                    if (note.Name == "E")
                    {
                        note.Name = "F";
                    }
                    if (note.Name == "B")
                    {
                        note.Name = "C";
                    }
                }
                if (key == "A major" || key == "F# minor")
                {
                    if (note.Name == "F")
                    {
                        note.Name = "F#";
                    }
                    if (note.Name == "C")
                    {
                        note.Name = "C#";
                    }
                    if (note.Name == "G")
                    {
                        note.Name = "G#";
                    }
                }
                if (key == "A# major" || key == "G minor")
                {
                    if (note.Name == "F")
                    {
                        note.Name = "G";
                    }
                    if (note.Name == "C")
                    {
                        note.Name = "D";
                    }
                    if (note.Name == "G")
                    {
                        note.Name = "A";
                    }
                    if (note.Name == "D")
                    {
                        note.Name = "D#";
                    }
                    if (note.Name == "E")
                    {
                        note.Name = "F";
                    }
                    if (note.Name == "A")
                    {
                        note.Name = "A#";
                    }
                    if (note.Name == "B")
                    {
                        note.Name = "C";
                    }
                }
                if (key == "B major" || key == "G# minor")
                {
                    if (note.Name == "F")
                    {
                        note.Name = "F#";
                    }
                    if (note.Name == "C")
                    {
                        note.Name = "C#";
                    }
                    if (note.Name == "G")
                    {
                        note.Name = "G#";
                    }
                    if (note.Name == "D")
                    {
                        note.Name = "D#";
                    }
                    if (note.Name == "A")
                    {
                        note.Name = "A#";
                    }
                }
                if (note.Length > 16)
                {
                    note.Length = 16;
                    note.Position = position;
                    position += 16 * 14;
                }
                else
                {
                    note.Position = position;
                    position += note.Length * 14;
                }
            }
            song = JsonConvert.SerializeObject(noteSequence);
            //using (StreamWriter sw = new StreamWriter(Server.MapPath("~/Files/" + picture.Id + ".json"), false, System.Text.Encoding.Default))
            //{
            //    sw.WriteLine(song);
            //}
            picture.Key = key;
            picture.Song = song;
            db.Entry(picture).State = EntityState.Modified;
            db.SaveChanges();
        }

        private string GetKey(Bitmap bitmap)
        {
            int width = bitmap.Width;
            int height = bitmap.Height;
            string key = "";
            Int64 R = 0;
            Int64 G = 0;
            Int64 B = 0;
            Int64 countR = 0;
            Int64 countG = 0;
            Int64 countB = 0;
            for (int y = 0; y < height; y++)
            {
                for (int x = 0; x < width; x++)
                {
                    Color pixelColor = bitmap.GetPixel(x, y);
                    R += pixelColor.R;
                    countR++;
                    G += pixelColor.G;
                    countG++;
                    B += pixelColor.B;
                    countB++;
                }
            }
            int averageR = (int)(R / countR);
            int averageG = (int)(G / countG);
            int averageB = (int)(B / countB);
            Color averageColor = Color.FromArgb(averageR, averageG, averageB);
            float brightness = averageColor.GetBrightness();
            key = SearchNearestKeyColor(averageColor);
            if (brightness < 0.5)
            {
                key += " minor";
            }
            else
            {
                key += " major";
            }
            return key;
        }

        private string SearchNearestKeyColor(Color pixelColor)
        {
            List<int> delta = new List<int>();
            delta.Add(30 * (pixelColor.R - 227) ^ 2 + 59 * (pixelColor.G - 35) ^ 2 + 11 * (pixelColor.B - 34) ^ 2);
            delta.Add(30 * (pixelColor.R - 234) ^ 2 + 59 * (pixelColor.G - 98) ^ 2 + 11 * (pixelColor.B - 31) ^ 2);

            delta.Add(30 * (pixelColor.R - 241) ^ 2 + 59 * (pixelColor.G - 142) ^ 2 + 11 * (pixelColor.B - 28) ^ 2);
            delta.Add(30 * (pixelColor.R - 253) ^ 2 + 59 * (pixelColor.G - 198) ^ 2 + 11 * (pixelColor.B - 11) ^ 2);

            delta.Add(30 * (pixelColor.R - 244) ^ 2 + 59 * (pixelColor.G - 229) ^ 2 + 11 * (pixelColor.B - 0) ^ 2);

            delta.Add(30 * (pixelColor.R - 140) ^ 2 + 59 * (pixelColor.G - 187) ^ 2 + 11 * (pixelColor.B - 38) ^ 2);
            delta.Add(30 * (pixelColor.R - 0) ^ 2 + 59 * (pixelColor.G - 142) ^ 2 + 11 * (pixelColor.B - 91) ^ 2);

            delta.Add(30 * (pixelColor.R - 6) ^ 2 + 59 * (pixelColor.G - 150) ^ 2 + 11 * (pixelColor.B - 187) ^ 2);
            delta.Add(30 * (pixelColor.R - 42) ^ 2 + 59 * (pixelColor.G - 113) ^ 2 + 11 * (pixelColor.B - 176) ^ 2);

            delta.Add(30 * (pixelColor.R - 68) ^ 2 + 59 * (pixelColor.G - 78) ^ 2 + 11 * (pixelColor.B - 153) ^ 2);
            delta.Add(30 * (pixelColor.R - 109) ^ 2 + 59 * (pixelColor.G - 57) ^ 2 + 11 * (pixelColor.B - 139) ^ 2);

            delta.Add(30 * (pixelColor.R - 196) ^ 2 + 59 * (pixelColor.G - 3) ^ 2 + 11 * (pixelColor.B - 125) ^ 2);

            int indexColor = delta.IndexOf(delta.Min());
            string note = "";
            if (indexColor == 0)
            {
                note = "C";
            }
            else if (indexColor == 1)
            {
                note = "C#";
            }
            else if (indexColor == 2)
            {
                note = "D";
            }
            else if (indexColor == 3)
            {
                note = "D#";
            }
            else if (indexColor == 4)
            {
                note = "E";
            }
            else if (indexColor == 5)
            {
                note = "F";
            }
            else if (indexColor == 6)
            {
                note = "F#";
            }
            else if (indexColor == 7)
            {
                note = "G";
            }
            else if (indexColor == 8)
            {
                note = "G#";
            }
            else if (indexColor == 9)
            {
                note = "A";
            }
            else if (indexColor == 10)
            {
                note = "A#";
            }
            else if (indexColor == 11)
            {
                note = "B";
            }
            return note;
        }

        private string SearchNearestColor(Color pixelColor)
        {
            List<int> delta = new List<int>();
            delta.Add(30 * (pixelColor.R - 227) ^ 2 + 59 * (pixelColor.G - 35) ^ 2 + 11 * (pixelColor.B - 34) ^ 2);

            delta.Add(30 * (pixelColor.R - 241) ^ 2 + 59 * (pixelColor.G - 142) ^ 2 + 11 * (pixelColor.B - 28) ^ 2);

            delta.Add(30 * (pixelColor.R - 244) ^ 2 + 59 * (pixelColor.G - 229) ^ 2 + 11 * (pixelColor.B - 0) ^ 2);

            delta.Add(30 * (pixelColor.R - 140) ^ 2 + 59 * (pixelColor.G - 187) ^ 2 + 11 * (pixelColor.B - 38) ^ 2);

            delta.Add(30 * (pixelColor.R - 6) ^ 2 + 59 * (pixelColor.G - 150) ^ 2 + 11 * (pixelColor.B - 187) ^ 2);

            delta.Add(30 * (pixelColor.R - 68) ^ 2 + 59 * (pixelColor.G - 78) ^ 2 + 11 * (pixelColor.B - 153) ^ 2);

            delta.Add(30 * (pixelColor.R - 196) ^ 2 + 59 * (pixelColor.G - 3) ^ 2 + 11 * (pixelColor.B - 125) ^ 2);

            delta.Add(30 * (pixelColor.R - 255) ^ 2 + 59 * (pixelColor.G - 255) ^ 2 + 11 * (pixelColor.B - 255) ^ 2);
            delta.Add(30 * (pixelColor.R - 0) ^ 2 + 59 * (pixelColor.G - 0) ^ 2 + 11 * (pixelColor.B - 0) ^ 2);

            int indexColor = delta.IndexOf(delta.Min());
            string note = "";
            if (indexColor == 0)
            {
                note = "C";
            }
            else if (indexColor == 1)
            {
                note = "D";
            }
            else if (indexColor == 2)
            {
                note = "E";
            }
            else if (indexColor == 3)
            {
                note = "F";
            }
            else if (indexColor == 4)
            {
                note = "G";
            }
            else if (indexColor == 5)
            {
                note = "A";
            }
            else if (indexColor == 6)
            {
                note = "B";
            }
            else if (indexColor == 7)
            {
                note = "pause";
            }
            else if (indexColor == 8)
            {
                note = "pause";
            }
            return note;
        }

        [Authorize(Roles = "Admin, Moderator, User")]
        public ActionResult Create()
        {
            return View();
        }

        [Authorize(Roles = "Admin, Moderator, User")]
        [HttpPost]
        public ActionResult Create(Picture pic, HttpPostedFileBase uploadImage)
        {
            if (ModelState.IsValid && uploadImage != null)
            {
                byte[] imageData = null;
                // считываем переданный файл в массив байтов
                using (var binaryReader = new BinaryReader(uploadImage.InputStream))
                {
                    imageData = binaryReader.ReadBytes(uploadImage.ContentLength);
                }
                // установка массива байтов
                pic.Image = imageData;
                pic.Owner = User.Identity.Name;
                db.Pictures.Add(pic);
                db.SaveChanges();
                GenerateMusic(pic);
                return RedirectToAction("MusicGen");
            }
            return View(pic);
        }

        [Authorize(Roles = "Admin, Moderator, User")]
        [HttpGet]
        public ActionResult Edit(int? id, string owner)
        {
            if (id == null || owner == null)
            {
                return HttpNotFound();
            }
            Picture picture = db.Pictures.Find(id);
            if (User.IsInRole("Admin") || User.IsInRole("Moderator"))
            {
                if (picture != null && picture.Owner == owner)
                {
                    return View(picture);
                }
            }
            else if (picture != null && picture.Owner == owner && owner == User.Identity.Name)
            {
                return View(picture);
            }
            return HttpNotFound();
        }

        [Authorize(Roles = "Admin, Moderator, User")]
        [HttpPost]
        public ActionResult Edit(Picture pic, HttpPostedFileBase uploadImage)
        {
            if (ModelState.IsValid && uploadImage != null)
            {
                byte[] imageData = null;
                // считываем переданный файл в массив байтов
                using (var binaryReader = new BinaryReader(uploadImage.InputStream))
                {
                    imageData = binaryReader.ReadBytes(uploadImage.ContentLength);
                }
                // установка массива байтов
                pic.Image = imageData;
                if (User.IsInRole("User"))
                {
                    pic.Owner = User.Identity.Name;
                }
                db.Entry(pic).State = EntityState.Modified;
                db.SaveChanges();
                GenerateMusic(pic);
                return RedirectToAction("MusicGen");
            }
            return View(pic);
        }

        [Authorize(Roles = "Admin")]
        [HttpGet]
        public ActionResult Delete(int id, string owner)
        {
            Picture picture = db.Pictures.Find(id);
            if (picture == null || owner == null || owner != picture.Owner)
            {
                return HttpNotFound();
            }
            return View(picture);
        }

        [Authorize(Roles = "Admin")]
        [HttpPost, ActionName("Delete")]
        public ActionResult DeleteConfirmed(int id, string owner)
        {
            Picture picture = db.Pictures.Find(id);
            if (picture == null || owner == null || owner != picture.Owner)
            {
                return HttpNotFound();
            }
            db.Pictures.Remove(picture);
            db.SaveChanges();
            return RedirectToAction("MusicGen");
        }

        [HttpGet]
        public ActionResult Player(int? id)
        {
            if (id == null)
            {
                return HttpNotFound();
            }
            Picture picture = db.Pictures.Find(id);
            if (picture != null)
            {
                return View(picture);
            }
            return HttpNotFound();
        }
    }
}
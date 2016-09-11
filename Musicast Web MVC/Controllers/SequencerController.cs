using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Musicast_Web_MVC.Controllers
{
    public class SequencerController : Controller
    {
        // GET: Sequencer
        public ActionResult Sequencer()
        {
            ViewBag.Message = "Your sequencer page.";

            return View();
        }
    }
}
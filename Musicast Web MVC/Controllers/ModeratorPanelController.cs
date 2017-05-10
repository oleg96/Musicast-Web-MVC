using Musicast_Web_MVC.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Musicast_Web_MVC.Controllers
{
    public class ModeratorPanelController : Controller
    {
        AppContext db = new AppContext();

        [Authorize(Roles = "Moderator")]
        [HttpGet]
        public ActionResult ModeratorPanel()
        {
            return View(db.Pictures);
        }
    }
}
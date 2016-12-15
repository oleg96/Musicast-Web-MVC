using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using Musicast_Web_MVC;
using Musicast_Web_MVC.Models;
using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;

namespace Musicast_Web_MVC.Controllers
{
    public class AdminPanelController : Controller
    {
        PictureContext dbp = new PictureContext();
        // GET: AdminPanel
        [Authorize(Roles = "Admin")]
        [HttpGet]
        public ActionResult AdminPanel()
        {
            dynamic mymodel = new ExpandoObject();
            List<UserInfoModel> uim = new List<UserInfoModel>();
            List<ApplicationUser> users = new List<ApplicationUser>();
            using (ApplicationDbContext db = new ApplicationDbContext())
            {
                users = db.Users.ToList();
            }
            foreach (var val in users)
            {
                string id = val.Id;
                string userName = val.UserName.ToString();
                var userManager = HttpContext.GetOwinContext().GetUserManager<ApplicationUserManager>();
                string role = "";
                try
                {
                    var roles = userManager.GetRoles(val.Id);
                    role = roles.First();
                }
                catch
                {

                }
                uim.Add(new UserInfoModel(id, userName, role));
            }
            mymodel.Users = uim;
            mymodel.Pictures = dbp.Pictures;
            return View(mymodel);
        }

        [Authorize(Roles = "Admin")]
        [HttpGet]
        public async Task<ActionResult> ChangeRole(string id)
        {
            UserInfoModel uim = new UserInfoModel();
            var userManager = HttpContext.GetOwinContext().GetUserManager<ApplicationUserManager>();
            ApplicationUser user = await userManager.FindByIdAsync(id);
            if (user != null)
            {
                string id1 = user.Id;
                string userName = user.UserName.ToString();
                string role = "";
                try
                {
                    var roles = userManager.GetRoles(user.Id);
                    role = roles.First();
                }
                catch
                {

                }
                uim.Id = id1;
                uim.UserName = userName;
                uim.Role = role;
            }
            return View(uim);
        }
        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<ActionResult> ChangeRole(UserInfoModel ui)
        {
            if (ModelState.IsValid)
            {
                var userManager = HttpContext.GetOwinContext().GetUserManager<ApplicationUserManager>();
                try
                {
                    await userManager.AddToRoleAsync(ui.Id, ui.NewRole.ToString());
                    await userManager.RemoveFromRoleAsync(ui.Id, ui.Role);
                    return RedirectToAction("AdminPanel");
                }
                catch
                {

                }
            }
            return View(ui);
        }

        [Authorize(Roles = "Admin")]
        [HttpGet]
        public async Task<ActionResult> Delete(string id)
        {
            UserInfoModel uim = new UserInfoModel();
            var userManager = HttpContext.GetOwinContext().GetUserManager<ApplicationUserManager>();
            ApplicationUser user = await userManager.FindByIdAsync(id);
            if (user != null)
            {
                string id1 = user.Id;
                string userName = user.UserName.ToString();
                string role = "";
                try
                {
                    var roles = userManager.GetRoles(user.Id);
                    role = roles.First();
                }
                catch
                {

                }
                uim.Id = id1;
                uim.UserName = userName;
                uim.Role = role;
            }
            return View(uim);
        }

        [Authorize(Roles = "Admin")]
        [HttpPost, ActionName("Delete")]
        public async Task<ActionResult> DeleteConfirmed(string id)
        {
            var userManager = HttpContext.GetOwinContext().GetUserManager<ApplicationUserManager>();
            ApplicationUser user = await userManager.FindByIdAsync(id);
            if (user != null)
            {
                IdentityResult result = await userManager.DeleteAsync(user);
                if (result.Succeeded)
                {
                    return RedirectToAction("AdminPanel");
                }
            }
            return RedirectToAction("AdminPanel");
        }
    }
}
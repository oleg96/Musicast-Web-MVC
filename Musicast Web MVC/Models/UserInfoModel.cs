using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Musicast_Web_MVC.Models
{
    public class UserInfoModel
    {
        public string Id { get; set; }
        public string UserName { get; set; }
        public string Role { get; set; }
        public AllRoles NewRole { set; get; }
        public UserInfoModel(string Id, string UserName, string Role)
        {
            this.Id = Id;
            this.UserName = UserName;
            this.Role = Role;
        }
        public UserInfoModel() { }
    }
    public enum AllRoles
    {
        User, Moderator, Admin
    }

}
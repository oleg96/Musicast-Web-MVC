using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(Musicast_Web_MVC.Startup))]

namespace Musicast_Web_MVC
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
            app.MapSignalR();
        }
    }
}

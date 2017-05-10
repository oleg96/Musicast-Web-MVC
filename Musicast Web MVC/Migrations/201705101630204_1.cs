namespace Musicast_Web_MVC.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class _1 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Images", "Saturation", c => c.Single(nullable: false));
            AddColumn("dbo.Images", "Brightness", c => c.Single(nullable: false));
            AddColumn("dbo.Images", "Hue", c => c.Single(nullable: false));
            AddColumn("dbo.Images", "pixelCount", c => c.Int(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Images", "pixelCount");
            DropColumn("dbo.Images", "Hue");
            DropColumn("dbo.Images", "Brightness");
            DropColumn("dbo.Images", "Saturation");
        }
    }
}

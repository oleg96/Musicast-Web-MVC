namespace Musicast_Web_MVC.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Start : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Images", "Fk_Picture_Id", c => c.Int(nullable: false));
            AddForeignKey("dbo.Images", "Fk_Picture_Id", "dbo.Pictures", "Fk_Picture_Id", cascadeDelete: true);
            CreateIndex("dbo.Images", "Fk_Picture_Id");
        }
        
        public override void Down()
        {
            DropIndex("dbo.Images", "Fk_Picture_Id");
            DropForeignKey("dbo.Images", "Fk_Picture_Id", "dbo.Pictures");
            DropColumn("dbo.Images", "Fk_Picture_Id");
        }
    }
}

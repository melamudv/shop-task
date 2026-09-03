using Microsoft.EntityFrameworkCore;
using catalog_api.Entities;

namespace catalog_api.Data;

public class AppDbContext(DbContextOptions<AppDbContext> options)
    : DbContext(options)
{
    public DbSet<Category> Categories => Set<Category>();
    public DbSet<Product> Products => Set<Product>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Product>()
            .Property(product => product.Price)
            .HasPrecision(18, 2);

        modelBuilder.Entity<Category>().HasData(
            new Category { Id = 1, Name = "חלב וגבינות" },
            new Category { Id = 2, Name = "טואליטיקה" },
            new Category { Id = 3, Name = "בשר ועופות" },
            new Category { Id = 4, Name = "ירקות ופירות" }
        );

        modelBuilder.Entity<Product>().HasData(
     new Product
     {
         Id = 1,
         Name = "חלב תנובה 3%",
         Price = 7.90m,
         ImageUrl = "https://placehold.co/300x200?text=Milk",
         CategoryId = 1
     },
     new Product
     {
         Id = 2,
         Name = "גבינה צהובה עמק",
         Price = 24.90m,
         ImageUrl = "https://placehold.co/300x200?text=Yellow+Cheese",
         CategoryId = 1
     },
     new Product
     {
         Id = 3,
         Name = "קוטג' 5%",
         Price = 6.55m,
         ImageUrl = "https://placehold.co/300x200?text=Cottage",
         CategoryId = 1
     },
     new Product
     {
         Id = 4,
         Name = "יוגורט טבעי",
         Price = 5.90m,
         ImageUrl = "https://placehold.co/300x200?text=Yogurt",
         CategoryId = 1
     },
     new Product
     {
         Id = 5,
         Name = "חמאה",
         Price = 12.90m,
         ImageUrl = "https://placehold.co/300x200?text=Butter",
         CategoryId = 1
     },

     new Product
     {
         Id = 6,
         Name = "שמפו לשיער",
         Price = 18.90m,
         ImageUrl = "https://placehold.co/300x200?text=Shampoo",
         CategoryId = 2
     },
     new Product
     {
         Id = 7,
         Name = "משחת שיניים",
         Price = 11.90m,
         ImageUrl = "https://placehold.co/300x200?text=Toothpaste",
         CategoryId = 2
     },
     new Product
     {
         Id = 8,
         Name = "נייר טואלט",
         Price = 22.90m,
         ImageUrl = "https://placehold.co/300x200?text=Toilet+Paper",
         CategoryId = 2
     },
     new Product
     {
         Id = 9,
         Name = "סבון ידיים",
         Price = 8.90m,
         ImageUrl = "https://placehold.co/300x200?text=Hand+Soap",
         CategoryId = 2
     },
     new Product
     {
         Id = 10,
         Name = "דאודורנט",
         Price = 15.90m,
         ImageUrl = "https://placehold.co/300x200?text=Deodorant",
         CategoryId = 2
     },

     new Product
     {
         Id = 11,
         Name = "חזה עוף טרי",
         Price = 39.90m,
         ImageUrl = "https://placehold.co/300x200?text=Chicken+Breast",
         CategoryId = 3
     },
     new Product
     {
         Id = 12,
         Name = "שניצל עוף",
         Price = 34.90m,
         ImageUrl = "https://placehold.co/300x200?text=Chicken+Schnitzel",
         CategoryId = 3
     },
     new Product
     {
         Id = 13,
         Name = "בשר טחון",
         Price = 49.90m,
         ImageUrl = "https://placehold.co/300x200?text=Ground+Beef",
         CategoryId = 3
     },
     new Product
     {
         Id = 14,
         Name = "סטייק אנטריקוט",
         Price = 89.90m,
         ImageUrl = "https://placehold.co/300x200?text=Ribeye+Steak",
         CategoryId = 3
     },
     new Product
     {
         Id = 15,
         Name = "כנפיים עוף",
         Price = 24.90m,
         ImageUrl = "https://placehold.co/300x200?text=Chicken+Wings",
         CategoryId = 3
     },

     new Product
     {
         Id = 16,
         Name = "עגבניות",
         Price = 8.90m,
         ImageUrl = "https://placehold.co/300x200?text=Tomatoes",
         CategoryId = 4
     },
     new Product
     {
         Id = 17,
         Name = "מלפפונים",
         Price = 7.90m,
         ImageUrl = "https://placehold.co/300x200?text=Cucumbers",
         CategoryId = 4
     },
     new Product
     {
         Id = 18,
         Name = "בננות",
         Price = 9.90m,
         ImageUrl = "https://placehold.co/300x200?text=Bananas",
         CategoryId = 4
     },
     new Product
     {
         Id = 19,
         Name = "תפוחים",
         Price = 12.90m,
         ImageUrl = "https://placehold.co/300x200?text=Apples",
         CategoryId = 4
     },
     new Product
     {
         Id = 20,
         Name = "אבוקדו",
         Price = 14.90m,
         ImageUrl = "https://placehold.co/300x200?text=Avocado",
         CategoryId = 4
     }
 );
    }
}
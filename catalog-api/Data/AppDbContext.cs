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
            new Category { Id = 1, Name = "Electronics" },
            new Category { Id = 2, Name = "Books" }
        );

        modelBuilder.Entity<Product>().HasData(
            new Product
            {
                Id = 1,
                Name = "Wireless Headphones",
                Price = 99.99m,
                ImageUrl = "https://placehold.co/300x200?text=Headphones",
                CategoryId = 1
            },
            new Product
            {
                Id = 2,
                Name = "Mechanical Keyboard",
                Price = 79.99m,
                ImageUrl = "https://placehold.co/300x200?text=Keyboard",
                CategoryId = 1
            },
            new Product
            {
                Id = 3,
                Name = "Clean Code",
                Price = 39.99m,
                ImageUrl = "https://placehold.co/300x200?text=Clean+Code",
                CategoryId = 2
            }
        );
    }
}
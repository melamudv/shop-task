using catalog_api.Data;
using catalog_api.Entities;
using Microsoft.EntityFrameworkCore;

namespace catalog_api.Repositories;

public class CatalogRepository(AppDbContext context) : ICatalogRepository
{
    public Task<List<Category>> GetCategoriesAsync() =>
        context.Categories
            .AsNoTracking()
            .OrderBy(category => category.Name)
            .ToListAsync();

    public Task<bool> CategoryExistsAsync(int categoryId) =>
        context.Categories.AnyAsync(category => category.Id == categoryId);

    public Task<List<Product>> GetProductsByCategoryAsync(int categoryId) =>
        context.Products
            .AsNoTracking()
            .Where(product => product.CategoryId == categoryId)
            .OrderBy(product => product.Name)
            .ToListAsync();
}
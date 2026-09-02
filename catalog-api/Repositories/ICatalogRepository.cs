using catalog_api.Entities;

namespace catalog_api.Repositories;

public interface ICatalogRepository
{
    Task<List<Category>> GetCategoriesAsync();
    Task<bool> CategoryExistsAsync(int categoryId);
    Task<List<Product>> GetProductsByCategoryAsync(int categoryId);
}
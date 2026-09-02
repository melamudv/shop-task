using catalog_api.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace catalog_api.Controllers;

[ApiController]
[Route("api/catalog")]
public class CatalogController(ICatalogRepository repository) : ControllerBase
{
    [HttpGet("categories")]
    public async Task<IActionResult> GetCategories()
    {
        var categories = await repository.GetCategoriesAsync();

        return Ok(categories.Select(category => new
        {
            category.Id,
            category.Name
        }));
    }

    [HttpGet("categories/{categoryId:int}/products")]
    public async Task<IActionResult> GetProductsByCategory(int categoryId)
    {
        if (!await repository.CategoryExistsAsync(categoryId))
        {
            return NotFound(new
            {
                message = $"Category with id {categoryId} was not found."
            });
        }

        var products = await repository.GetProductsByCategoryAsync(categoryId);

        return Ok(products.Select(product => new
        {
            product.Id,
            product.Name,
            product.Price,
            product.ImageUrl,
            product.CategoryId
        }));
    }
}
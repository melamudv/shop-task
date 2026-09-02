import type { Category } from "../../entities/category/model";
import type { Product } from "../../entities/product/model";
import { CATALOG_API_URL } from "../config/api";

async function getJson<T>(url: string): Promise<T> {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Catalog API error: ${response.status}`);
    }

    return response.json() as Promise<T>;
}

export function getCategories() {
    return getJson<Category[]>(`${CATALOG_API_URL}/api/catalog/categories`);
}

export function getProductsByCategory(categoryId: number) {
    return getJson<Product[]>(
        `${CATALOG_API_URL}/api/catalog/categories/${categoryId}/products`
    );
}
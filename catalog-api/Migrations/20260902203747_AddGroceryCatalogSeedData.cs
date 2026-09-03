using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace catalog_api.Migrations
{
    /// <inheritdoc />
    public partial class AddGroceryCatalogSeedData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 1,
                column: "Name",
                value: "חלב וגבינות");

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 2,
                column: "Name",
                value: "טואליטיקה");

            migrationBuilder.InsertData(
                table: "Categories",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { 3, "בשר ועופות" },
                    { 4, "ירקות ופירות" }
                });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "ImageUrl", "Name", "Price" },
                values: new object[] { "https://placehold.co/300x200?text=Milk", "חלב תנובה 3%", 7.90m });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "ImageUrl", "Name", "Price" },
                values: new object[] { "https://placehold.co/300x200?text=Yellow+Cheese", "גבינה צהובה עמק", 24.90m });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "CategoryId", "ImageUrl", "Name", "Price" },
                values: new object[] { 1, "https://placehold.co/300x200?text=Cottage", "קוטג' 5%", 6.50m });

            migrationBuilder.InsertData(
                table: "Products",
                columns: new[] { "Id", "CategoryId", "ImageUrl", "Name", "Price" },
                values: new object[,]
                {
                    { 4, 1, "https://placehold.co/300x200?text=Yogurt", "יוגורט טבעי", 5.90m },
                    { 5, 1, "https://placehold.co/300x200?text=Butter", "חמאה", 12.90m },
                    { 6, 2, "https://placehold.co/300x200?text=Shampoo", "שמפו לשיער", 18.90m },
                    { 7, 2, "https://placehold.co/300x200?text=Toothpaste", "משחת שיניים", 11.90m },
                    { 8, 2, "https://placehold.co/300x200?text=Toilet+Paper", "נייר טואלט", 22.90m },
                    { 9, 2, "https://placehold.co/300x200?text=Hand+Soap", "סבון ידיים", 8.90m },
                    { 10, 2, "https://placehold.co/300x200?text=Deodorant", "דאודורנט", 15.90m },
                    { 11, 3, "https://placehold.co/300x200?text=Chicken+Breast", "חזה עוף טרי", 39.90m },
                    { 12, 3, "https://placehold.co/300x200?text=Chicken+Schnitzel", "שניצל עוף", 34.90m },
                    { 13, 3, "https://placehold.co/300x200?text=Ground+Beef", "בשר טחון", 49.90m },
                    { 14, 3, "https://placehold.co/300x200?text=Ribeye+Steak", "סטייק אנטריקוט", 89.90m },
                    { 15, 3, "https://placehold.co/300x200?text=Chicken+Wings", "כנפיים עוף", 24.90m },
                    { 16, 4, "https://placehold.co/300x200?text=Tomatoes", "עגבניות", 8.90m },
                    { 17, 4, "https://placehold.co/300x200?text=Cucumbers", "מלפפונים", 7.90m },
                    { 18, 4, "https://placehold.co/300x200?text=Bananas", "בננות", 9.90m },
                    { 19, 4, "https://placehold.co/300x200?text=Apples", "תפוחים", 12.90m },
                    { 20, 4, "https://placehold.co/300x200?text=Avocado", "אבוקדו", 14.90m }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 8);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 9);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 10);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 11);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 12);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 13);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 14);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 15);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 16);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 17);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 18);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 19);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 20);

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 1,
                column: "Name",
                value: "Electronics");

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 2,
                column: "Name",
                value: "Books");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "ImageUrl", "Name", "Price" },
                values: new object[] { "https://placehold.co/300x200?text=Headphones", "Wireless Headphones", 99.99m });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "ImageUrl", "Name", "Price" },
                values: new object[] { "https://placehold.co/300x200?text=Keyboard", "Mechanical Keyboard", 79.99m });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "CategoryId", "ImageUrl", "Name", "Price" },
                values: new object[] { 2, "https://placehold.co/300x200?text=Clean+Code", "Clean Code", 39.99m });
        }
    }
}

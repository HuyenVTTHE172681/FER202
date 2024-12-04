import { useState } from "react";
import mainData from "./data.json";

function Main() {
  // Lấy dũ liệu của products
  const products = mainData?.products;

  console.log(`products: ${products}`);
  
  const [searchItem, setSearchItem] = useState("");
  const [filterItems, setFilterItems] = useState(products);

  const handleChange = (event) => {
    const searchTerm = event.target.value;
    setSearchItem(searchTerm);

    const filteredProducts = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      product.category.toString().includes(searchTerm) ||
      product.price.toString().includes(searchTerm)
    );

    setFilterItems(filteredProducts);
  };

  return (
    <main>
      <input
        type="text"
        name="search"
        placeholder="Search..."
        value={searchItem}
        onChange={handleChange}
      />
      <aside>Left Content</aside>
      <section>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            {filterItems?.map((items) => {
              return (
                <tr key={items.id}>
                  <td>{items?.id}</td>
                  <td>{items?.name}</td>
                  <td>{items?.price}</td>
                  <td>{items?.category}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    </main>
  );
}

export default Main;

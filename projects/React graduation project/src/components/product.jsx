import React, {useState ,useEffect} from 'react';
import { useSelector } from 'react-redux';
import { update } from '../firebase/firebaseFunctions';
import Table from './Table';

export const ProductItem = ({product}) => {
    const users = useSelector((state) => state.users.users);
    const categories = useSelector((state) => state.categories.categories);
    const orders = useSelector((state) => state.orders.orders);
    const [productData, setProductData] = useState({ 
        title: product.title, 
        price: parseInt(product.price), 
        category: product.category,
        image: product.image, 
        description: product.description 
    });
    const [tableProducts, setTableProducts] = useState([]);

    const handleChange = (e) => {
        // If the field is 'price', convert the value to a number before setting the state
        const value = e.target.name === 'price' ? parseInt(e.target.value) : e.target.value;
        setProductData({ ...productData, [e.target.name]: value });
    };
    const handleUpdateProduct = () => {
        update("products", product.id, { 
            title: productData.title, 
            price: productData.price, 
            category: productData.category, 
            image: productData.image, 
            description: productData.description 
        });
    };

    useEffect(() => {
        // Extract relevant information from orders
        const ordersProducts = orders.flatMap(order => {
            // Filter products in the order that match the current product
            const filterProducts = order.products.filter(product => product.name === productData.title);
            const user = users.find((user)=>user.id===order.userId)
            // Map filtered products to the required format
            return filterProducts.map(product => ({
                name: user.firstName,
                qty: product.qty,
                date: order.date
            }));
        });
    
        // Update the tableProducts state
        setTableProducts(ordersProducts);
    }, [orders, productData.title]);
    
    

  return (
    <div style={{ display: "flex", border: "red 2px solid" }}>
        <div>
            Title: <input type='text' name='title' defaultValue={product.title} onChange={e => handleChange(e)}></input><br />
            Category: 
            <select name='category' value={product.category} onChange={e => handleChange(e)}>
                <option value=''>Select category...</option>
                {categories.map((category, index) => (
                    <option key={index} value={category.name}>{category.name}</option>
                ))}
            </select><br />
            Description:<br />
            <textarea type='text' name='description' defaultValue={product.description} onChange={e => handleChange(e)}></textarea><br />
            <button onClick={handleUpdateProduct}>Save</button>
        </div>
        <div>
            Price: <input type='number' name='price' defaultValue={product.price} onChange={e => handleChange(e)}></input><br />
            Link to pice: <input type='text' name='image' defaultValue={product.image} onChange={e => handleChange(e)}></input><br />
            Bought By: <br />
            <Table
                titles={['name', 'qty', 'date']}
                data={tableProducts}
            />
        </div>
    </div>
  )
}
export default ProductItem

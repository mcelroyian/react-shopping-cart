import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import { useLocalStorage } from './hooks/useLocalStorage'
import { ProductContext, CartContext } from './contexts'
import data from './data';

// Components
import Navigation from './components/Navigation';
import Products from './components/Products';
import ShoppingCart from './components/ShoppingCart';

function App() {
	const [products] = useState(data);
	const [cart, setCart] = useLocalStorage('cartItems', []);

	const addItem = item => {
		// add the given item to the cart
		setCart([...cart, item])
	};

	const removeItem = itemId => {
		setCart(cart.filter(i => itemId !== i.id))
	}

	return (
		<div className="App">
		<ProductContext.Provider value={{ products, addItem }}>
		<CartContext.Provider value={{ cart, removeItem}}>
			<Navigation />

			{/* Routes */}
			<Route exact path="/">
				<Products />
			</Route>

			<Route path="/cart">
				<ShoppingCart />
			</Route>
		</CartContext.Provider>

		</ProductContext.Provider>
		</div>
	);
}

export default App;

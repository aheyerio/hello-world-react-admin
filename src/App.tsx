import React from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Users from "./pages/Users";
import Login from "./pages/Login";
import Register from "./pages/Register";
import {RedirectToUsers} from "./components/RedirectToUsers";
import Links from "./pages/Links";
import Products from "./pages/products/Products"
import ProductForm from "./pages/products/ProductForm"
import Orders from "./pages/Orders";
import Profile from "./pages/Profile";

// The routes being used here is updated to React Router V6. The Udemy tutorial I am following used an
// outdated version - great oppourtunity for problem solving. The update required an extra import "Routes"
// and an added Route element to wrap the routes. Also the semantics are different for creating routes.

function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<RedirectToUsers/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/profile" element={<Profile/>}/>
                <Route path="/users" element={<Users/>}/>
                <Route path="/users/:id/links" element={<Links/>}/>
                <Route path="/products" element={<Products/>}/>
                <Route path="/products/create" element={<ProductForm/>}/>
                <Route path="/products/:id/edit" element={<ProductForm/>}/>
                <Route path="/orders" element={<Orders/>}/>

            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;

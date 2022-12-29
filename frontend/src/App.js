import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CartProvider } from "react-use-cart";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import AddBook from "./admin/AddBook";
import HomeAdmin from "./admin/HomeAdmin";
import UpdateBook from "./admin/UpdateBook";
import BookDetail from "./client/BookDetail";
import Cart from "./client/Cart";
import Home from "./client/Home";
import Order from "./client/Order";
import Payment from "./client/Payment";
import Login from "./pages/Login";
import Register from "./pages/Register";
import OrderAd from './admin/OrderAd'

function App() {
  return (
    <div className="App">
      <Router>
        <CartProvider>
          <Routes>
            {/* Client */}
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route path="/signup" element={<Register />} />
            <Route path="/book/:id" element={<BookDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/orders" element={<Order />} />
            {/* Admin */}
            <Route path="/admin" element={<HomeAdmin />} />
            <Route path="admin/update-book/:id" element={<UpdateBook />} />
            <Route path="admin/insert-book" element={<AddBook />} />
            <Route path="admin/orders" element={<OrderAd />} />
          </Routes>
        </CartProvider>
      </Router>
    </div>
  );
}

export default App;

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import ProductList from './pages/ProductList';
import Cart from './pages/Cart';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
    return (
        <Router>
            <Switch>
                <Route path="/login" component={Login} />
                <ProtectedRoute path="/products" component={ProductList} />
                <ProtectedRoute path="/cart" component={Cart} />
                <Route path="/" component={() => <h1>Home</h1>} />
            </Switch>
        </Router>
    );
};

export default App;

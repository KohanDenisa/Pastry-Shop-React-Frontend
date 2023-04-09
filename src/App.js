import './App.css';
import React from 'react';

import { Routes, Route, Link } from "react-router-dom"
import { Box, Button, AppBar, Typography, Container, ThemeProvider, Toolbar, createTheme } from '@mui/material';
import Homepage from './pages/Homepage';
import ShopsView from './pages/shop/ShopsView';
import CreateShopView from './pages/shop/CreateShopView';
import UpdateShopView from './pages/shop/UpdateShopViews';
import DeleteShopView from './pages/shop/DeleteShopView';
import ShopsAvgSalary from './pages/shop/ShopsAvgSalaryView';
import AddProductsView from './pages/shop/AddProductsVIew';

const mdTheme = createTheme();

function App() {
  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Button color = "inherit" component={Link} to="/">
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Pastry
              </Typography>
            </Button>
            <Button color="inherit" component={Link} to="/shops">
              Shops
            </Button>
            <Button color="inherit" component={Link} to="/products">
              Products
            </Button>
            <Button color="inherit" component={Link} to="/employees">
              Employees
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Container sx={{ margin: 2 }}>
        <Routes>
          <Route exact={true} path="/" element={<Homepage />} />

          <Route exact={true} path="/shops" element={<ShopsView />} />
          <Route exact={true} path="/shops/sortByAvgSalary" element={<ShopsAvgSalary />} />
          <Route exact={true} path="/shops/create_new" element={<CreateShopView />} />
          <Route exact={true} path="/shops/:index" element={<UpdateShopView />} />
          <Route exact={true} path="/shops/:index/products" element={<AddProductsView />} />

          <Route exact={true} path="/shops/:index/delete" element={<DeleteShopView />} />
        </Routes>
      </Container>
    </ThemeProvider>
  );
}

export default App;

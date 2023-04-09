import React, { useEffect, useState } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  List,
  ListItem,
  ListItemText,
  Typography
} from "@mui/material";
import API from "../API/API";
import { useParams } from "react-router-dom";

const client = new API();

const AddProductsView = () => {
  const [selectedItem, setSelectedItem] = useState("");
  const [listItems, setListItems] = useState([]);
  const { index } = useParams();

  const handleItemChange = (event) => {
    setSelectedItem(event.target.value);
  };

  const handleAddItem = () => {
    if (selectedItem !== "") {
      setListItems([...listItems, items.find(item => item.name === selectedItem)]);
      setSelectedItem("");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // do something with the list items
    console.log(listItems);
    setListItems([]);
  };

  const [items, setItems] = React.useState([]);
  const [shopName, setShopName] = React.useState("");

  useEffect(() => {
    async function fetchDataProducts(){
        return await client.loadAllProducts();
    }

    async function fetchDataName(){
        return await client.loadShopId(index);
    }

    fetchDataProducts().then(u => {
        setItems([...u]);
    })

    fetchDataName().then(u => {
        setShopName(u.name);
    })

    console.log("S-a apelat useEffect!");
  }, [index])

  return (
    <React.Fragment>
        <Typography variant="h5">
            Add products to shop with name {shopName}
        </Typography>
        <form onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", alignItems: "center"}} >
        <FormControl>
            <InputLabel id="item-label">Select Item</InputLabel>
            <Select
            labelId="item-label"
            sx={{ width: "100vh" }}
            margin="dense"
            id="item-select"
            variant="standard"
            value={selectedItem}
            onChange={handleItemChange}
            >
            {items.map((item) => (
                <MenuItem key={item.id} value={item.name}>
                {item.name}
                </MenuItem>
            ))}
            </Select>
        </FormControl>
        <Button variant="contained" onClick={handleAddItem}>
            Add Item
        </Button>
        <Typography variant="h6">
            List of products that will be added: 
        </Typography>
        <div>
            <List>
            {listItems.map((item, id) => (
                <ListItem key={id}>
                    <ListItemText primary={item.name} />
                </ListItem>
            ))}
            </List>
        </div>
        <Button type="submit" variant="contained">
            Submit
        </Button>
        </form>
    </React.Fragment>
  );
};

export default AddProductsView;

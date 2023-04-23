import { Snackbar, Alert, Typography, Paper, Button, Divider, TextField, List, ListItem, ListItemText } from "@mui/material";
import React, { useEffect, useState } from "react";
import API from "../API/API";
import { useNavigate, useParams } from "react-router-dom";

const client = new API();

export default function UpdateProductView(){
    const { index } = useParams();
    const [productName, setProductName] = useState("");

    const [product, setProduct] = useState({
        name: "",
        price: "",
        weight: "",
        type: "",
        manufacturingDate: "",
        shopDtos: []
    })

    useEffect(() => {
        async function fetchData(){
            return await client.loadProductId(index);
        }

        fetchData().then(u => {
            setProductName(u.name);
            setProduct({...u, manufacturingDate: new Date()});
        })
    }, [index])

    const [openAlertRequiredFields, setOpenAlertRequiredFields] = useState(false);
    const [openAlertValidation, setOpenAlertValidation] = useState(false);
    const [disableUpdate, setDisableUpdate] = useState(true);

    let navigate = useNavigate();

    const onChange = (property, value) => {
        setDisableUpdate(false);
        setProduct({
            ...product,
            [property] : value
        })
    }

    const handleOpenAlertRequiredFields = () => {
        setOpenAlertRequiredFields(true);
    }

    const handleCloseAlertRequiredFields = (event, reason) => {
        if(reason === "clickaway")
            return;
        setOpenAlertRequiredFields(false);
    }

    const handleOpenAlertValidation = () => {
        setOpenAlertValidation(true);
    }

    const handleCloseAlertValidation = (event, reason) => {
        if(reason === "clickaway")
            return;
        setOpenAlertValidation(false);
    }

    return (
        <React.Fragment>
            <Paper sx={{ display: 'flex', flexDirection: 'column'}}>
                <Typography variant="h4">
                    {productName} Details
                </Typography>
                <Button disabled={disableUpdate} variant="contained" color="success" onClick={() => {
                    console.log(product)
                    if(
                        product.name.length === 0 ||
                        product.weight.length === 0 ||
                        product.type.length === 0 ||
                        product.price.length === 0 ||
                        product.manufacturingDate.length === 0
                    ) {
                        handleOpenAlertRequiredFields();
                        return;
                    }
                    if(
                        ( (isNaN(product.price) && isNaN(parseInt(product.price))) || parseInt(product.price) <= 0) ||
                        ( (isNaN(product.weight) && isNaN(parseInt(product.weight))) || parseInt(product.weight) < 0)
                    ) {
                        handleOpenAlertValidation();
                        return;
                    }
                    let requestProduct = {
                        ...product,
                        manufacturingDate: product.manufacturingDate.toISOString()
                    }
                    console.log(requestProduct);
                    client.updateProduct(requestProduct).then(r => {
                        navigate("/products");
                    })
                }}>
                    Update product!
                </Button>
                <Divider/>
                <TextField
                    required
                    value={`${product.name}`}
                    label="Name"
                    margin="dense"
                    onChange={e => onChange("name", e.target.value)}
                    helperText="Please enter the name of the product"
                />
                <TextField
                    required
                    label="Price"
                    value={`${product.price}`}
                    margin="dense"
                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                    onChange={e => onChange("price", e.target.value)}
                    helperText="Please enter the price that must be over 0"
                />
                <TextField
                    required
                    label="Weight"
                    value={`${product.weight}`}
                    margin="dense"
                    onChange={e => onChange("weight", e.target.value)}
                    helperText="Please enter the weight of the product"
                />
                <TextField
                    required
                    label="Type"
                    margin="dense"
                    value={`${product.type}`}
                    onChange={e => onChange("type", e.target.value)}
                    helperText="Please enter the type of product"
                />
                <TextField
                    required
                    label="Manufacturing Date"
                    value={`${product.manufacturingDate}`}
                    margin="dense"
                    onChange={e => onChange("manufacturingDate", e.target.value)}
                    helperText="Please enter the manufacturing date of the product"
                />
                <Divider/>
                <Paper>
                    <Typography variant="h5">
                        Shops with {productName}
                    </Typography>
                    <List>
                        {product.shopDtos.map((shop) => (
                            <ListItem>
                                <ListItemText
                                    primary={`${shop.name}`}
                                />
                            </ListItem>
                        ))}
                    </List>
                </Paper>
            </Paper>
            <Snackbar open={openAlertRequiredFields} autoHideDuration={6000} onClose={handleCloseAlertRequiredFields}>
                <Alert onClose={handleCloseAlertRequiredFields} severity="error" sx={{ width: '100%' }}>
                    Required fields are not filled!
                </Alert>
            </Snackbar>
            <Snackbar open={openAlertValidation} autoHideDuration={6000} onClose={handleCloseAlertValidation}>
                <Alert onClose={handleCloseAlertValidation} severity="error" sx={{ width: '100%' }}>
                    Required fields are not valid!
                </Alert>
            </Snackbar>
        </React.Fragment>
    )
}
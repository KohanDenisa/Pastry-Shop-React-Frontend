import { Snackbar, Alert, Typography, Paper, Button, Divider, TextField } from "@mui/material";
import React, { useState } from "react";
import API from "../API/API";
import { useNavigate } from "react-router-dom";

const client = new API();

export default function CreateProductView(){
    const [product, setProduct] = useState({
        name: "",
        price: "",
        weight: "",
        type: "",
        manufacturingDate: new Date(),
        shops: []
    })

    const [openAlertRequiredFields, setOpenAlertRequiredFields] = useState(false);
    const [openAlertValidation, setOpenAlertValidation] = useState(false);

    let navigate = useNavigate();

    const onChange = (property, value) => {
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
                    Add new Product
                </Typography>
                <Divider/>
                <TextField
                    required
                    label="Name"
                    margin="dense"
                    onChange={e => onChange("name", e.target.value)}
                    helperText="Please enter the name of the product"
                />
                <TextField
                    required
                    label="Price"
                    margin="dense"
                    onChange={e => onChange("price", e.target.value)}
                    helperText="Please enter the price that must be over 0"
                />
                <TextField
                    required
                    label="Weight"
                    margin="dense"
                    onChange={e => onChange("weight", e.target.value)}
                    helperText="Please enter the weight of the product"
                />
                <TextField
                    required
                    label="Type"
                    margin="dense"
                    onChange={e => onChange("type", e.target.value)}
                    helperText="Please enter the type of product"
                />
                <Divider/>
                <Divider/>
                <Button variant="contained" color="success" onClick={() => {
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
                    client.insertProduct(product).then(r => {
                        navigate("/products");
                    })
                }}>
                    Add product!
                </Button>
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
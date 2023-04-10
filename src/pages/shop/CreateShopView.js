import { Snackbar, Alert, Typography, Paper, Button, Divider, TextField } from "@mui/material";
import React, { useState } from "react";
import API from "../API/API";
import { useNavigate } from "react-router-dom";

const client = new API();

export default function CreateShopView(){
    const [shop, setShop] = useState({
        name: "",
        nrOfEmployees: "",
        location: "",
        type: "",
        years: "",
        employees: [],
        products: []
    })

    const [openAlertRequiredFields, setOpenAlertRequiredFields] = useState(false);
    const [openAlertValidation, setOpenAlertValidation] = useState(false);

    let navigate = useNavigate();

    const onChange = (property, value) => {
        setShop({
            ...shop,
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
                    Add new Shop
                </Typography>
                <Divider/>
                <TextField
                    required
                    label="Name"
                    margin="dense"
                    onChange={e => onChange("name", e.target.value)}
                    helperText="Please enter the name of the shop"
                />
                <TextField
                    required
                    label="Number Of Employees"
                    margin="dense"
                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                    onChange={e => onChange("nrOfEmployees", e.target.value)}
                    helperText="Please enter the number of employees that must be over 0"
                />
                <TextField
                    required
                    label="Location"
                    margin="dense"
                    onChange={e => onChange("location", e.target.value)}
                    helperText="Please enter the location of the shop"
                />
                <TextField
                    required
                    label="Type"
                    margin="dense"
                    onChange={e => onChange("type", e.target.value)}
                    helperText="Please enter the type of shop"
                />
                <TextField
                    required
                    label="Years"
                    margin="dense"
                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                    onChange={e => onChange("years", e.target.value)}
                    helperText="Please the years of the shop that must not be a negative number"
                />
                <Divider/>
                <Divider/>
                <Button variant="contained" color="success" onClick={() => {
                    if(
                        shop.name.length === 0 ||
                        shop.location.length === 0 ||
                        shop.type.length === 0 ||
                        shop.nrOfEmployees.length === 0 ||
                        shop.years.length === 0
                    ) {
                        handleOpenAlertRequiredFields();
                        return;
                    }
                    if(
                        ( (isNaN(shop.nrOfEmployees) && isNaN(parseInt(shop.nrOfEmployees))) || parseInt(shop.nrOfEmployees) <= 0) ||
                        ( (isNaN(shop.years) && isNaN(parseInt(shop.years))) || parseInt(shop.years) < 0)
                    ) {
                        handleOpenAlertValidation();
                        return;
                    }
                    client.insertShop(shop).then(r => {
                        navigate("/shops");
                    })
                }}>
                    Add shop!
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
import { Snackbar, Alert, Typography, Paper, Button, Divider, TextField, ListItemAvatar, List, ListItem, Avatar, ListItemText } from "@mui/material";
import React, { useEffect, useState } from "react";
import ShopsAPI from "./ShopsAPI";
import { useNavigate, useParams } from "react-router-dom";
import { Person2 } from "@mui/icons-material";

const client = new ShopsAPI();

export default function UpdateShopView(){
    const { index } = useParams();
    const [shopName, setShopName] = useState("");

    const [shop, setShop] = useState({
        name: "",
        nrOfEmployees: "",
        location: "",
        type: "",
        years: "",
        employees: [],
        products: []
    })

    useEffect(() => {
        async function fetchData(){
            return await client.loadShopId(index);
        }

        fetchData().then(u => {
            setShopName(u.name);
            setShop(u);
        })
    }, [index])

    const [openAlertRequiredFields, setOpenAlertRequiredFields] = useState(false);
    const [openAlertValidation, setOpenAlertValidation] = useState(false);
    const [disableUpdate, setDisableUpdate] = useState(true);

    let navigate = useNavigate();

    const onChange = (property, value) => {
        setDisableUpdate(false);
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
                    {shopName} Details
                </Typography>
                <Button disabled={disableUpdate} variant="contained" color="success" onClick={() => {
                    console.log(shop)
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
                    client.updateShop(shop).then(r => {
                        navigate("/shops");
                    })
                }}>
                    Update shop!
                </Button>
                <Divider/>
                <TextField
                    required
                    value={`${shop.name}`}
                    label="Name"
                    margin="dense"
                    onChange={e => onChange("name", e.target.value)}
                    helperText="Please enter the name of the shop"
                />
                <TextField
                    required
                    label="Number Of Employees"
                    value={`${shop.nrOfEmployees}`}
                    margin="dense"
                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                    onChange={e => onChange("nrOfEmployees", e.target.value)}
                    helperText="Please enter the number of employees that must be over 0"
                />
                <TextField
                    required
                    label="Location"
                    value={`${shop.location}`}
                    margin="dense"
                    onChange={e => onChange("location", e.target.value)}
                    helperText="Please enter the location of the shop"
                />
                <TextField
                    required
                    label="Type"
                    margin="dense"
                    value={`${shop.type}`}
                    onChange={e => onChange("type", e.target.value)}
                    helperText="Please enter the type of shop"
                />
                <TextField
                    required
                    label="Years"
                    value={`${shop.years}`}
                    margin="dense"
                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                    onChange={e => onChange("years", e.target.value)}
                    helperText="Please the years of the shop that must not be a negative number"
                />
                <Divider/>
                <Typography variant="h5">
                    Employees of {shopName}
                </Typography>
                <Paper>
                    <List>
                        {shop.employees.map((employee) => (
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                        <Person2/>
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={`${employee.name}`}
                                    secondary={`Salary: ${employee.salary} RON, Age: ${employee.age}`}
                                />
                            </ListItem>
                        ))}
                    </List>
                </Paper>
                <Divider/>
                <Paper>
                    <Typography variant="h5">
                        Products of {shopName}
                    </Typography>
                    <List>
                        {shop.products.map((product) => (
                            <ListItem>
                                <ListItemText
                                    primary={`${product.name}`}
                                    secondary={`Price: ${product.price}, Weight: ${product.weight}`}
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
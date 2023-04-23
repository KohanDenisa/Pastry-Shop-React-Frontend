import { Snackbar, Alert, Typography, Paper, Button, Divider, TextField } from "@mui/material";
import React, { useState } from "react";
import API from "../API/API";
import { useNavigate } from "react-router-dom";

const client = new API();

export default function CreateEmployeeView(){
    const [employee, setEmployee] = useState({
        name: "",
        age: "",
        gender: "",
        salary: ""
    })

    const [openAlertRequiredFields, setOpenAlertRequiredFields] = useState(false);
    const [openAlertValidation, setOpenAlertValidation] = useState(false);

    let navigate = useNavigate();

    const onChange = (property, value) => {
        setEmployee({
            ...employee,
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
                    Add new Employee
                </Typography>
                <Divider/>
                <TextField
                    required
                    label="Name"
                    margin="dense"
                    onChange={e => onChange("name", e.target.value)}
                    helperText="Please enter the name of the employee"
                />
                <TextField
                    required
                    label="Age"
                    margin="dense"
                    onChange={e => onChange("age", e.target.value)}
                    helperText="Please enter the age that must be over 0"
                />
                <TextField
                    required
                    label="Gender"
                    margin="dense"
                    onChange={e => onChange("gender", e.target.value)}
                    helperText="Please enter the gender of the employee"
                />
                <TextField
                    required
                    label="Salary"
                    margin="dense"
                    onChange={e => onChange("salary", e.target.value)}
                    helperText="Please enter the salary of employee"
                />
                <Divider/>
                <Divider/>
                <Button variant="contained" color="success" onClick={() => {
                    if(
                        employee.name.length === 0 ||
                        employee.gender.length === 0 ||
                        employee.salary.length === 0 ||
                        employee.age.length === 0 
                    ) {
                        handleOpenAlertRequiredFields();
                        return;
                    }
                    if(
                        ( (isNaN(employee.age) && isNaN(parseInt(employee.age))) || parseInt(employee.age) <= 0) ||
                        ( (isNaN(employee.salary) && isNaN(parseInt(employee.salary))) || parseInt(employee.salary) < 0)
                    ) {
                        handleOpenAlertValidation();
                        return;
                    }
                    client.insertEmployee(employee).then(r => {
                        navigate("/employees");
                    })
                }}>
                    Add employee!
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
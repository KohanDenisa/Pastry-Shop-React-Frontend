import { Snackbar, Alert, Typography, Paper, Button, Divider, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import API from "../API/API";
import { useNavigate, useParams } from "react-router-dom";

const client = new API();

export default function UpdateEmployeeView(){
    const { index } = useParams();
    const [employeeName, setEmployeeName] = useState("");

    const [employee, setEmployee] = useState({
        name: "",
        age: "",
        gender: "",
        salary: ""
    })

    useEffect(() => {
        async function fetchData(){
            return await client.loadEmployeeId(index);
        }

        fetchData().then(u => {
            setEmployeeName(u.name);
            setEmployee(u);
        })
    }, [index])

    const [openAlertRequiredFields, setOpenAlertRequiredFields] = useState(false);
    const [openAlertValidation, setOpenAlertValidation] = useState(false);
    const [disableUpdate, setDisableUpdate] = useState(true);

    let navigate = useNavigate();

    const onChange = (property, value) => {
        setDisableUpdate(false);
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
                    {employeeName} Details
                </Typography>
                <Button disabled={disableUpdate} variant="contained" color="success" onClick={() => {
                    console.log(employee)
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
                    client.updateEmployee(employee).then(r => {
                        navigate("/employees");
                    })
                }}>
                    Update employee!
                </Button>
                <Divider/>
                <TextField
                    required
                    value={`${employee.name}`}
                    label="Name"
                    margin="dense"
                    onChange={e => onChange("name", e.target.value)}
                    helperText="Please enter the name of the employee"
                />
                <TextField
                    required
                    label="Age"
                    value={`${employee.age}`}
                    margin="dense"
                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                    onChange={e => onChange("age", e.target.value)}
                    helperText="Please enter the age that must be over 0"
                />
                <TextField
                    required
                    label="Gender"
                    value={`${employee.gender}`}
                    margin="dense"
                    onChange={e => onChange("gender", e.target.value)}
                    helperText="Please enter the gender of the employee"
                />
                <TextField
                    required
                    label="Salary"
                    margin="dense"
                    value={`${employee.salary}`}
                    onChange={e => onChange("salary", e.target.value)}
                    helperText="Please enter the salary of employee"
                />
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
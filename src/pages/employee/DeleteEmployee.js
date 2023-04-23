import React, { useState, useEffect } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import API from "../API/API";
import { Typography, Button } from "@mui/material";

const client = new API();

export default function DeleteEmployeeView() {
    let navigate = useNavigate();
    const { index } = useParams();

    const [employeeName, setEmployeeName] = useState("");

    useEffect(() => {
        async function fetchData(){
            return await client.loadEmployeeId(index);
        }

        fetchData().then(u => {
            setEmployeeName(u.name);
        })
    }, [index])

    return (
        <React.Fragment>
            <Typography>
                Delete {employeeName}?
            </Typography>
            <Button variant="outlined" color="error" onClick={() => {
                client.removeEmployeeId(index).then(() => {
                    navigate("/employees");
                });
            }}>
                Yes!
            </Button>
            <Button component={Link} to="/employees" variant="contained" color="success">
                Cancel
            </Button>
        </React.Fragment>
    )
}
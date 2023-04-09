import { TableRow, Table, TableContainer, TableCell, Paper, TableHead, TableBody, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import API from "../API/API";
import { Link } from "react-router-dom";

const client = new API();

export default function ShopsAvgSalary() {
    const [rows, setRows] = useState([]);

    useEffect(() => {
        async function fetchData(){
            return await client.loadAllShopsByAvgSalary();
        }

        fetchData().then(u => {
            setRows([...u]);
        })
    })

    return (
        <React.Fragment>
            <Button component={Link} to="/shops">
                Go Back
            </Button>
            <TableContainer component={Paper}>
                <Table aria-label="Sort Shops Tabel">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">ID</TableCell>
                            <TableCell align="center">Name</TableCell>
                            <TableCell align="center">Number Of Employees</TableCell>
                            <TableCell align="center">Location</TableCell>
                            <TableCell align="center">Type</TableCell>
                            <TableCell align="center">Years</TableCell>
                            <TableCell align="center">Average Salary</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="center">{row.id}</TableCell>
                                <TableCell align="center">{row.name}</TableCell>
                                <TableCell align="center">{row.nrOfEmployees}</TableCell>
                                <TableCell align="center">{row.location}</TableCell>
                                <TableCell align="center">{row.type}</TableCell>
                                <TableCell align="center">{row.years}</TableCell>
                                <TableCell align="center">{row.averageSalary}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </React.Fragment>
    )
}
import { Pagination, Divider, Select, MenuItem, IconButton, Button, Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import React, { useEffect } from "react";
// NavigateNext, NavigateBefore
import { Edit, Delete } from "@mui/icons-material"
import API from "../API/API";
import { Link } from "react-router-dom";

const client = new API();

const items = [
    { value: '10', label: '10' },
    { value: '25', label: '25' },
    { value: '50', label: '50' },
];

export default function EmployeesView() {
    const [rows, setRows] = React.useState([]);
    const [searchValue, setSearchValue] = React.useState(null);

    const [page, setPage] = React.useState(1);
    const [numPages, setNumPages] = React.useState(0);
    const [size, setSize] = React.useState(items[0].value);

    useEffect(() => {
        async function fetchData(page, size){
            return await client.loadEmployeePage(page - 1, size);
        }
        
        fetchData(page, size).then(u => {
            let rowsOnMount = u;
            if(searchValue){
                rowsOnMount = rowsOnMount.filter((row) => {
                    return row.age.toString().includes(searchValue) || row.salary.toString().includes(searchValue)
                })
            }
            setRows(rowsOnMount);
        })
    }, [page, size, searchValue])

    useEffect(() => {
        async function fetchData (size) {
            return await client.getNumberOfPagesEmployees(size);
        }

        fetchData(size).then(u => {
            setNumPages(u[0]);
        })
    }, [size]);

    const handleChange = (event) => {
        setSize(event.target.value);
    };

    // const onNextPage = () => {
    //     setPage((prevPage) => prevPage + 1);
    // }

    // const onPrevPage = () => {
    //     setPage((prevPage) => prevPage - 1);
    // }

    return (
        <React.Fragment>
            <Paper sx={{ display: "flex" }}>
                <Button component={Link} to="/employees/create_new" variant="outlined" color="success">
                    Create new employee!
                </Button>
            </Paper>
            <Divider/>
            <Box sx={{ display: 'flex', alignItems: 'flex-end', margin: 0.5 }}>
                <Typography sx={{ color: 'action.active', mr: 1, my: 0.5 }}>
                    Search by a numeric value: 
                </Typography>
                <TextField
                    id="search-bar"
                    className="text"
                    onChange={(e) => {
                        setSearchValue(e.target.value);
                    }}
                    label="Enter a numeric value"
                    variant="standard"
                    placeholder="Search..."
                    size="small"
                />
            </Box>
            <Divider/>
            <TableContainer component={Paper}>
                <Table aria-label="Sort Employees Tabel">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">ID</TableCell>
                            <TableCell align="center">Name</TableCell>
                            <TableCell align="center">Age</TableCell>
                            <TableCell align="center">Gender</TableCell>
                            <TableCell align="center">Salary</TableCell>
                            <TableCell align="center">Edit</TableCell>
                            <TableCell align="center">Delete</TableCell>
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
                                <TableCell align="center">{row.age}</TableCell>
                                <TableCell align="center">{row.gender}</TableCell>
                                <TableCell align="center">{row.salary}</TableCell>
                                <TableCell align="center">
                                    <IconButton color="primary" aria-label="Edit Employee" component={Link} to={`/employees/${row.id}`}>
                                        <Edit/>
                                    </IconButton>
                                </TableCell>
                                <TableCell align="center">
                                    <IconButton color="primary" aria-label="Delete Employee" component={Link} to={"/employees/" + row.id + "/delete"}>
                                        <Delete/>
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <Select value={size} onChange={handleChange}>
                    {items.map((item) => (
                        <MenuItem key={item.value} value={item.value}>
                            {item.label}
                        </MenuItem>
                    ))}
                </Select>
                {/* <IconButton disabled={page === 1} color="primary" aria-label="Previos Page" onClick={onPrevPage}>
                    <NavigateBefore/>
                    Previous
                </IconButton>
                <IconButton disabled={page === numPages} color="primary" aria-label="Next Page" onClick={onNextPage}>
                    <NavigateNext/>
                    Next
                </IconButton> */}
                <Pagination variant="outlined" color="secondary" count={numPages} showFirstButton showLastButton onChange={(event, selectedPage) => {setPage(selectedPage)}} />
            </TableContainer>
        </React.Fragment>
    )
}
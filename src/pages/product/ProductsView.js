import { Divider, Select, MenuItem, IconButton, Button, Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { Edit, Delete, NavigateNext, NavigateBefore } from "@mui/icons-material"
import API from "../API/API";
import { Link } from "react-router-dom";

const client = new API();

const items = [
    { value: '10', label: '10' },
    { value: '25', label: '25' },
    { value: '50', label: '50' },
];

export default function ProductsView() {
    const [rows, setRows] = React.useState([]);
    const [searchValue, setSearchValue] = React.useState(null);

    const [page, setPage] = React.useState(1);
    const [numPages, setNumPages] = React.useState(0);
    const [size, setSize] = React.useState(items[0].value);

    useEffect(() => {
        async function fetchData(page, size){
            return await client.loadProductPage(page - 1, size);
        }
        
        fetchData(page, size).then(u => {
            let rowsOnMount = u;
            if(searchValue){
                rowsOnMount = rowsOnMount.filter((row) => {
                    return row.price.toString().includes(searchValue) || row.weight.toString().includes(searchValue)
                })
            }
            setRows(rowsOnMount);
        })
    }, [page, size, searchValue])

    useEffect(() => {
        async function fetchData (size) {
            return await client.getNumberOfPagesProducts(size);
        }

        fetchData(size).then(u => {
            setNumPages(u[0]);
        })
    }, [size]);

    const handleChange = (event) => {
        setSize(event.target.value);
    };

    const onNextPage = () => {
        setPage((prevPage) => prevPage + 1);
    }

    const onPrevPage = () => {
        setPage((prevPage) => prevPage - 1);
    }

    return (
        <React.Fragment>
            <Paper sx={{ display: "flex" }}>
                <Button component={Link} to="/products/create_new" variant="outlined" color="success">
                    Create new product!
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
                <Table aria-label="Sort Products Tabel">
                    { /* Replace head with example in ProductsAvgSalaryView + add 2 more column for the edit and delete buttons */ }
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">ID</TableCell>
                            <TableCell align="center">Name</TableCell>
                            <TableCell align="center">Price</TableCell>
                            <TableCell align="center">Weight</TableCell>
                            <TableCell align="center">Type</TableCell>
                            <TableCell align="center">Manufacturing date</TableCell>
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
                                <TableCell align="center">{row.price}</TableCell>
                                <TableCell align="center">{row.weight}</TableCell>
                                <TableCell align="center">{row.type}</TableCell>
                                <TableCell align="center">{row.manufacturingDate}</TableCell>
                                <TableCell align="center">
                                    <IconButton color="primary" aria-label="Edit Product" component={Link} to={`/products/${row.id}`}>
                                        <Edit/>
                                    </IconButton>
                                </TableCell>
                                <TableCell align="center">
                                    <IconButton color="primary" aria-label="Delete Product" component={Link} to={"/products/" + row.id + "/delete"}>
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
                <IconButton disabled={page === 1} color="primary" aria-label="Previos Page" onClick={onPrevPage}>
                    <NavigateBefore/>
                    Previous
                </IconButton>
                <IconButton disabled={page === numPages} color="primary" aria-label="Next Page" onClick={onNextPage}>
                    <NavigateNext/>
                    Next
                </IconButton>
            </TableContainer>
        </React.Fragment>
    )
}
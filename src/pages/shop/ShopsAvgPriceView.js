// IconButton
import { LinearProgress, Box, Pagination, Select, MenuItem, TableRow, Table, TableContainer, TableCell, Paper, TableHead, TableBody, Button } from "@mui/material";
// import { NavigateBefore, NavigateNext } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import API from "../API/API";
import { Link } from "react-router-dom";

const client = new API();

const items = [
    { value: '10', label: '10' },
    { value: '25', label: '25' },
    { value: '50', label: '50' },
];

export default function ShopsAvgPrice() {
    const [rows, setRows] = useState([]);

    const [page, setPage] = React.useState(1);
    const [numPages, setNumPages] = React.useState(0);
    const [size, setSize] = React.useState(items[0].value);

    const [loading, setLoading] = React.useState(true);

    useEffect(() => {
        async function fetchData(page, size){
            return await client.loadShopPageAvgPrice(page, size);
        }

        fetchData(page - 1, size).then(u => {
            setRows(u);
            setLoading(false);
        })
        console.log(page);
    }, [size, page])

    useEffect(() => {
        async function fetchData (size) {
            return await client.getNumberOfPagesAvgPrice(size);
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
            <Button component={Link} to="/shops">
                Go Back
            </Button>
            {loading ? (
                <Box sx={{ width: '100%' }}>
                    <LinearProgress variant="query" />
                </Box>
            ) : (
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
                            <TableCell align="center">Average Price</TableCell>
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
                                <TableCell align="center">{row.averagePrice === "NaN" ? "No Products available" : row.averagePrice}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            )}
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
            <Pagination variant="outlined" color="secondary" count={numPages} showFirstButton showLastButton onChange={(event, selectedPage) => {setPage(selectedPage); setLoading(true)}} />
        </React.Fragment>
    )
}
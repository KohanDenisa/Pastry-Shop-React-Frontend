import { Divider, IconButton, Button, Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, TextField, Typography } from "@mui/material";
import React, { useCallback, useEffect } from "react";
import { Edit, Delete, Add } from "@mui/icons-material"
import API from "../API/API";
import PropTypes from 'prop-types';
import { visuallyHidden } from '@mui/utils';
import { Link } from "react-router-dom";

const client = new API();

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

const headCells = [
    {
        id: 'id',
        numeric: true,
        disablePadding: false,
        label: 'ID',
    },
    {
        id: 'name',
        numeric: false,
        disablePadding: false,
        label: 'Name',
    },
    {
        id: 'nrOfEmployees',
        numeric: true,
        disablePadding: false,
        label: 'Number of Employees',
    },
    {
        id: 'location',
        numeric: false,
        disablePadding: false,
        label: 'Location',
    },
    {
        id: 'type',
        numeric: false,
        disablePadding: false,
        label: 'Type',
    },
    {
        id: 'years',
        numeric: true,
        disablePadding: false,
        label: 'Years',
    }
]

const DEFAULT_ORDER = 'asc';
const DEFAULT_ORDER_BY = 'id';

function SortTableHead(props) {
    const { order, orderBy, onRequestSort } = props;
    const createSortHandler = (newOrderBy) => (event) => {
        onRequestSort(event, newOrderBy);
    }

    return (
        <TableHead>
            <TableRow>
            {headCells.map((headCell) => (
                <TableCell
                    key={headCell.id}
                    align="center"
                    padding="normal"
                    sortDirection={orderBy === headCell.id ? order : false}
                >
                    <TableSortLabel
                    active={orderBy === headCell.id}
                    direction={orderBy === headCell.id ? order : 'asc'}
                    onClick={createSortHandler(headCell.id)}
                    >
                    {headCell.label}
                    {orderBy === headCell.id ? (
                        <Box component="span" sx={visuallyHidden}>
                            {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                        </Box>
                    ) : null}
                    </TableSortLabel>
                </TableCell>
                ))}
                <TableCell>
                    Add Products
                </TableCell>
                <TableCell>
                    Edit
                </TableCell>
                <TableCell>
                    Remove
                </TableCell>
            </TableRow>
        </TableHead>
    )
}

SortTableHead.propTypes = {
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
};

export default function ShopsView() {
    const [rows, setRows] = React.useState([]);
    const [order, setOrder] = React.useState(DEFAULT_ORDER);
    const [orderBy, setOrderBy] = React.useState(DEFAULT_ORDER_BY);
    const [searchValue, setSearchValue] = React.useState(null);

    useEffect(() => {
        async function fetchData(){
            return await client.loadAllShops();
        }
        
        fetchData().then(u => {
            let rowsOnMount = u.slice().sort(getComparator(order, orderBy));
            if(searchValue){
                rowsOnMount = rowsOnMount.filter((row) => {
                    return row.nrOfEmployees.toString().includes(searchValue) || row.years.toString().includes(searchValue)
                })
            }
            setRows(rowsOnMount);
        })
    }, [searchValue])

    const handleRequestSort = useCallback(
        (_, newOrderBy) => {
            const isAsc = orderBy === newOrderBy && order === 'asc';
            const toggledOrder = isAsc ? 'desc' : 'asc';
            setOrder(toggledOrder);
            setOrderBy(newOrderBy);
            let sortedRows = rows.slice().sort(getComparator(toggledOrder, newOrderBy));
            setRows(sortedRows);
        },
        [order, orderBy, rows]
    );

    return (
        <React.Fragment>
            <Paper sx={{ display: "flex" }}>
                <Button component={Link} to="/shops/create_new" variant="outlined" color="success">
                    Create new shop!
                </Button>
                <Button component={Link} to="/shops/sortByAvgSalary" variant="contained">
                    See shops sorted by average salary
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
                <Table aria-label="Sort Shops Tabel">
                    <SortTableHead
                        order={order}
                        orderBy={orderBy}
                        onRequestSort={handleRequestSort}
                    />
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
                                <TableCell align="center">
                                    <IconButton color="primary" aria-label="add products shop" component={Link} to={`/shops/${row.id}/products`}>
                                        <Add/>
                                    </IconButton>
                                </TableCell>
                                <TableCell align="center">
                                    <IconButton color="primary" aria-label="edit shop" component={Link} to={`/shops/${row.id}`}>
                                        <Edit/>
                                    </IconButton>
                                </TableCell>
                                <TableCell align="center">
                                    <IconButton color="primary" aria-label="delete shop" component={Link} to={"/shops/" + row.id + "/delete"}>
                                        <Delete/>
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </React.Fragment>
    )
}
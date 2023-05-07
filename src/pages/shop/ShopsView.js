import { LinearProgress, Pagination, Divider, Select, MenuItem, IconButton, Button, Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, TextField, Typography } from "@mui/material";
import React, { useCallback, useEffect } from "react";
// NavigateNext, NavigateBefore 
import { Edit, Delete, Add } from "@mui/icons-material"
import API from "../API/API";
import PropTypes from 'prop-types';
import { visuallyHidden } from '@mui/utils';
import { Link } from "react-router-dom";

const client = new API();

// Unused in others
function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

// Unused in others
function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

// Unused in others
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

// Unused in others
const DEFAULT_ORDER = 'asc';
const DEFAULT_ORDER_BY = 'id';

// Unused in others
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
                <TableCell align="center">Enrolled Employees</TableCell>
                <TableCell>
                    Add Products
                </TableCell>
                <TableCell>Add Employees</TableCell>
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

// Unused in others
SortTableHead.propTypes = {
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
};

// is used
const items = [
    { value: '10', label: '10' },
    { value: '25', label: '25' },
    { value: '50', label: '50' },
];

export default function ShopsView() {
    const [rows, setRows] = React.useState([]);

    // next 2 are unused
    const [order, setOrder] = React.useState(DEFAULT_ORDER);
    const [orderBy, setOrderBy] = React.useState(DEFAULT_ORDER_BY);

    const [searchValue, setSearchValue] = React.useState(null);

    const [page, setPage] = React.useState(1);
    const [numPages, setNumPages] = React.useState(0);
    const [size, setSize] = React.useState(items[0].value);

    const [loading, setLoading] = React.useState(true);

    useEffect(() => {
        async function fetchData(page, size, order, orderBy){
            return await client.loadShopPage(page - 1, size, order === 'desc', orderBy);
        }
        
        fetchData(page, size, order, orderBy).then(u => {
            let rowsOnMount = u;
            if(searchValue){
                rowsOnMount = rowsOnMount.filter((row) => {
                    return row.nrOfEmployees.toString().includes(searchValue) || row.years.toString().includes(searchValue)
                })
            }
            setRows(rowsOnMount);
            setLoading(false);
        })
    }, [page, size, order, orderBy, searchValue])

    useEffect(() => {
        async function fetchData (size) {
            return await client.getNumberOfPagesShops(size);
        }

        fetchData(size).then(u => {
            setNumPages(u[0]);
        })
    }, [size]);

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
                <Button component={Link} to="/shops/create_new" variant="outlined" color="success">
                    Create new shop!
                </Button>
                { /* Next 2 buttons */}
                <Button component={Link} to="/shops/sortByAvgSalary" variant="contained">
                    See shops sorted by average salary
                </Button>
                <Button component={Link} to="/shops/sortByAvgPrice" variant="contained">
                    See shops sorted by average price
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
            {loading ? (
                <Box sx={{ width: '100%' }}>
                    <LinearProgress variant="query" />
                </Box>
            ) : (
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
                                <TableCell align="center">{row.enrolledEmployees}</TableCell>
                                <TableCell align="center">
                                    <IconButton color="primary" aria-label="Add Products Shop" component={Link} to={`/shops/${row.id}/products`}>
                                        <Add/>
                                    </IconButton>
                                </TableCell>
                                <TableCell align="center">
                                    <IconButton color="primary" aria-label="Add Employees Shop" component={Link} to={`/shops/${row.id}/employees`}>
                                        <Add/>
                                    </IconButton>
                                </TableCell>
                                <TableCell align="center">
                                    <IconButton color="primary" aria-label="Edit Shop" component={Link} to={`/shops/${row.id}`}>
                                        <Edit/>
                                    </IconButton>
                                </TableCell>
                                <TableCell align="center">
                                    <IconButton color="primary" aria-label="Delete Shop" component={Link} to={"/shops/" + row.id + "/delete"}>
                                        <Delete/>
                                    </IconButton>
                                </TableCell>
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
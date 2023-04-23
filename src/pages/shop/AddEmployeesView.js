import React, { useEffect, useState } from "react";
import {
  Select,
  MenuItem,
  Button,
  List,
  ListItem,
  ListItemText,
  Typography, TableCell, Table, TableContainer, TableHead, TableRow, TableBody, Paper, IconButton
} from "@mui/material";
import API from "../API/API";
import { NavigateNext, NavigateBefore, Add } from "@mui/icons-material"
import { useNavigate, useParams } from "react-router-dom";

const client = new API();

const items = [
  { value: '10', label: '10' },
  { value: '25', label: '25' },
  { value: '50', label: '50' },
];

const AddEmployeesView = () => {
  let navigate = useNavigate();
  const [listItems, setListItems] = useState([]);
  const { index } = useParams();

  const [page, setPage] = React.useState(1);
  const [numPages, setNumPages] = React.useState(0);
  const [size, setSize] = React.useState(items[0].value);

  const [rows, setRows] = React.useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(JSON.stringify(listItems));
    client.addEmployeesToShop(index, listItems).then(() => {
      setListItems([]);
      navigate("/shops");
    })
  };

  const [shopName, setShopName] = React.useState("");

  useEffect(() => {
    async function fetchDataName(){
        return await client.loadShopId(index);
    }

    fetchDataName().then(u => {
        setShopName(u.name);
    })
  }, [index])

  useEffect(() => {
    async function fetchData(page, size){
        return await client.loadEmployeePage(page - 1, size);
    }
    
    fetchData(page, size).then(u => {
        setRows(u);
    })
  }, [page, size])

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

  const onNextPage = () => {
      setPage((prevPage) => prevPage + 1);
  }

  const onPrevPage = () => {
      setPage((prevPage) => prevPage - 1);
  }

  return (
    <React.Fragment>
        <Typography variant="h5">
            Add employees to shop with name {shopName}
        </Typography>
        <form onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", alignItems: "center"}} >
          <TableContainer component={Paper}>
            <Table aria-label="Sort Employee Tabel">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">ID</TableCell>
                        <TableCell align="center">Name</TableCell>
                        <TableCell align="center">Age</TableCell>
                        <TableCell align="center">Gender</TableCell>
                        <TableCell align="center">Salary</TableCell>
                        <TableCell align="center">Add employee</TableCell>
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
                              <IconButton disabled={listItems.find(item => item === row)} color="success" onClick={() => setListItems([...listItems, row])}>
                                <Add />
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
          <Typography variant="h6">
              List of employees that will be added: 
          </Typography>
          <div>
              <List>
              {listItems.map((item, id) => (
                  <ListItem key={id}>
                      <ListItemText primary={item.name} />
                  </ListItem>
              ))}
              </List>
          </div>
          <Button type="submit" variant="contained">
              Submit
          </Button>
        </form>
    </React.Fragment>
  );
};

export default AddEmployeesView;

import React, { useState, useEffect } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import API from "../API/API";
import { Typography, Button } from "@mui/material";

const client = new API();

export default function DeleteProductView() {
    let navigate = useNavigate();
    const { index } = useParams();

    const [productName, setProductName] = useState("");

    useEffect(() => {
        async function fetchData(){
            return await client.loadProductId(index);
        }

        fetchData().then(u => {
            setProductName(u.name);
        })
    }, [index])

    return (
        <React.Fragment>
            <Typography>
                Delete {productName}?
            </Typography>
            <Button variant="outlined" color="error" onClick={() => {
                client.removeProductId(index).then(() => {
                    navigate("/products");
                });
            }}>
                Yes!
            </Button>
            <Button component={Link} to="/products" variant="contained" color="success">
                Cancel
            </Button>
        </React.Fragment>
    )
}
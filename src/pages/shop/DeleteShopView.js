import React, { useState, useEffect } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import API from "../API/API";
import { Typography, Button } from "@mui/material";

const client = new API();

export default function DeleteShopView() {
    let navigate = useNavigate();
    const { index } = useParams();

    const [shopName, setShopName] = useState("");

    useEffect(() => {
        async function fetchData(){
            return await client.loadShopId(index);
        }

        fetchData().then(u => {
            setShopName(u.name);
        })
    }, [index])

    return (
        <React.Fragment>
            <Typography>
                Delete {shopName}?
            </Typography>
            <Button variant="outlined" color="error" onClick={() => {
                client.removeShopId(index).then(() => {
                    navigate("/shops");
                });
            }}>
                Yes!
            </Button>
            <Button component={Link} to="/shops" variant="contained" color="success">
                Cancel
            </Button>
        </React.Fragment>
    )
}
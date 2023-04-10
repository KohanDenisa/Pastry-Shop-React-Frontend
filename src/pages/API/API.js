const BASE_URL = "http://localhost:8080"

export default class API {
    loadAllShops = async () => {
        return fetch( `${BASE_URL}/shops`,{
            method : "GET",
            headers : {
                "Application-Control-Allow-Origin" : "*",
                "Content-Type" : "application/json",
            }
        }).then(response => {
            return response.json();
        })
    }

    loadAllShopsByAvgSalary = async() => {
        return fetch( `${BASE_URL}/shops/sortByAvgSalary`,{
            method : "GET",
            headers : {
                "Application-Control-Allow-Origin" : "*",
                "Content-Type" : "application/json",
            }
        }).then(response => {
            return response.json();
        })
    }

    loadShopId = async (id) => {
        return fetch( `${BASE_URL}/shops/${id}`, {
            method : "GET",
            headers : {
                "Application-Control-Allow-Origin" : "*",
                "Content-Type" : "application/json",
            }
        }).then(response => {
            return response.json()
        })
    }

    insertShop = async (shop) => {
        const response = await fetch(`${BASE_URL}/shops`, {
            method: "POST",
            headers: {
                "Application-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(shop)
        })
        return await response.json();
    }

    updateShop = async (shop) => {
        return fetch( `${BASE_URL}/shops`, {
            method: "PUT",
            headers: {
                "Application-Control-Allow-Origin" : "*",
                "Content-Type" : "application/json",
            },
            body: JSON.stringify(shop)
        }).then(response => {
            return response.json();
        }) 
    }

    removeShopId = async (id) => {
        return fetch( `${BASE_URL}/shops/${id}`, {
            method : "DELETE",
            headers : {
                "Application-Control-Allow-Origin" : "*",
            }
        })
    }

    addProductsToShop = async(id, listItems) => {
        return fetch( `${BASE_URL}/shops/${id}/products`, {
            method: "POST",
            headers: {
                "Application-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(listItems)
        }).then(response => {
            return response.json();
        }) 
    }

    loadAllProducts = async () => {
        return fetch( `${BASE_URL}/products`, {
            method : "GET",
            headers : {
                "Application-Control-Allow-Origin" : "*",
                "Content-Type" : "application/json",
            }
        }).then(response => {
            return response.json();
        });
    }

    loadAllEmployees = async () => {
        return fetch( `${BASE_URL}/employee`, {
            method : "GET",
            headers : {
                "Application-Control-Allow-Origin" : "*",
                "Content-Type" : "application/json",
            }
        }).then(response => {
            return response.json();
        });
    }
}
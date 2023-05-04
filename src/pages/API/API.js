//const BASE_URL = "https://localhost:8080"
const BASE_URL = "https://kohandenisa.cloudns.nz"

export default class API {
    getNumberOfPagesShops = async(size) => {
        return fetch( `${BASE_URL}/shops/totalPages?size=${size}`,{
            method : "GET",
            headers : {
                "Application-Control-Allow-Origin" : "*",
                "Content-Type" : "application/json",
                "mode" : "no-cors"
            }
        }).then(response => {
            console.log(response);
            return response.json();
        })
    }

    loadShopPage = async (page, size, descending, field) => {
        return fetch(`${BASE_URL}/shops?page=${page}&size=${size}&descending=${descending}&field=${field}`, {
            method : "GET",
            headers : {
                "Application-Control-Allow-Origin" : "*",
                "Content-Type" : "application/json",
                "mode" : "no-cors"
            }
        }).then(response => {
            return response.json();
        })
    }

    loadAllShops = async () => {
        return fetch( `${BASE_URL}/shops`,{
            method : "GET",
            headers : {
                "Application-Control-Allow-Origin" : "*",
                "Content-Type" : "application/json",
                "mode" : "no-cors"
            }
        }).then(response => {
            return response.json();
        })
    }

    getNumberOfPagesAvgSalary = async(size) => {
        return fetch( `${BASE_URL}/shops/sortByAvgSalary/totalPages?size=${size}`,{
            method : "GET",
            headers : {
                "Application-Control-Allow-Origin" : "*",
                "Content-Type" : "application/json",
            }
        }).then(response => {
            return response.json();
        })
    }

    loadShopPageAvgSalary = async (page, size) => {
        return fetch(`${BASE_URL}/shops/sortByAvgSalary?page=${page}&size=${size}`, {
            method : "GET",
            headers : {
                "Application-Control-Allow-Origin" : "*",
                "Content-Type" : "application/json",
                "mode" : "no-cors"
            }
        }).then(response => {
            return response.json();
        })
    }

    getNumberOfPagesAvgPrice = async(size) => {
        return fetch( `${BASE_URL}/shops/sortByAvgPrice/totalPages?size=${size}`,{
            method : "GET",
            headers : {
                "Application-Control-Allow-Origin" : "*",
                "Content-Type" : "application/json",
                "mode" : "no-cors"
            }
        }).then(response => {
            return response.json();
        })
    }

    loadShopPageAvgPrice = async (page, size) => {
        return fetch(`${BASE_URL}/shops/sortByAvgPrice?page=${page}&size=${size}`, {
            method : "GET",
            headers : {
                "Application-Control-Allow-Origin" : "*",
                "Content-Type" : "application/json",
                "mode" : "no-cors"
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
                "mode" : "no-cors"
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
                "mode" : "no-cors"
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
                "mode" : "no-cors"
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
                "mode" : "no-cors"
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
                "mode" : "no-cors"
            }
        })
    }

    addEmployeesToShop = async(id, listItems) => {
        return fetch( `${BASE_URL}/shops/${id}/employees`, {
            method: "POST",
            headers: {
                "Application-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
                "mode" : "no-cors"
            },
            body: JSON.stringify(listItems)
        }).then(response => {
            return response.json();
        }) 
    }

    addProductsToShop = async(id, listItems) => {
        return fetch( `${BASE_URL}/shops/${id}/products`, {
            method: "POST",
            headers: {
                "Application-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
                "mode" : "no-cors"
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
                "mode" : "no-cors"
            }
        }).then(response => {
            return response.json();
        });
    }

    getNumberOfPagesProducts = async(size) => {
        return fetch( `${BASE_URL}/products/totalPages?size=${size}`,{
            method : "GET",
            headers : {
                "Application-Control-Allow-Origin" : "*",
                "Content-Type" : "application/json",
                "mode" : "no-cors"
            }
        }).then(response => {
            return response.json();
        })
    }

    loadProductPage = async (page, size) => {
        return fetch(`${BASE_URL}/products?page=${page}&size=${size}`, {
            method : "GET",
            headers : {
                "Application-Control-Allow-Origin" : "*",
                "Content-Type" : "application/json",
                "mode" : "no-cors"
            }
        }).then(response => {
            return response.json();
        })
    }

    loadProductId = async (id) => {
        return fetch( `${BASE_URL}/products/${id}`, {
            method : "GET",
            headers : {
                "Application-Control-Allow-Origin" : "*",
                "Content-Type" : "application/json",
                "mode" : "no-cors"
            }
        }).then(response => {
            return response.json()
        })
    }

    insertProduct = async (product) => {
        const response = await fetch(`${BASE_URL}/products`, {
            method: "POST",
            headers: {
                "Application-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
                "mode" : "no-cors"
            },
            body: JSON.stringify(product)
        })
        return await response.json();
    }

    updateProduct = async (product) => {
        return fetch( `${BASE_URL}/products`, {
            method: "PUT",
            headers: {
                "Application-Control-Allow-Origin" : "*",
                "Content-Type" : "application/json",
                "mode" : "no-cors"
            },
            body: JSON.stringify(product)
        }).then(response => {
            return response.json();
        }) 
    }

    removeProductId = async (id) => {
        return fetch( `${BASE_URL}/products/${id}`, {
            method : "DELETE",
            headers : {
                "Application-Control-Allow-Origin" : "*",
                "mode" : "no-cors"
            }
        })
    }

    getNumberOfPagesEmployees = async(size) => {
        return fetch( `${BASE_URL}/employees/totalPages?size=${size}`,{
            method : "GET",
            headers : {
                "Application-Control-Allow-Origin" : "*",
                "Content-Type" : "application/json",
                "mode" : "no-cors"
            }
        }).then(response => {
            return response.json();
        })
    }

    loadEmployeePage = async (page, size) => {
        return fetch(`${BASE_URL}/employees?page=${page}&size=${size}`, {
            method : "GET",
            headers : {
                "Application-Control-Allow-Origin" : "*",
                "Content-Type" : "application/json",
                "mode" : "no-cors"
            }
        }).then(response => {
            return response.json();
        })
    }

    loadEmployeeId = async (id) => {
        return fetch( `${BASE_URL}/employees/${id}`, {
            method : "GET",
            headers : {
                "Application-Control-Allow-Origin" : "*",
                "Content-Type" : "application/json",
                "mode" : "no-cors"
            }
        }).then(response => {
            return response.json()
        })
    }

    insertEmployee = async (employee) => {
        const response = await fetch(`${BASE_URL}/employees`, {
            method: "POST",
            headers: {
                "Application-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
                "mode" : "no-cors"
            },
            body: JSON.stringify(employee)
        })
        return await response.json();
    }

    updateEmployee = async (employee) => {
        return fetch( `${BASE_URL}/employees`, {
            method: "PUT",
            headers: {
                "Application-Control-Allow-Origin" : "*",
                "Content-Type" : "application/json",
            },
            body: JSON.stringify(employee)
        }).then(response => {
            return response.json();
        }) 
    }

    removeEmployeeId = async (id) => {
        return fetch( `${BASE_URL}/employees/${id}`, {
            method : "DELETE",
            headers : {
                "Application-Control-Allow-Origin" : "*",
            }
        })
    }
}
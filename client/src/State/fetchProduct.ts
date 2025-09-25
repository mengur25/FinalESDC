import axios from "axios";

const api = "http://localhost:5454/products"
export const fetchProducts= async() =>{
    try {
        const response = await axios.get(api
        //     ,{
        //     headers: {Authorization: `Bearer`}
        // }
    );
    console.log("response", response);
    } catch (error) {
        console.error(error);
    }
}
import React, {SyntheticEvent, useEffect, useState} from 'react';
import Layout from "../../components/Layout";
import {Button, TextField} from "@mui/material";
import axios from "axios";
import {Navigate, useLocation} from "react-router-dom";


const ProductForm = () => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState('')
    const [price, setPrice] = useState('')
    const [redirect, setRedirect] = useState(false)

    const location = useLocation()


    useEffect(() => {
        console.log(location.state)
        if (location.state !== null) {
            (
                async () => {
                    const {data} = await axios.get(`products/${location.state}`)
                    setTitle(data.title)
                    setDescription(data.description)
                    setImage(data.image)
                    setPrice(data.price)
                }
            )();
        }
    }, [])

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault()

        const data = {
            title,
            description,
            image,
            price
        };

        // If the location is set, aka coming from a react component where we are able to set the state then update
        // the info using an api call. If it is null then we arrived here via add new and so create a new data object.
        if (location.state !== null) {
            await axios.put(`products/${location.state}`, data)
        } else {
            await axios.post(`products`, data)
        }

            setRedirect(true);
    }

    if (redirect) {
        return <Navigate to={'/products'}/>
    }

    return (
        <Layout>
            <form onSubmit={submit}>
                <div className={"mb-3"}>
                    <TextField label={"Title"}
                               value={title}
                               onChange={event => setTitle(event.target.value)}/>

                </div>
                <div className={"mb-3"}>
                    <TextField label={"Description"} rows={4} multiline
                               value={description}
                               onChange={event => setDescription(event.target.value)}/>
                </div>
                <div className={"mb-3"}>
                    <TextField label={"Image"}
                               value={image}
                               onChange={event => setImage(event.target.value)}/>
                </div>
                <div className={"mb-3"}>
                    <TextField label={"Price"} type={"number"}
                               value={price}
                               onChange={event => setPrice(event.target.value)}/>
                </div>
                <Button variant={"contained"} color={"primary"} type={'submit'}>Submit</Button>
            </form>
        </Layout>
    );
};

export default ProductForm;
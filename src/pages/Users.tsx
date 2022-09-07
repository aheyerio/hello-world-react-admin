import React, {useEffect, useState} from 'react';
import Nav from "../components/Nav";
import Menu from "../components/Menu";
import Layout from "../components/Layout";
import axios from "axios";
import {User} from "../models/user";
import {
    Button,
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TablePagination,
    TableRow,
    ToggleButtonGroup
} from "@mui/material";
import {Link, Navigate} from 'react-router-dom';

const Users = () => {
    const [users, setUser] = useState<User[]>([]);
    const [page, setPage] = useState(0);
    const perPage = 10;


    useEffect(() => {
        (
            async () => {
                const {data} = await axios.get('ambassadors') // Must send with credentials or JWT won't be sent
                setUser(data)
            }
        )();
    }, [])

    return (
        <Layout>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>#</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {users.slice(page * perPage, (page+1) * perPage).map(user => {
                    return (
                        <TableRow key={user.id}>
                            <TableCell>{user.id}</TableCell>
                            <TableCell>{user.first_name} {user.last_name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>
                                <Button variant="contained" color={"primary"}>
                                    <Link to={`/users/${user.id}/links`}
                                          state={user.id}
                                          style={{ color: '#FFF' }}
                                    >View</Link>
                                </Button>
                            </TableCell>
                        </TableRow>
                    )
                })}
                </TableBody>
                <TableFooter>
                    <TablePagination
                        count={users.length}
                        page={page}
                        onPageChange={(e, newPage) => setPage(newPage)}
                        rowsPerPage={perPage}
                        rowsPerPageOptions={[]}
                    />
                </TableFooter>
            </Table>
        </Layout>
    );
};

export default Users;
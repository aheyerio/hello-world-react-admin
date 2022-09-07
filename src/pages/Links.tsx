import React, {useEffect, useState} from 'react';
import {Button, Table, TableBody, TableCell, TableFooter, TableHead, TablePagination, TableRow} from "@mui/material";
import Layout from "../components/Layout";
import {Link} from "../models/link";
import axios from "axios";
import { useLocation } from "react-router-dom";

const Links = (props: any) => {
    const [links, setLinks] = useState<Link[]>([]);
    const [page, setPage] = useState(0);
    const perPage = 10;

    const location = useLocation()


    useEffect(() => {
        (
            async () => {
                const {data} = await axios.get(`users/${location.state}/links`) // Must send with credentials or JWT won't be sent
                setLinks(data)
            }
        )();
    }, [])

    return (
        <Layout>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>#</TableCell>
                        <TableCell>Code</TableCell>
                        <TableCell>Count</TableCell>
                        <TableCell>Revenue</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {links.slice(page * perPage, (page+1) * perPage).map(link => {
                        return (
                            <TableRow key={link.id}>
                                <TableCell>{link.id}</TableCell>
                                <TableCell>{link.code}</TableCell>
                                <TableCell>{link.orders.length}</TableCell>
                                <TableCell>{link.orders.reduce((sum: any, order: { total: any; }) => sum + order.total, 0)}</TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
                <TableFooter>
                    <TablePagination
                        count={links.length}
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

export default Links;
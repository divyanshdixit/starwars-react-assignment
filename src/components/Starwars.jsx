import React, { useEffect, useState } from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import { URL, ASC, DESC } from '../constant/index';
import EnhancedTableHead from './TableHeader';
import EnhancedTableFooter from './TableFooter';
import '../styles/components/index.css'

export default function Starwars() {
    const [rowData, setRowData] = useState({ results: [] });
    const [order, setOrder] = useState(ASC);
    const [orderBy, setOrderBy] = useState('name');
    const [page, setPage] = useState(0);

    useEffect(() => {
        getData(URL)
            .then(data => setRowData(data));
    }, []);

    async function getData(url) {
        const response = await fetch(url)
        const characters = await response.json();
        return characters;
    }

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === ASC ;
        setOrder(isAsc ? DESC : ASC);
        setOrderBy(property);
    };

    function Comparator(a, b, orderBy) {

        if (Array.isArray(b[orderBy]) && Array.isArray(a[orderBy])) {
            return b[orderBy].length - a[orderBy].length
        } else {
            if (b[orderBy] < a[orderBy]) {
                return -1;
            }
            if (b[orderBy] > a[orderBy]) {
                return 1;
            }
            return 0;
        }

    }

    const handleChangePage = (event, newPage, url) => {
        setPage(newPage);
        getData(url)
            .then(data => setRowData(data));
    }

    return (
        <React.Fragment>
            <Container maxWidth="">
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} stickyHeader aria-label="sticky table">
                        <EnhancedTableHead
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                            rowCount={rowData.length}
                        />
                        <TableBody>
                            {
                                rowData.results.sort(order === DESC
                                    ? (a, b) => Comparator(a, b, orderBy)
                                    : (a, b) => - Comparator(a, b, orderBy))
                                    .map(row => (
                                        <TableRow hover >
                                            <TableCell
                                                component="td"
                                                id={'labelId'}
                                                scope="row"
                                                align='center'
                                            >
                                                {row.name}
                                            </TableCell>
                                            <TableCell align="center">{row.birth_year}</TableCell>
                                            <TableCell align="center">{row.homeworld}</TableCell>
                                            <TableCell align="center">{row.films.length}</TableCell>
                                        </TableRow>
                                    ))
                            }
                        </TableBody>
                        <EnhancedTableFooter
                            count={rowData.count || 0}
                            page={page}
                            handleChangePage={handleChangePage}
                            rowsPerPage={10}
                            rows={rowData.results.length}
                            rowData={rowData}
                        />
                    </Table>
                </TableContainer>
            </Container>
        </React.Fragment>
    );
}
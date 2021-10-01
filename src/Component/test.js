import { Table, TableCell, TableRow, TableContainer, TableHead, TableBody, TablePagination } from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton'
import FirstPageIcon from '@material-ui/icons/FirstPage'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'
import LastPageIcon from '@material-ui/icons/LastPage'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

const useStyles1 = makeStyles((theme) => ({
    root: {
        flexShrink: 0,
        marginLeft: theme.spacing(2.5),
    },
}))

function TablePaginationActions(props) {
    const classes = useStyles1()
    const theme = useTheme()
    const { count, page, rowsPerPage, onChangePage } = props

    const handleFirstPageButtonClick = (event) => {
        onChangePage(event, 0)
    }

    const handleBackButtonClick = (event) => {
        onChangePage(event, page - 1)
    }

    const handleNextButtonClick = (event) => {
        onChangePage(event, page + 1)
    }

    const handleLastPageButtonClick = (event) => {
        onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1))
    }

    return (
        <div className={classes.root}>
            <IconButton
                style={{ color: 'white' }}
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton
                style={{ color: 'white' }}
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                style={{ color: 'white' }}
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                style={{ color: 'white' }}
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </div>
    )
}

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onChangePage: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
}

export default function Productanalysis() {
    //connect airtable
    var Airtable = require('airtable')
    var base = new Airtable({ apiKey: 'keyUAL9XklAOyi08b' }).base('apphBomMb49ieU17N')
    //get 'buy'records as buy
    const [sale, setSale] = useState([])
    const [promenu, setpromenu] = useState([])

    useEffect(() => {
        base('sale')
            .select({
                view: 'Grid view',
            })
            .eachPage(
                function page(records, fetchNextPage) {
                    records.forEach(function (record) {
                        setSale(records)
                    })
                    fetchNextPage()
                },
                function done(err) {
                    if (err) {
                        console.error(err)
                        return
                    }
                },
            )

        base('productmenu')
            .select({
                view: 'Grid view',
            })
            .eachPage(
                function page(records, fetchNextPage) {
                    records.forEach(function (record) {
                        promenu.push([record.fields.menu])
                        setpromenu(...promenu)
                    })
                    fetchNextPage()
                },
                function done(err) {
                    //calc();
                    if (err) {
                        console.error(err)
                        return
                    }
                },
            )
    }, [])
    console.log(promenu)
    //處理換頁footer
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, promenu.length - page * rowsPerPage)

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
    }
    function showvalue(e) {
        console.log(e.target.value)
        const provalue = document.getElementById('value').value
        console.log(provalue)
    }
    // const [provalue, setprovalue] = useState('');
    //     const showvalue = (event) => {
    //       setprovalue(event.target.value);
    //     };
    //     console.log(provalue);
    const countarr = []

    //function calc(){

    const category = sale.map((value) => value.fields.product_category)
    console.log(category)
    const newcategory = [].concat.apply([], category)
    console.log(newcategory)
    const categorylist = promenu

    console.log(categorylist)
    const newcategorylist = [].concat.apply([], categorylist)
    console.log(newcategorylist)

    const salecount = sale.map((value) => value.fields.sale_count)
    console.log(salecount)

    console.log('-------------')
    console.log(promenu)
    console.log(categorylist)
    console.log('-------------')

    let count2 = 0
    for (let j of newcategorylist) {
        console.log('9999999999999999')
        let count = 0
        let countnum = -1
        console.log(j)
        for (let i of newcategory) {
            if (i === j) {
                countnum++
                //console.log(countnum);
                count += salecount[countnum]
                //console.log('yes');
            } else {
                countnum++
                //console.log('no');
            }
        }
        //console.log(count);
        countarr.push(count)
        console.log(count2)
        promenu[count2][1] = count
        count2++
    }
    console.log(countarr)
    console.log(promenu)
    //}

    return (
        <div>
            <div className="container">
                <div>
                    <select id="value" onchange={showvalue}>
                        <option>選擇產品類別</option>
                        {promenu.map((promenu) => (
                            <option value={promenu}>{promenu}</option>
                        ))}
                    </select>
                </div>
                <p>台北門市</p>
                <TableContainer>
                    <Table tablename="sale">
                        <TableHead>
                            <TableRow>
                                <TableCell style={{ color: 'white' }}>產品類別</TableCell>
                                <TableCell style={{ color: 'white' }}>總數量</TableCell>
                                <TableCell style={{ color: 'white' }}>總金額</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {(rowsPerPage > 0
                                ? promenu.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                : promenu
                            ).map((promenu) => (
                                <TableRow>
                                    <TableCell style={{ color: 'white' }}>{promenu[0]}</TableCell>
                                    {countarr.map((countarr) => (
                                        <TableCell style={{ color: 'white' }}>{promenu[1]}</TableCell>
                                    ))}
                                    <TableCell style={{ color: 'white' }}>$$$</TableCell>
                                </TableRow>
                            ))}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: 53 * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    style={{ color: 'white' }}
                    component="div"
                    rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                    colSpan={3}
                    count={promenu.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    SelectProps={{
                        inputProps: { 'aria-label': 'rows per page' },
                        native: true,
                    }}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActions}
                />

                <p>台中門市</p>
                <TableContainer>
                    <Table tablename="buy">
                        <TableHead>
                            <TableRow>
                                <TableCell style={{ color: 'white' }}>產品類別</TableCell>
                                <TableCell style={{ color: 'white' }}>總數量</TableCell>
                                <TableCell style={{ color: 'white' }}>總金額</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {(rowsPerPage > 0
                                ? promenu.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                : promenu
                            ).map((promenu) => (
                                <TableRow>
                                    <TableCell style={{ color: 'white' }}>{promenu}</TableCell>
                                    <TableCell style={{ color: 'white' }}>{promenu}</TableCell>
                                    <TableCell style={{ color: 'white' }}>{promenu}</TableCell>
                                </TableRow>
                            ))}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: 53 * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    style={{ color: 'white' }}
                    component="div"
                    rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                    colSpan={3}
                    count={promenu.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    SelectProps={{
                        inputProps: { 'aria-label': 'rows per page' },
                        native: true,
                    }}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActions}
                />
            </div>
        </div>
    )
}

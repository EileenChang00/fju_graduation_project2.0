import {
    Grid,
    Table,
    TableCell,
    TableRow,
    TableContainer,
    TableHead,
    Checkbox,
    TableBody,
    TablePagination,
    Paper,
    Button,
    Icon,
} from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton'
import FirstPageIcon from '@material-ui/icons/FirstPage'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'
import LastPageIcon from '@material-ui/icons/LastPage'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import CustomerUpdate from './customer_update'
import CustomerCreate from './customer_create'
import CustomerDelete from './customer_delete'
import SendIcon from '@material-ui/icons/Send'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '70%',
    },
    paper: {
        marginBottom: theme.spacing(2),
        margin: '30px',
        padding: '30px',
    },
    table: {
        minWidth: 1200,
        fontSize: 15,
    },
}))
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
            <IconButton onClick={handleFirstPageButtonClick} disabled={page === 0} aria-label="first page">
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
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
export default function Customer_search(props) {
    const classes = useStyles()
    var Airtable = require('airtable')
    var base = new Airtable({ apiKey: 'keyUAL9XklAOyi08b' }).base('apphBomMb49ieU17N')
    //get Customer data from airtable
    const [customer, setCustomer] = useState([])

    const [filteredCustomer, setFilteredCustomer] = useState([])

    useEffect(() => {
        base('customer')
            .select({
                view: 'Grid view2',
            })
            .eachPage(
                function page(records, fetchNextPage) {
                    records.forEach(function (record) {
                        setFilteredCustomer(records)
                        setCustomer(records)
                    })
                    fetchNextPage()
                },
                function done(err) {
                    if (err) {
                        console.error(err)
                        return
                    }
                    console.log('in useEffect')
                    console.log(customer.length)

                    //filter_cus("");
                },
            )
    }, [])
    //console.log(customer);

    //將被勾選的資料id存進array
    const [SelectedId_arr, setUpdateId] = useState([])
    const [SelectedCustomer, setSelectedCustomer] = useState([])
    const [Selectedemail_arr, setUpdateemail] = useState([])
    const handleSelect = (event) => {
        //從勾選id得知哪筆資料要進行修改//勾選id=com_id
        var new_select_id = event.target.getAttribute('id')
        var new_arr = SelectedId_arr
        var new_arr2 = Selectedemail_arr
        base('customer')
            .select({
                view: 'Grid view2',
                filterByFormula: "{cus_id}='" + new_select_id + "'",
            })
            .eachPage(
                function page(records, fetchNextPage) {
                    records.forEach(function (record) {
                        setSelectedCustomer(record)
                        new_arr.includes(record.id)
                            ? (new_arr = new_arr.filter((item) => item !== record.id))
                            : (new_arr = [...new_arr, record.id]) //若紀錄已被勾選刪除紀錄，否則紀錄勾選id
                        new_arr2.includes(record.fields.cus_email)
                            ? (new_arr2 = new_arr2.filter((item) => item !== record.fields.cus_email))
                            : (new_arr2 = [...new_arr2, record.fields.cus_email])
                        setUpdateId(new_arr)
                        setUpdateemail(new_arr2)
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
    }
    console.log(SelectedId_arr)
    const emaillist = Selectedemail_arr.toString()

    function filter_cus(inputvalue) {
        console.log('customer:' + customer)
        console.log('inputvalue:' + inputvalue)
        console.log('-----')
        var filter_temp = customer.filter((this_customer) => {
            console.log('c:' + this_customer.fields.cus_name)
            const customer_intro = this_customer.fields.cus_intro.toString()

            return (
                this_customer.fields.cus_name.toLowerCase().includes(inputvalue.toLowerCase()) ||
                this_customer.fields.cus_phone.toLowerCase().includes(inputvalue.toLowerCase()) ||
                this_customer.fields.cus_birth.toLowerCase().includes(inputvalue.toLowerCase()) ||
                this_customer.fields.cus_profession.toLowerCase().includes(inputvalue.toLowerCase()) ||
                this_customer.fields.cus_title.toLowerCase().includes(inputvalue.toLowerCase()) ||
                this_customer.fields.cus_email.toLowerCase().includes(inputvalue.toLowerCase()) ||
                customer_intro.toLowerCase().includes(inputvalue.toLowerCase()) ||
                //||this_customer.fields.cus_minor_intro.toLowerCase().includes(inputvalue.toLowerCase())
                this_customer.fields.cus_GUI.toLowerCase().includes(inputvalue.toLowerCase()) ||
                this_customer.fields.cus_invoice.toLowerCase().includes(inputvalue.toLowerCase()) ||
                this_customer.fields.cus_address.toLowerCase().includes(inputvalue.toLowerCase())
            )
        })
        if (filter_temp.length > 0) {
            setFilteredCustomer([...filter_temp])

            console.log(filter_temp.length)
            console.log('filter:' + filter_temp[0].fields.cus_name)
        }
    }
    //處理換頁footer
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, filteredCustomer.length - page * rowsPerPage)

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
    }
    return (
        <div>
            <Grid container direction="row" justify="space-between" alignItems="center" spacing={3}>
                <Grid item>
                    <Grid container direction="row" justify="flex=start" alignItems="center" spacing={3}>
                        <Grid item>
                            <input
                                type="text"
                                id="search"
                                placeholder="搜尋"
                                onChange={(e) => filter_cus(e.target.value)}
                                style={{ color: 'black' }}
                            />
                        </Grid>
                        <Grid item>
                            <Button variant="contained" color="primary" spacing={3} endIcon={<SendIcon />}>
                                <a href={'mailto:' + emaillist} style={{ color: 'white' }}>
                                    E-mail
                                </a>
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item>
                    <Grid container direction="row" justify="flex-end" alignItems="center" spacing={3}>
                        <Grid item>
                            {SelectedId_arr.length === 1 && (
                                <CustomerUpdate update_id={SelectedId_arr[0]} customer={SelectedCustomer} />
                            )}
                        </Grid>
                        <Grid item>{SelectedId_arr.length > 0 && <CustomerDelete delete_id={SelectedId_arr} />}</Grid>
                        <Grid item>
                            <CustomerCreate />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Paper className={classes.paper}>
                <div>
                    <TableContainer>
                        <Table tablename="customer" className={classes.table}>
                            <TableHead>
                                <TableRow>
                                    <TableCell padding="checkbox"></TableCell>
                                    <TableCell>姓名</TableCell>
                                    <TableCell>手機</TableCell>
                                    <TableCell>生日</TableCell>
                                    <TableCell>職業</TableCell>
                                    <TableCell>職稱</TableCell>
                                    <TableCell>信箱</TableCell>
                                    <TableCell>地址</TableCell>
                                    <TableCell>主介紹人</TableCell>
                                    <TableCell>次介紹人</TableCell>
                                    <TableCell>統一編號</TableCell>
                                    <TableCell>統編抬頭</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {(rowsPerPage > 0
                                    ? filteredCustomer.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    : filteredCustomer
                                ).map((this_customer) => (
                                    <TableRow key={this_customer.fields.cus_id}>
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                id={this_customer.fields.cus_id.toString()}
                                                onClick={handleSelect}
                                            />
                                        </TableCell>
                                        <TableCell>{this_customer.fields.cus_name}</TableCell>
                                        <TableCell>{this_customer.fields.cus_phone}</TableCell>
                                        <TableCell>{this_customer.fields.cus_birth}</TableCell>
                                        <TableCell>{this_customer.fields.cus_profession}</TableCell>
                                        <TableCell>{this_customer.fields.cus_title}</TableCell>
                                        <TableCell>{this_customer.fields.cus_email}</TableCell>
                                        <TableCell>{this_customer.fields.cus_address}</TableCell>
                                        <TableCell>{this_customer.fields.cus_intro_name}</TableCell>
                                        <TableCell>{this_customer.fields.cus_minor_intro}</TableCell>
                                        <TableCell>{this_customer.fields.cus_GUI}</TableCell>
                                        <TableCell>{this_customer.fields.cus_invoice}</TableCell>
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
                        component="div"
                        rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                        colSpan={3}
                        count={filteredCustomer.length}
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
            </Paper>
        </div>
    )
}

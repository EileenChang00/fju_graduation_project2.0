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
} from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton'
import FirstPageIcon from '@material-ui/icons/FirstPage'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'
import LastPageIcon from '@material-ui/icons/LastPage'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import EmployeeUpdate from './employee_update'
import EmployeeCreate from './employee_create'
import EmployeeDelete from './employee_delete'

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
export default function Employee(props) {
    const classes = useStyles()
    var Airtable = require('airtable')
    var base = new Airtable({ apiKey: 'keyUAL9XklAOyi08b' }).base('apphBomMb49ieU17N')
    //get employee data from airtable
    const [employee, setEmployee] = useState([])
    const [filteredEmployee, setFilteredEmployee] = useState([])
    //var moment = require('moment');
    //const currentDate = moment().format('YYYY-MM-DD');

    useEffect(() => {
        base('employee')
            .select({
                view: 'Grid view2',
            })
            .eachPage(
                function page(records, fetchNextPage) {
                    records.forEach(function (record) {
                        setFilteredEmployee(records)
                        setEmployee(records)
                    })
                    fetchNextPage()
                },
                function done(err) {
                    if (err) {
                        console.error(err)
                        return
                    }
                    console.log('in useEffect')
                    console.log(employee.length)
                },
            )
    }, [])

    //將被勾選的資料id存進array
    const [SelectedId_arr, setUpdateId] = useState([])
    const [SelectedEmployee, setSelectedEmployee] = useState([])
    const handleSelect = (event) => {
        //從勾選id得知哪筆資料要進行修改//勾選id=com_id
        var new_select_id = event.target.getAttribute('id')
        var new_arr = SelectedId_arr
        base('employee')
            .select({
                view: 'Grid view2',
                filterByFormula: "{em_id}='" + new_select_id + "'",
            })
            .eachPage(
                function page(records, fetchNextPage) {
                    records.forEach(function (record) {
                        setSelectedEmployee(record)
                        new_arr.includes(record.id)
                            ? (new_arr = new_arr.filter((item) => item !== record.id))
                            : (new_arr = [...new_arr, record.id]) //若紀錄已被勾選刪除紀錄，否則紀錄勾選id
                        setUpdateId(new_arr)
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
    //console.log(SelectedId_arr);

    function filter_em(inputvalue) {
        console.log('employee:' + employee)
        console.log('inputvalue:' + inputvalue)

        var filter_temp = employee.filter((this_employee) => {
            console.log('e:' + this_employee.fields.em_name)
            console.log('birth:' + this_employee.fields.em_birth)
            const em_birth = this_employee.fields.em_birth.toString()

            return (
                this_employee.fields.em_name.toLowerCase().includes(inputvalue.toLowerCase()) ||
                this_employee.fields.em_phone.toLowerCase().includes(inputvalue.toLowerCase()) ||
                em_birth.toLowerCase().includes(inputvalue.toLowerCase()) ||
                this_employee.fields.em_IDnumber.toLowerCase().includes(inputvalue.toLowerCase()) ||
                this_employee.fields.em_address.toLowerCase().includes(inputvalue.toLowerCase()) ||
                this_employee.fields.em_enterdate.toLowerCase().includes(inputvalue.toLowerCase())
            )
            //||this_employee.fields.em_birth.toLowerCase().includes(inputvalue.toLowerCase());

            //this_customer.fields.cus_phone.toLowerCase().includes(inputvalue.toLowerCase());
            //     console.log("this customer:" + this_customer.fields.cus_name);
            //     console.log("search:" + inputvalue);
            //     const flit = this_customer.fields.cus_name.toLowerCase().includes(inputvalue.toLowerCase());
            //     console.log(flit);
            //     if (flit === true) {
            //         console.log('找到符合');
            //     }
        })
        if (filter_temp.length > 0) {
            setFilteredEmployee([...filter_temp])

            console.log(filter_temp.length)
            console.log('filter:' + filter_temp[0].fields.em_name)
        }
    }
    //處理換頁footer
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, filteredEmployee.length - page * rowsPerPage)

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
                    <input
                        type="text"
                        id="search"
                        placeholder="搜尋"
                        onChange={(e) => filter_em(e.target.value)}
                        style={{ color: 'black' }}
                    />
                </Grid>
                <Grid item>
                    <Grid container direction="row" justify="flex-end" alignItems="center" spacing={3}>
                        <Grid item>
                            {SelectedId_arr.length === 1 && (
                                <EmployeeUpdate update_id={SelectedId_arr[0]} employee={SelectedEmployee} />
                            )}
                        </Grid>
                        <Grid item>{SelectedId_arr.length > 0 && <EmployeeDelete delete_id={SelectedId_arr} />}</Grid>
                        <Grid item>
                            <EmployeeCreate />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Paper className={classes.paper}>
                <div>
                    <TableContainer>
                        <Table tablename="employee" className={classes.table}>
                            <TableHead>
                                <TableRow>
                                    <TableCell padding="checkbox"></TableCell>
                                    <TableCell>姓名</TableCell>
                                    <TableCell>帳號</TableCell>
                                    <TableCell>密碼</TableCell>
                                    <TableCell>手機</TableCell>
                                    <TableCell>生日</TableCell>
                                    <TableCell>身分證字號</TableCell>
                                    <TableCell>地址</TableCell>
                                    <TableCell>入職日</TableCell>
                                    <TableCell>離職日</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {(rowsPerPage > 0
                                    ? filteredEmployee.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    : filteredEmployee
                                ).map((this_employee) => (
                                    <TableRow key={this_employee.fields.em_id}>
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                id={this_employee.fields.em_id.toString()}
                                                onClick={handleSelect}
                                            />
                                        </TableCell>
                                        <TableCell>{this_employee.fields.em_name}</TableCell>
                                        <TableCell>{this_employee.fields.em_account}</TableCell>
                                        <TableCell>{this_employee.fields.em_password}</TableCell>
                                        <TableCell>{this_employee.fields.em_phone}</TableCell>
                                        <TableCell>{this_employee.fields.em_birth}</TableCell>
                                        <TableCell>{this_employee.fields.em_IDnumber}</TableCell>
                                        <TableCell>{this_employee.fields.em_address}</TableCell>
                                        <TableCell>{this_employee.fields.em_enterdate}</TableCell>
                                        <TableCell>
                                            {!this_employee.fields.em_resigndate
                                                ? '無'
                                                : this_employee.fields.em_resigndate}
                                        </TableCell>
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
                        count={filteredEmployee.length}
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

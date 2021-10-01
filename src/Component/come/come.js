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
import ComeUpdate from './come_update'
import ComeCreate from './come_create'
import ComeDelete from './come_delete'
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
export default function Come_search(props) {
    const classes = useStyles()
    var Airtable = require('airtable')
    var base = new Airtable({ apiKey: 'keyUAL9XklAOyi08b' }).base('apphBomMb49ieU17N')

    const [come, setCome] = useState([])

    const [filteredCome, setFilteredCome] = useState([])

    useEffect(() => {
        base('come')
            .select({
                view: 'Grid view',
            })
            .eachPage(
                function page(records, fetchNextPage) {
                    records.forEach(function (record) {
                        setFilteredCome(records)
                        setCome(records)
                    })
                    fetchNextPage()
                },
                function done(err) {
                    if (err) {
                        console.error(err)
                        return
                    }
                    console.log('in useEffect')
                    console.log(come.length)
                },
            )
    }, [])

    const [SelectedId_arr, setUpdateId] = useState([])
    const [SelectedCome, setSelectedCome] = useState([])
    const handleSelect = (event) => {
        var new_select_id = event.target.getAttribute('id')
        var new_arr = SelectedId_arr
        base('come')
            .select({
                view: 'Grid view',
                filterByFormula: "{com_id}='" + new_select_id + "'",
            })
            .eachPage(
                function page(records, fetchNextPage) {
                    records.forEach(function (record) {
                        setSelectedCome(record)
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

    function filter_com(inputvalue) {
        console.log('come:' + come)
        console.log('inputvalue:' + inputvalue)
        console.log('-----')
        var filter_temp = come.filter((this_come) => {
            const com_cus_name = this_come.fields.com_cus_name.toString()
            const com_date = this_come.fields.com_date.toString()
            const com_em_name = this_come.fields.com_em_name.toString()
            const com_product_name = this_come.fields.com_product_name.toString()

            return (
                com_cus_name.toLowerCase().includes(inputvalue.toLowerCase()) ||
                com_date.toLowerCase().includes(inputvalue.toLowerCase()) ||
                com_em_name.toLowerCase().includes(inputvalue.toLowerCase()) ||
                this_come.fields.com_know.toLowerCase().includes(inputvalue.toLowerCase()) ||
                com_product_name.toLowerCase().includes(inputvalue.toLowerCase()) ||
                this_come.fields.com_time.toLowerCase().includes(inputvalue.toLowerCase()) ||
                this_come.fields.com_remark.toLowerCase().includes(inputvalue.toLowerCase())
            )
        })
        if (filter_temp.length > 0) {
            setFilteredCome([...filter_temp])

            console.log(filter_temp.length)
        }
    }
    //處理換頁footer
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, filteredCome.length - page * rowsPerPage)

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
                        onChange={(e) => filter_com(e.target.value)}
                        style={{ color: 'black' }}
                    />
                </Grid>
                <Grid item>
                    <Grid container direction="row" justify="flex-end" alignItems="center" spacing={3}>
                        <Grid item>
                            {SelectedId_arr.length === 1 && (
                                <ComeUpdate update_id={SelectedId_arr[0]} come={SelectedCome} />
                            )}
                        </Grid>
                        <Grid item>{SelectedId_arr.length > 0 && <ComeDelete delete_id={SelectedId_arr} />}</Grid>
                        <Grid item>
                            <ComeCreate />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Paper className={classes.paper}>
                <div>
                    <TableContainer>
                        <Table tablename="come">
                            <TableHead>
                                <TableRow>
                                    <TableCell padding="checkbox"></TableCell>
                                    <TableCell>顧客名稱</TableCell>
                                    <TableCell>來訪日期</TableCell>
                                    <TableCell>負責員工名稱</TableCell>
                                    <TableCell>得知管道</TableCell>
                                    <TableCell>有興趣產品</TableCell>
                                    <TableCell>停留時長</TableCell>
                                    <TableCell>備註</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {(rowsPerPage > 0
                                    ? filteredCome.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    : filteredCome
                                ).map((this_come) => (
                                    <TableRow key={this_come.fields.com_id}>
                                        <TableCell padding="checkbox">
                                            <Checkbox id={this_come.fields.com_id.toString()} onClick={handleSelect} />
                                        </TableCell>
                                        <TableCell>{this_come.fields.com_cus_name}</TableCell>
                                        <TableCell>{this_come.fields.com_date}</TableCell>
                                        <TableCell>{this_come.fields.com_em_name}</TableCell>
                                        <TableCell>{this_come.fields.com_know}</TableCell>
                                        <TableCell>{this_come.fields.com_product_name}</TableCell>
                                        <TableCell>{this_come.fields.com_time}</TableCell>
                                        <TableCell>{this_come.fields.com_remark}</TableCell>
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
                        count={filteredCome.length}
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

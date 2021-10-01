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
import FirmstaffUpdate from './firmstaff_update'
import FirmstaffCreate from './firmstaff_create'
import FirmstaffDelete from './firmstaff_delete'
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
export default function Firmstaff_search(props) {
    const classes = useStyles()
    var Airtable = require('airtable')
    var base = new Airtable({ apiKey: 'keyUAL9XklAOyi08b' }).base('apphBomMb49ieU17N')
    //get Customer data from airtable
    const [firmstaff, setFirmstaff] = useState([])

    const [search, setSearch] = useState('')
    const [filteredFirmstaff, setFilteredFirmstaff] = useState([])

    useEffect(() => {
        base('firmstaff')
            .select({
                view: 'Grid view2',
            })
            .eachPage(
                function page(records, fetchNextPage) {
                    records.forEach(function (record) {
                        setFilteredFirmstaff(records)
                        setFirmstaff(records)
                    })
                    fetchNextPage()
                },
                function done(err) {
                    if (err) {
                        console.error(err)
                        return
                    }
                    console.log('in useEffect')
                    console.log(firmstaff.length)
                },
            )
    }, [])

    const [SelectedId_arr, setUpdateId] = useState([])
    const [SelectedFirmstaff, setSelectedFirmstaff] = useState([])
    const handleSelect = (event) => {
        //從勾選id得知哪筆資料要進行修改//勾選id=com_id
        var new_select_id = event.target.getAttribute('id')
        var new_arr = SelectedId_arr
        base('firmstaff')
            .select({
                view: 'Grid view2',
                filterByFormula: "{firmstaff_id}='" + new_select_id + "'",
            })
            .eachPage(
                function page(records, fetchNextPage) {
                    records.forEach(function (record) {
                        setSelectedFirmstaff(record)
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

    function filter_firmstaff(inputvalue) {
        console.log('firmstaff:' + firmstaff)
        console.log('inputvalue:' + inputvalue)
        console.log('-----')
        var filter_temp = firmstaff.filter((this_firmstaff) => {
            console.log('f:' + this_firmstaff.fields.firmstaff_name)
            const firmstaff_firm_name = this_firmstaff.fields.firmstaff_firm_name.toString()
            const firmstaff_mail = this_firmstaff.fields.firmstaff_mail.toString()

            return (
                this_firmstaff.fields.firmstaff_name.toLowerCase().includes(inputvalue.toLowerCase()) ||
                this_firmstaff.fields.firmstaff_phone.toLowerCase().includes(inputvalue.toLowerCase()) ||
                firmstaff_firm_name.toLowerCase().includes(inputvalue.toLowerCase()) ||
                this_firmstaff.fields.firmstaff_fax.toLowerCase().includes(inputvalue.toLowerCase()) ||
                this_firmstaff.fields.firmstaff_profession.toLowerCase().includes(inputvalue.toLowerCase()) ||
                firmstaff_mail.toLowerCase().includes(inputvalue.toLowerCase()) ||
                this_firmstaff.fields.firmstaff_evaluation.toLowerCase().includes(inputvalue.toLowerCase()) ||
                this_firmstaff.fields.firmstaff_remark.toLowerCase().includes(inputvalue.toLowerCase())
            )
        })
        if (filter_temp.length > 0) {
            setFilteredFirmstaff([...filter_temp])

            console.log(filter_temp.length)
            console.log('filter:' + filter_temp[0].fields.firmstaff_name)
        }
    }
    //處理換頁footer
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, filteredFirmstaff.length - page * rowsPerPage)

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
                        onChange={(e) => filter_firmstaff(e.target.value)}
                        style={{ color: 'black' }}
                    />
                </Grid>
                <Grid item>
                    <Grid container direction="row" justify="flex-end" alignItems="center" spacing={3}>
                        <Grid item>
                            {SelectedId_arr.length === 1 && (
                                <FirmstaffUpdate update_id={SelectedId_arr[0]} firmstaff={SelectedFirmstaff} />
                            )}
                        </Grid>
                        <Grid item>{SelectedId_arr.length > 0 && <FirmstaffDelete delete_id={SelectedId_arr} />}</Grid>
                        <Grid item>
                            <FirmstaffCreate />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Paper className={classes.paper}>
                <div>
                    <TableContainer>
                        <Table tablename="firmstaff">
                            <TableHead>
                                <TableRow>
                                    <TableCell padding="checkbox"></TableCell>
                                    <TableCell>廠商人員名稱</TableCell>
                                    <TableCell>公司名稱</TableCell>
                                    <TableCell>手機</TableCell>
                                    <TableCell>傳真</TableCell>
                                    <TableCell>職稱</TableCell>
                                    <TableCell>電子信箱</TableCell>
                                    <TableCell>評價</TableCell>
                                    <TableCell>備註</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {(rowsPerPage > 0
                                    ? filteredFirmstaff.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    : filteredFirmstaff
                                ).map((this_firmstaff) => (
                                    <TableRow key={this_firmstaff.fields.firmstaff_id}>
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                id={this_firmstaff.fields.firmstaff_id.toString()}
                                                onClick={handleSelect}
                                            />
                                        </TableCell>
                                        <TableCell>{this_firmstaff.fields.firmstaff_name}</TableCell>
                                        <TableCell>{this_firmstaff.fields.firmstaff_firm_name}</TableCell>
                                        <TableCell>{this_firmstaff.fields.firmstaff_phone}</TableCell>
                                        <TableCell>{this_firmstaff.fields.firmstaff_fax}</TableCell>
                                        <TableCell>{this_firmstaff.fields.firmstaff_profession}</TableCell>
                                        <TableCell>{this_firmstaff.fields.firmstaff_mail}</TableCell>
                                        <TableCell>{this_firmstaff.fields.firmstaff_evaluation}</TableCell>
                                        <TableCell>{this_firmstaff.fields.firmstaff_remark}</TableCell>
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
                        count={filteredFirmstaff.length}
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

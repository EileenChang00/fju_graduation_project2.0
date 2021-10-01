import {
    //BrowserRouter as Router,
    //Switch,
    //Route,
    Link,
} from 'react-router-dom'
import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import TableSortLabel from '@material-ui/core/TableSortLabel'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import { useState, useEffect } from 'react'
import Datetime from 'react-datetime'
import 'react-datetime/css/react-datetime.css'
import { Button } from '@material-ui/core'
import moment from 'moment'
import './come.css'

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1
    }
    if (b[orderBy] > a[orderBy]) {
        return 1
    }
    return 0
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy)
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index])
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0])
        if (order !== 0) return order
        return a[1] - b[1]
    })
    return stabilizedThis.map((el) => el[0])
}

const headCells = [
    { id: 'name', numeric: false, disablePadding: true, label: '產品系列' },
    { id: 'performance', numeric: true, disablePadding: false, label: '總金額' },
    { id: 'counts', numeric: true, disablePadding: false, label: '總數量' },
]

function EnhancedTableHead(props) {
    const { classes, order, orderBy, onRequestSort } = props
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property)
    }

    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'default'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <span className={classes.visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </span>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    )
}

EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
}

const useToolbarStyles = makeStyles((theme) => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
    },
    title: {
        flex: '1 1 100%',
    },
}))

const EnhancedTableToolbar = (props) => {
    const classes = useToolbarStyles()
    return (
        <Toolbar>
            <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
                產品系列報表
            </Typography>
        </Toolbar>
    )
}

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: '65%',
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
        margin: '30px',
        padding: '30px',
    },
    table: {
        minWidth: 750,
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
}))

export default function EnhancedTable() {
    const [store, setStore] = useState('全部')
    //connect airtable
    var Airtable = require('airtable')
    var base = new Airtable({ apiKey: 'keyUAL9XklAOyi08b' }).base('apphBomMb49ieU17N')
    //get buy data
    useEffect(() => {
        var product_series = []
        var product_price = []
        var sale_count = []
        var buy_shop = []
        base('sale')
            .select({
                view: 'Grid category',
            })
            .eachPage(
                function page(records, fetchNextPage) {
                    records.forEach(function (record) {
                        product_series.push(record.fields.product_series[0])
                        product_price.push(record.fields.product_price)
                        sale_count.push(record.fields.sale_count)
                        buy_shop.push(record.fields.buy_shop)
                    })
                    fetchNextPage()
                },
                function done(err) {
                    if (err) {
                        console.error(err)
                        return
                    }
                    const prices = [].concat.apply([], product_price)
                    getperformance(product_series, prices, sale_count, buy_shop)
                },
            )
    }, [])

    const [sale_performance, setPerformance] = useState([])
    function getperformance(series, prices, sale_count) {
        console.log(prices)
        var arr = []
        const product_series = Array.from(new Set(series.map((record) => record))) //取出buy_records裡的員工姓名，且用Set移除重複的名字
        console.log(product_series)
        for (var i of product_series) {
            console.log(i)
            var price = 0
            var count = 0
            var countnum = -1
            for (var j of series) {
                console.log(j)
                if (i === j) {
                    countnum += 1
                    price += prices[countnum]
                    count += sale_count[countnum]
                    console.log(price)
                } else {
                    countnum += 1
                }
            }
            arr.push({ name: i, performance: price, counts: count })
        }
        setPerformance(arr)
    }
    console.log(sale_performance)
    //處理換頁footer

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
    }

    const [startdate, setStart] = useState('1911-01')
    function getStartdate(date) {
        setStart(moment(date).format('YYYY-MM'))
    }
    const [enddate, setEnd] = useState('2121-12')
    function getEnddate(date) {
        setEnd(moment(date).format('YYYY-MM'))
    }

    const classes = useStyles()
    const [order, setOrder] = React.useState('asc')
    const [orderBy, setOrderBy] = React.useState('consumption')
    const [selected, setSelected] = React.useState([])
    const [page, setPage] = React.useState(0)
    const [dense, setDense] = React.useState(false)
    const [rowsPerPage, setRowsPerPage] = React.useState(5)

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc'
        setOrder(isAsc ? 'desc' : 'asc')
        setOrderBy(property)
    }

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = sale_performance.map((n) => n.name)
            setSelected(newSelecteds)
            return
        }
        setSelected([])
    }

    const isSelected = (name) => selected.indexOf(name) !== -1

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, sale_performance.length - page * rowsPerPage)

    // function getdata(){
    //   var product_category = [];
    //   var product_price = [];
    //   var sale_count = [];
    //   base('sale').select({
    //       view: "Grid category",
    //       filterByFormula: "AND(IS_AFTER({buy_date},'"+startdate+"'),IS_BEFORE({buy_date},'"+enddate+"'))"
    //   }).eachPage(function page(records, fetchNextPage) {
    //       records.forEach(function(record) {
    //         console.log(records);
    //           product_category.push(record.fields.product_category[0]);
    //           product_price.push(record.fields.product_price);
    //           sale_count.push(record.fields.sale_count);
    //       });
    //       fetchNextPage();

    //   }, function done(err) {
    //       if (err) { console.error(err); return; }
    //       const prices = [].concat.apply([], product_price);
    //       getperformance(product_category,prices,sale_count);
    //   });
    // }
    console.log(rowsPerPage)

    function Taipei() {
        setStore('台北')
        var product_series = []
        var product_price = []
        var sale_count = []
        base('sale')
            .select({
                view: 'Grid category',
                filterByFormula:
                    "AND({buy_shop}='台北門市',IS_AFTER({buy_date},'" +
                    startdate +
                    "'),IS_BEFORE({buy_date},'" +
                    enddate +
                    "'))",
            })
            .eachPage(
                function page(records, fetchNextPage) {
                    records.forEach(function (record) {
                        console.log(records)
                        product_series.push(record.fields.product_series[0])
                        product_price.push(record.fields.product_price)
                        sale_count.push(record.fields.sale_count)
                    })
                    fetchNextPage()
                },
                function done(err) {
                    if (err) {
                        console.error(err)
                        return
                    }
                    const prices = [].concat.apply([], product_price)
                    console.log(product_series)
                    console.log(prices)
                    console.log(sale_count)
                    getperformance(product_series, prices, sale_count)
                },
            )
    }

    function Taichung() {
        setStore('台中')
        var product_series = []
        var product_price = []
        var sale_count = []
        base('sale')
            .select({
                view: 'Grid category',
                filterByFormula:
                    "AND({buy_shop}='台中門市',IS_AFTER({buy_date},'" +
                    startdate +
                    "'),IS_BEFORE({buy_date},'" +
                    enddate +
                    "'))",
            })
            .eachPage(
                function page(records, fetchNextPage) {
                    records.forEach(function (record) {
                        console.log(records)
                        product_series.push(record.fields.product_series[0])
                        product_price.push(record.fields.product_price)
                        sale_count.push(record.fields.sale_count)
                    })
                    fetchNextPage()
                },
                function done(err) {
                    if (err) {
                        console.error(err)
                        return
                    }
                    const prices = [].concat.apply([], product_price)
                    console.log(product_series)
                    console.log(prices)
                    console.log(sale_count)
                    getperformance(product_series, prices, sale_count, store)
                },
            )
    }

    function All() {
        setStore('全部')
        var product_series = []
        var product_price = []
        var sale_count = []
        base('sale')
            .select({
                view: 'Grid category',
                filterByFormula:
                    "AND(IS_AFTER({buy_date},'" + startdate + "'),IS_BEFORE({buy_date},'" + enddate + "'))",
            })
            .eachPage(
                function page(records, fetchNextPage) {
                    records.forEach(function (record) {
                        console.log(records)
                        product_series.push(record.fields.product_series[0])
                        product_price.push(record.fields.product_price)
                        sale_count.push(record.fields.sale_count)
                    })
                    fetchNextPage()
                },
                function done(err) {
                    if (err) {
                        console.error(err)
                        return
                    }
                    const prices = [].concat.apply([], product_price)
                    console.log(product_series)
                    console.log(prices)
                    console.log(sale_count)
                    getperformance(product_series, prices, sale_count, store)
                },
            )
    }
    return (
        <div className={classes.root}>
            <div>
                <p></p>
                <Link to="/home/Name">
                    <Button width="25px" variant="contained" color="default">
                        名稱
                    </Button>
                </Link>
                <Link to="/home/category">
                    <Button width="25px" variant="contained" color="default">
                        類別
                    </Button>
                </Link>
                <Link to="/home/series">
                    <Button width="25px" variant="contained" color="inherit">
                        系列
                    </Button>
                </Link>
                <Link to="/home/fixedsize">
                    <Button width="25px" variant="contained" color="default">
                        尺寸
                    </Button>
                </Link>
                <Link to="/home/producers">
                    <Button width="25px" variant="contained" color="default">
                        製造商
                    </Button>
                </Link>
                <hr className="line"></hr>
                <div style={{ width: '1200px' }}>
                    <div style={{ width: '500px', display: 'inline-block' }}>
                        <Datetime
                            dateFormat={'YYYY-MM'}
                            timeFormat={false}
                            closeOnSelect={true}
                            input={true}
                            initialValue="請選擇起始月份"
                            onChange={getStartdate}
                        ></Datetime>
                    </div>
                    <div style={{ color: 'white', display: 'inline-block' }}>~</div>
                    <div style={{ width: '500px', display: 'inline-block' }}>
                        <Datetime
                            dateFormat={'YYYY-MM'}
                            timeFormat={false}
                            closeOnSelect={true}
                            input={true}
                            initialValue="請選擇結束月份"
                            onChange={getEnddate}
                        ></Datetime>
                    </div>
                </div>
                <Button width="25px" variant="contained" color="default" onClick={All}>
                    全部
                </Button>
                <Button width="25px" variant="contained" color="default" onClick={Taipei}>
                    台北門市
                </Button>
                <Button width="25px" variant="contained" color="default" onClick={Taichung}>
                    台中門市
                </Button>
            </div>
            <Paper className={classes.paper}>
                <EnhancedTableToolbar numSelected={selected.length} />
                <div>門市 ： {store}</div>
                <TableContainer>
                    <Table
                        className={classes.table}
                        aria-labelledby="tableTitle"
                        size={dense ? 'small' : 'medium'}
                        aria-label="enhanced table"
                    >
                        <EnhancedTableHead
                            classes={classes}
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={sale_performance.length}
                        />
                        <TableBody>
                            {stableSort(sale_performance, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((sale_performance, index) => {
                                    const isItemSelected = isSelected(sale_performance.name)
                                    const labelId = `enhanced-table-checkbox-${index}`

                                    return (
                                        <TableRow
                                            hover
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={sale_performance.name}
                                            selected={isItemSelected}
                                        >
                                            <TableCell component="th" id={labelId} scope="row" padding="none">
                                                {sale_performance.name}
                                            </TableCell>
                                            <TableCell align="right">{sale_performance.performance}</TableCell>
                                            <TableCell align="right">{sale_performance.counts}</TableCell>
                                        </TableRow>
                                    )
                                })}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={sale_performance.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>
        </div>
    )
}

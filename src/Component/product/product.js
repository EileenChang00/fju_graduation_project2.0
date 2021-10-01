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
import ProductUpdate from './product_update'
import ProductCreate from './product_create'
import ProductDelete from './product_delete'

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
export default function Product_search(props) {
    const classes = useStyles()
    var Airtable = require('airtable')
    var base = new Airtable({ apiKey: 'keyUAL9XklAOyi08b' }).base('apphBomMb49ieU17N')

    const [product, setProduct] = useState([])

    const [search, setSearch] = useState('')
    const [filteredProduct, setFilteredProduct] = useState([])

    useEffect(() => {
        base('product')
            .select({
                view: 'Grid view2',
            })
            .eachPage(
                function page(records, fetchNextPage) {
                    records.forEach(function (record) {
                        setFilteredProduct(records)
                        setProduct(records)
                    })
                    fetchNextPage()
                },
                function done(err) {
                    if (err) {
                        console.error(err)
                        return
                    }
                    console.log('in useEffect')
                    console.log(product.length)
                },
            )
    }, [])

    //將被勾選的資料id存進array
    const [SelectedId_arr, setUpdateId] = useState([])
    const [SelectedProduct, setSelectedProduct] = useState([])
    const handleSelect = (event) => {
        //從勾選id得知哪筆資料要進行修改//勾選id=com_id
        var new_select_id = event.target.getAttribute('id')
        var new_arr = SelectedId_arr
        base('product')
            .select({
                view: 'Grid view2',
                filterByFormula: "{product_id}='" + new_select_id + "'",
            })
            .eachPage(
                function page(records, fetchNextPage) {
                    records.forEach(function (record) {
                        setSelectedProduct(record)
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

    function filter_product(inputvalue) {
        console.log('product:' + product)
        console.log('inputvalue:' + inputvalue)

        var filter_temp = product.filter((this_product) => {
            console.log('e:' + this_product.fields.product_name)
            console.log('price' + this_product.fields.product_price)
            const product_price = this_product.fields.product_price.toString()
            const product_producer_name = this_product.fields.product_producer_name.toString()

            return (
                this_product.fields.product_name.toLowerCase().includes(inputvalue.toLowerCase()) ||
                this_product.fields.product_category.toLowerCase().includes(inputvalue.toLowerCase()) ||
                this_product.fields.product_series.toLowerCase().includes(inputvalue.toLowerCase()) ||
                this_product.fields.product_fixedsize.toLowerCase().includes(inputvalue.toLowerCase()) ||
                product_price.toLowerCase().includes(inputvalue.toLowerCase()) ||
                //||this_product.fields.product_size.toLowerCase().includes(inputvalue.toLowerCase())
                product_producer_name.toLowerCase().includes(inputvalue.toLowerCase()) ||
                this_product.fields.product_note.toLowerCase().includes(inputvalue.toLowerCase())
            )
        })
        if (filter_temp.length > 0) {
            setFilteredProduct([...filter_temp])

            console.log(filter_temp.length)
            console.log('filter:' + filter_temp[0].fields.product_name)
        }
    }
    //處理換頁footer
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, filteredProduct.length - page * rowsPerPage)

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
                        onChange={(e) => filter_product(e.target.value)}
                        style={{ color: 'black' }}
                    />
                </Grid>
                <Grid item>
                    <Grid container direction="row" justify="flex-end" alignItems="center" spacing={3}>
                        <Grid item>
                            {SelectedId_arr.length === 1 && (
                                <ProductUpdate update_id={SelectedId_arr[0]} product={SelectedProduct} />
                            )}
                        </Grid>
                        <Grid item>{SelectedId_arr.length > 0 && <ProductDelete delete_id={SelectedId_arr} />}</Grid>
                        <Grid item>
                            <ProductCreate />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Paper className={classes.paper}>
                <div>
                    <TableContainer>
                        <Table tablename="product">
                            <TableHead>
                                <TableRow>
                                    <TableCell padding="checkbox"></TableCell>
                                    <TableCell>名稱</TableCell>
                                    <TableCell>類別</TableCell>
                                    <TableCell>系列</TableCell>
                                    <TableCell>尺寸</TableCell>
                                    <TableCell>特殊尺寸</TableCell>
                                    <TableCell>價格</TableCell>
                                    <TableCell>製造商名稱</TableCell>
                                    <TableCell>備註</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {(rowsPerPage > 0
                                    ? filteredProduct.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    : filteredProduct
                                ).map((this_product) => (
                                    <TableRow key={this_product.fields.product_id}>
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                id={this_product.fields.product_id.toString()}
                                                onClick={handleSelect}
                                            />
                                        </TableCell>
                                        <TableCell>{this_product.fields.product_name}</TableCell>
                                        <TableCell>{this_product.fields.product_category}</TableCell>
                                        <TableCell>{this_product.fields.product_series}</TableCell>
                                        <TableCell>{this_product.fields.product_fixedsize}</TableCell>
                                        <TableCell>{this_product.fields.product_size}</TableCell>
                                        <TableCell>{this_product.fields.product_price}</TableCell>
                                        <TableCell>{this_product.fields.product_producer_name}</TableCell>
                                        <TableCell>{this_product.fields.product_note}</TableCell>
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
                        count={filteredProduct.length}
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

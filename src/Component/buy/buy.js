import { Grid, Table, TableCell, TableRow, TableContainer, TableHead, Checkbox, TableBody, TablePagination, Paper } from "@material-ui/core";
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import BuyUpdate from "./buy_update";
import BuyCreate from "./buy_create";
import BuyDelete from "./buy_delete";
const useStyles = makeStyles((theme) => ({
  root: {
    width: '70%',
  },
  paper: {
    marginBottom: theme.spacing(2),
    margin: '30px',
    padding: '30px',
  },
  table:{
      minWidth: 1200,
      fontSize: 15,
  },
}));
const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
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
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

export default function Buy_search(props){
    const classes = useStyles();
    var Airtable = require('airtable');
    var base = new Airtable({ apiKey: 'keyUAL9XklAOyi08b' }).base('apphBomMb49ieU17N');
    //get employee data from airtable
    const [buy, setBuy] = useState([]);
    
    const [filteredBuy, setFilteredBuy] = useState([]);

    useEffect(() => {
        base('buy').select({
            view: "Grid view"
        }).eachPage(function page(records, fetchNextPage) {
            records.forEach(function (record) {
                setFilteredBuy(records);
                setBuy(records);

            });
            fetchNextPage();
        }, function done(err) {
            if (err) { console.error(err); return; }
            console.log("in useEffect");
            console.log(buy.length);
            
            
        });
    },[])

    const [SelectedId_arr, setUpdateId] = useState([]);
    const [SelectedBuy, setSelectedBuy] = useState([]);
    const handleSelect = (event) => {
        //從勾選id得知哪筆資料要進行修改//勾選id=com_id
        var new_select_id = event.target.getAttribute("id");
        var new_arr = SelectedId_arr;
        base('buy').select({
            view: "Grid view",
            filterByFormula: "{buy_id}='" + new_select_id + "'"
        }).eachPage(function page(records, fetchNextPage) {
            records.forEach(function (record) {
                setSelectedBuy(record);
                new_arr.includes(record.id) ? new_arr = new_arr.filter(item => item !== record.id) : new_arr = [...new_arr, record.id];//若紀錄已被勾選刪除紀錄，否則紀錄勾選id
                setUpdateId(new_arr);
            });
            fetchNextPage();
        }, function done(err) {
            if (err) { console.error(err); return; }
        });
    }

    function filter_buy(inputvalue){
        console.log("buy:"+buy);
        console.log("inputvalue:"+inputvalue);
        
        var filter_temp = buy.filter((this_buy) => {
            console.log("b:"+this_buy.fields.buy_cus_name);
            const buy_cus_name =  this_buy.fields.buy_cus_name.toString();
            const buy_product_name =  this_buy.fields.buy_product_name.toString();
             const buy_date =  this_buy.fields.buy_date.toString();
             const buy_shippingdate =  this_buy.fields.buy_shippingdate.toString();
             const buy_em_name =  this_buy.fields.buy_em_name.toString();
             //const buy_defaultdate =  this_buy.fields.buy_defaultdate;
             const buy_actualprice =  this_buy.fields.buy_actualprice.toString();
             const buy_fixedprice =  this_buy.fields.buy_fixedprice.toString();
            //const buy_gift_name = this_buy.fields.buy_gift_name===null ? '無' : this_buy.fields.buy_gift_name.toString();
            


            return buy_cus_name.toLowerCase().includes(inputvalue.toLowerCase())
            ||buy_product_name.toLowerCase().includes(inputvalue.toLowerCase())
            ||buy_date.toLowerCase().includes(inputvalue.toLowerCase())
            ||buy_shippingdate.toLowerCase().includes(inputvalue.toLowerCase())
            ||this_buy.fields.buy_shop.toLowerCase().includes(inputvalue.toLowerCase())
            ||buy_em_name.toLowerCase().includes(inputvalue.toLowerCase())
            //||buy_defaultdate.toLowerCase().includes(inputvalue.toLowerCase())
            ||buy_actualprice.toLowerCase().includes(inputvalue.toLowerCase())
            ||buy_fixedprice.toLowerCase().includes(inputvalue.toLowerCase())
            ||this_buy.fields.buy_remark.toLowerCase().includes(inputvalue.toLowerCase())
            //||buy_gift_name.toLowerCase().includes(inputvalue.toLowerCase())

            }
        )
        if (filter_temp.length > 0 ){
            setFilteredBuy([...filter_temp]);
    
            console.log(filter_temp.length);
            console.log("filter:"+filter_temp[0].fields.buy_cus_name);

        }
        
    };
    //處理換頁footer
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, filteredBuy.length - page * rowsPerPage);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    return(
        <div>
          <Grid container direction="row" justify="space-between" alignItems="center" spacing={3}>
            <Grid item>
              <input type="text" id="search" placeholder="搜尋" onChange={e => filter_buy(e.target.value)} style={{ color: "black" }} />
            </Grid>
            <Grid item>
              <Grid container direction="row" justify="flex-end" alignItems="center" spacing={3}>
                <Grid item>
                    {SelectedId_arr.length === 1 && <BuyUpdate update_id={SelectedId_arr[0]} buy={SelectedBuy} />}
                </Grid>
                <Grid item>
                    {SelectedId_arr.length > 0 && <BuyDelete delete_id={SelectedId_arr} />}
                </Grid>
                <Grid item><BuyCreate /></Grid>
              </Grid>
            </Grid>
          </Grid>
           <Paper className={classes.paper}>
           <div>
                <TableContainer>
                    <Table tablename="buy">
                        <TableHead>
                            <TableRow>
                                <TableCell padding="checkbox">
                                </TableCell>
                                <TableCell>顧客名稱</TableCell>
                                <TableCell>產品名稱</TableCell>
                                <TableCell>購買日期</TableCell>
                                <TableCell>出貨日期</TableCell>
                                <TableCell>購買門市</TableCell>
                                <TableCell>負責員工名稱</TableCell>
                                <TableCell>預計服務日期</TableCell>
                                <TableCell>實價</TableCell>
                                <TableCell>定價</TableCell>
                                <TableCell>贈品</TableCell>
                                <TableCell>備註</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {(rowsPerPage > 0
                                ? filteredBuy.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                : filteredBuy).map((this_buy)=>(
                                <TableRow key={this_buy.fields.buy_id}>
                                    <TableCell padding="checkbox">
                                        <Checkbox id={this_buy.fields.buy_id.toString()} onClick={handleSelect}/>
                                    </TableCell>
                                    <TableCell>{this_buy.fields.buy_cus_name}</TableCell>
                                    <TableCell>{this_buy.fields.buy_product_name.toString()}</TableCell>
                                    <TableCell>{this_buy.fields.buy_date}</TableCell>
                                    <TableCell>{this_buy.fields.buy_shippingdate}</TableCell>
                                    <TableCell>{this_buy.fields.buy_shop}</TableCell>
                                    <TableCell>{this_buy.fields.buy_em_name}</TableCell>
                                    <TableCell>{this_buy.fields.buy_defaultdate}</TableCell>
                                    <TableCell>{this_buy.fields.buy_actualprice}</TableCell>
                                    <TableCell>{this_buy.fields.buy_fixedprice}</TableCell>
                                    <TableCell>{this_buy.fields.buy_gift_name}</TableCell>
                                    <TableCell>{this_buy.fields.buy_remark}</TableCell>
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
                        count={filteredBuy.length}
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
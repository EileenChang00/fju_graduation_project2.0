import { Button,Table, TableCell, TableRow, TableContainer, TableHead, TableBody, TablePagination } from "@material-ui/core";
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import "./come.css";
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";
import moment from "moment";

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
      style={{color:"white"}}
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton style={{color:"white"}} onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
      style={{color:"white"}}
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
      style={{color:"white"}}
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

export default function Productanalysis(){

  const [store, setStore] = useState("全部");
    //connect airtable
	var Airtable = require('airtable');
	var base = new Airtable({apiKey: 'keyUAL9XklAOyi08b'}).base('apphBomMb49ieU17N');
    //get buy data
    useEffect(()=>{
        var product_category = [];
        var product_price = [];
        var sale_count = [];
        var buy_shop = [];
    base('sale').select({
        view: "Grid category"
    }).eachPage(function page(records, fetchNextPage) {
        records.forEach(function(record) {
            product_category.push(record.fields.product_category[0]);
            product_price.push(record.fields.product_price);
            sale_count.push(record.fields.sale_count);
            buy_shop.push(record.fields.buy_shop);
        });
        fetchNextPage();

    }, function done(err) {
        if (err) { console.error(err); return; }
        const prices = [].concat.apply([], product_price);
        getperformance(product_category,prices,sale_count,buy_shop);
    });

    },[]);
    const [sale_performance, setPerformance] = useState([]);
    function getperformance(category,prices,sale_count){
      console.log(prices);
        var arr = [];
        const product_category = Array.from(new Set(category.map((record)=>record)));//取出buy_records裡的員工姓名，且用Set移除重複的名字
        console.log(product_category);
        for(var i of product_category){
            console.log(i);
            var price = 0;
            var count = 0;
            var countnum = -1;
            for(var j of category){
                console.log(j);
                if(i === j){
                    countnum += 1;
                    price += prices[countnum];
                    count += sale_count[countnum];
                    console.log(price);
                }else{
                    countnum += 1;
                }
            }
            arr.push({name:i,performance:price,counts:count});
        }
        setPerformance(arr);
    }
    console.log(sale_performance);
    //處理換頁footer
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, sale_performance.length - page * rowsPerPage);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const [startdate,setStart] = useState('1911-01');
    function getStartdate(date){
      setStart(moment(date).format('YYYY-MM'));
    }
    const [enddate,setEnd] = useState('2121-12');
    function getEnddate(date){
      setEnd(moment(date).format('YYYY-MM'));
    }
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
    console.log(rowsPerPage);

    function Taipei(){
      setStore("台北");
      var product_category = [];
      var product_price = [];
      var sale_count = [];
      base('sale').select({
          view: "Grid category",
          filterByFormula: "AND({buy_shop}='台北門市',IS_AFTER({buy_date},'"+startdate+"'),IS_BEFORE({buy_date},'"+enddate+"'))"
      }).eachPage(function page(records, fetchNextPage) {
          records.forEach(function(record) {
            console.log(records);
              product_category.push(record.fields.product_category[0]);
              product_price.push(record.fields.product_price);
              sale_count.push(record.fields.sale_count);
          });
          fetchNextPage();

      }, function done(err) {
          if (err) { console.error(err); return; }
          const prices = [].concat.apply([], product_price);
          console.log(product_category);
          console.log(prices);
          console.log(sale_count);
            getperformance(product_category,prices,sale_count);
          
      });
    }

    function Taichung(){
      setStore("台中");
      var product_category = [];
      var product_price = [];
      var sale_count = [];
      base('sale').select({
          view: "Grid category",
          filterByFormula: "AND({buy_shop}='台中門市',IS_AFTER({buy_date},'"+startdate+"'),IS_BEFORE({buy_date},'"+enddate+"'))"
      }).eachPage(function page(records, fetchNextPage) {
          records.forEach(function(record) {
            console.log(records);
              product_category.push(record.fields.product_category[0]);
              product_price.push(record.fields.product_price);
              sale_count.push(record.fields.sale_count);
          });
          fetchNextPage();

      }, function done(err) {
          if (err) { console.error(err); return; }
          const prices = [].concat.apply([], product_price);
          console.log(product_category);
          console.log(prices);
          console.log(sale_count);
            getperformance(product_category,prices,sale_count,store);
          
      });
    }

    function All(){
      setStore("全部");
      var product_category = [];
      var product_price = [];
      var sale_count = [];
      base('sale').select({
          view: "Grid category",
          filterByFormula: "AND(IS_AFTER({buy_date},'"+startdate+"'),IS_BEFORE({buy_date},'"+enddate+"'))"
      }).eachPage(function page(records, fetchNextPage) {
          records.forEach(function(record) {
            console.log(records);
              product_category.push(record.fields.product_category[0]);
              product_price.push(record.fields.product_price);
              sale_count.push(record.fields.sale_count);
          });
          fetchNextPage();

      }, function done(err) {
          if (err) { console.error(err); return; }
          const prices = [].concat.apply([], product_price);
          console.log(product_category);
          console.log(prices);
          console.log(sale_count);
            getperformance(product_category,prices,sale_count,store);
          
      });
    }

    return( 
        <div>
          <div>
            <Datetime dateFormat={"YYYY-MM"} timeFormat={false} closeOnSelect={true} input={true}  initialValue="請選擇起始月份" onChange={getStartdate}></Datetime>
            <p>~</p>
            <Datetime dateFormat={"YYYY-MM"} timeFormat={false} closeOnSelect={true} input={true}  initialValue="請選擇結束月份" onChange={getEnddate}></Datetime>
            <Button width="25px" variant="contained" color="default" onClick={All}>全部</Button>
            <Button width="25px" variant="contained" color="default" onClick={Taipei}>台北門市</Button>
            <Button width="25px" variant="contained" color="default" onClick={Taichung}>台中門市</Button>
            </div>
            <div className="container">
              <p>門市 ： {store}</p>
                <TableContainer>
                    <Table tablename='chart_em'>
                        <TableHead>
                            <TableRow>
                                <TableCell style={{color:"white"}}>產品類別</TableCell>
                                <TableCell style={{color:"white"}}>總金額</TableCell>
                                <TableCell style={{color:"white"}}>總數量</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {(rowsPerPage > 0
                                ? sale_performance.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                : sale_performance).map((data)=>(
                                <TableRow key={data.name}>
                                    <TableCell style={{color:"white"}}>{data.name}</TableCell>
                                    <TableCell style={{color:"white"}}>{data.performance}</TableCell>
                                    <TableCell style={{color:"white"}}>{data.counts}</TableCell>
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
                style={{color:"white"}}
                component="div"
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                colSpan={3}
                count={sale_performance.length}
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
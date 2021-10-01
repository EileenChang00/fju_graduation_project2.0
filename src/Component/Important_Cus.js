import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { useState, useEffect } from 'react';
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";
import { Button } from "@material-ui/core";
import moment from "moment";
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: 'name', numeric: false, disablePadding: true, label: '顧客姓名' },
  { id: 'consumption', numeric: true, disablePadding: false, label: '購買總額' },
  { id: 'counts', numeric: true, disablePadding: false, label: '成交筆數' },
];

function EnhancedTableHead(props) {
  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell />
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
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  title: {
    flex: '1 1 100%',
  },
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  return (
    <Toolbar>
      <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
        重要顧客報表
        </Typography>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '80%',
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
}));
function Row(props) {
  const { row } = props;
  const { isItemSelected } = props;
  const { labelId } = props;
  const [open, setOpen] = React.useState(false);
  return (
    <React.Fragment>
      <TableRow
        hover
        aria-checked={isItemSelected}
        tabIndex={-1}
        key={row.name}
        selected={isItemSelected}
      >
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" id={labelId} scope="row" padding="none">
          {row.name}
        </TableCell>
        <TableCell align="right">{row.consumption}</TableCell>
        <TableCell align="right">{row.counts}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                交易紀錄
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>日期</TableCell>
                    <TableCell>銷售產品及數量</TableCell>
                    <TableCell>實價</TableCell>
                    <TableCell>門市</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.histories.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row">
                        {historyRow.date}
                      </TableCell>
                      <TableCell>{historyRow.products}</TableCell>
                      <TableCell>{historyRow.price}</TableCell>
                      <TableCell>{historyRow.shop}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function EnhancedTable() {
  //connect airtable
  var Airtable = require('airtable');
  var base = new Airtable({ apiKey: 'keyUAL9XklAOyi08b' }).base('apphBomMb49ieU17N');
  //get buy data
  useEffect(() => {
    var buy_cus_name = [];
    var buy_price = [];
    var buy_history =[];
    base('buy').select({
      view: "Group cus"
    }).eachPage(function page(records, fetchNextPage) {
      records.forEach(function (record) {
        var buy_products = [];
        for(var i =0; i < record.fields.buy_product_name.length;i++){
          buy_products.push(record.fields.buy_product_name[i]+":"+record.fields.buy_product_count[i]);
        }
        buy_cus_name.push(record.fields.buy_cus_name[0]);
        buy_price.push(record.fields.buy_actualprice);
        buy_history.push({date:record.fields.buy_date,
          products:buy_products.toString(),
          price:record.fields.buy_actualprice, 
          shop:record.fields.buy_shop,});
      });
      fetchNextPage();

    }, function done(err) {
      if (err) { console.error(err); return; }
      getConsumption(buy_cus_name, buy_price,buy_history);
    });
  }, []);

  const [cus_consumption, setCusconsumption] = useState([]);
  function getConsumption(names, prices, histories) {
    var arr = [];
    const cusName = Array.from(new Set(names.map((record) => record)));   //取出buy_records裡的客人id，且用Set移除重複的id
    console.log(cusName);
    for (var i of cusName) {
      console.log(i);
      var price = 0;//消費總額
      var count = 0;//成交筆數
      var history = [];//歷史交易紀錄
      var countnum = -1;
      for (var j of names) {
        console.log(j);
        if (i === j) {
          countnum += 1;
          price += prices[countnum];
          count += 1;
          console.log(price);
          history.push(histories[countnum]);
        } else {
          countnum += 1;
        }
      }
      if (price >= 1500000){
        arr.push({ name: i, consumption: price, counts: count, histories: history });
      }
    }
    setCusconsumption(arr);
  }
  console.log(cus_consumption);
  const [startdate, setStart] = useState(false);
  function getStartdate(date) {
    setStart(moment(date).format('YYYY-MM'));
  }
  const [enddate, setEnd] = useState(false);
  function getEnddate(date) {
    setEnd(moment(date).format('YYYY-MM'));
  }
  function getdata() {
    var buy_cus_name = [];
    var buy_price = [];
    var buy_history =[];
    base('buy').select({
      view: "Group cus",
      filterByFormula: "AND(IS_AFTER({buy_date},'" + startdate + "'),IS_BEFORE({buy_date},'" + enddate + "'))"
    }).eachPage(function page(records, fetchNextPage) {
      records.forEach(function (record) {
        var buy_products = [];
        for(var i =0; i < record.fields.buy_product_name.length;i++){
          buy_products.push(record.fields.buy_product_name[i]+":"+record.fields.buy_product_count[i]);
        }
        buy_cus_name.push(record.fields.buy_cus_name[0]);
        buy_price.push(record.fields.buy_actualprice);
        buy_history.push({date:record.fields.buy_date, 
          cus:record.fields.buy_cus_name[0],
          products:buy_products.toString(),
          price:record.fields.buy_actualprice, 
          shop:record.fields.buy_shop});
      });
      fetchNextPage();

    }, function done(err) {
      if (err) { console.error(err); return; }
      getConsumption(buy_cus_name, buy_price, buy_history);
    });
  }

  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('consumption');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = cus_consumption.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, cus_consumption.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <p></p>
      <div>
        <div style={{ width: "1200px" }}>
          <div style={{ width: "500px", display: "inline-block" }}>
            <Datetime dateFormat={"YYYY-MM"} timeFormat={false} closeOnSelect={true} input={true} initialValue="請選擇起始月份" onChange={getStartdate}></Datetime>
          </div><div style={{ color: "white", display: "inline-block" }}>~</div>
          <div style={{ width: "500px", display: "inline-block" }}>
            <Datetime dateFormat={"YYYY-MM"} timeFormat={false} closeOnSelect={true} input={true} initialValue="請選擇結束月份" onChange={getEnddate}></Datetime>
          </div>
        </div>
        <Button width="25px" variant="contained" color="default" onClick={getdata}>搜尋</Button>
      </div>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar numSelected={selected.length} />
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
              rowCount={cus_consumption.length}
            />
            <TableBody>
              {stableSort(cus_consumption, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((cus_consumption, index) => {
                  const isItemSelected = isSelected(cus_consumption.name);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <Row isItemSelected={isItemSelected} labelId={labelId} row={cus_consumption}></Row>
                  );
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
          count={cus_consumption.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}

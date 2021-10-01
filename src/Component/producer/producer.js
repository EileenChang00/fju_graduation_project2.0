import { Grid, Table, TableCell, TableRow, TableContainer, TableHead, Checkbox, TableBody, TablePagination, Paper } from "@material-ui/core";
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import ProducerUpdate from "./producer_update";
import ProducerCreate from "./producer_create";
import ProducerDelete from "./producer_delete";

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
export default function Producer_search(props){
    const classes = useStyles();
    var Airtable = require('airtable');
    var base = new Airtable({ apiKey: 'keyUAL9XklAOyi08b' }).base('apphBomMb49ieU17N');
    //get Customer data from airtable
    const [producer, setProducer] = useState([]);
    const [filteredProducer, setFilteredProducer] = useState([]);

    useEffect(() => {
        base('producer').select({
            view: "Grid view2"
        }).eachPage(function page(records, fetchNextPage) {
            records.forEach(function (record) {
                setFilteredProducer(records);
                setProducer(records);

            });
            fetchNextPage();
        }, function done(err) {
            if (err) { console.error(err); return; }
            console.log("in useEffect");
            console.log(producer.length);
            
           
        });
    },[])

    const [SelectedId_arr, setUpdateId] = useState([]);
    const [SelectedProducer, setSelectedProducer] = useState([]);
    const handleSelect = (event) => {
        //從勾選id得知哪筆資料要進行修改//勾選id=com_id
        var new_select_id = event.target.getAttribute("id");
        var new_arr = SelectedId_arr;
        base('producer').select({
            view: "Grid view2",
            filterByFormula: "{producer_id}='" + new_select_id + "'"
        }).eachPage(function page(records, fetchNextPage) {
            records.forEach(function (record) {
                setSelectedProducer(record);
                new_arr.includes(record.id) ? new_arr = new_arr.filter(item => item !== record.id) : new_arr = [...new_arr, record.id];//若紀錄已被勾選刪除紀錄，否則紀錄勾選id
                setUpdateId(new_arr);
            });
            fetchNextPage();
        }, function done(err) {
            if (err) { console.error(err); return; }
        });
    }

    function filter_producer(inputvalue){
        console.log("producer:"+producer);
        console.log("inputvalue:"+inputvalue);
        console.log("-----");
        var filter_temp = producer.filter((this_producer) => {
            console.log("p:"+this_producer.fields.producer_name);


            return this_producer.fields.producer_name.toLowerCase().includes(inputvalue.toLowerCase())
             ||this_producer.fields.producer_contactperson.toLowerCase().includes(inputvalue.toLowerCase())
             ||this_producer.fields.producer_address.toLowerCase().includes(inputvalue.toLowerCase())
             ||this_producer.fields.producer_kind.toLowerCase().includes(inputvalue.toLowerCase())
             ||this_producer.fields.producer_GUI.toLowerCase().includes(inputvalue.toLowerCase())
             ||this_producer.fields.producer_info.toLowerCase().includes(inputvalue.toLowerCase())
             ||this_producer.fields.producer_phone.toLowerCase().includes(inputvalue.toLowerCase())
             ||this_producer.fields.producer_email.toLowerCase().includes(inputvalue.toLowerCase())
             ||this_producer.fields.producer_remark.toLowerCase().includes(inputvalue.toLowerCase());
            }
        )
        if (filter_temp.length > 0 ){
            setFilteredProducer([...filter_temp]);
    
            console.log(filter_temp.length);
            console.log("filter:"+filter_temp[0].fields.producer_name);

        }
        
    };
    //處理換頁footer
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, filteredProducer.length - page * rowsPerPage);

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
              <input type="text" id="search" placeholder="搜尋" onChange={e => filter_producer(e.target.value)} style={{ color: "black" }} />
            </Grid>
            <Grid item>
              <Grid container direction="row" justify="flex-end" alignItems="center" spacing={3}>
                <Grid item>
                    {SelectedId_arr.length === 1 && <ProducerUpdate update_id={SelectedId_arr[0]} producer={SelectedProducer} />}
                </Grid>
                <Grid item>
                    {SelectedId_arr.length > 0 && <ProducerDelete delete_id={SelectedId_arr} />}
                </Grid>
                <Grid item><ProducerCreate /></Grid>
              </Grid>
            </Grid>
          </Grid>
            <Paper className={classes.paper}>
            <div>
                <TableContainer>
                    <Table tablename="producer">
                        <TableHead>
                            <TableRow>
                                <TableCell padding="checkbox">
                                </TableCell>
                                <TableCell>名稱</TableCell>
                                <TableCell>聯絡人</TableCell>
                                <TableCell>地址</TableCell>
                                <TableCell>類別</TableCell>
                                <TableCell>統一編號</TableCell>
                                <TableCell>匯款資訊</TableCell>
                                <TableCell>電話</TableCell>
                                <TableCell>電子信箱</TableCell>
                                <TableCell>備註</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {(rowsPerPage > 0
                                ? filteredProducer.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                : filteredProducer).map((this_producer)=>(
                                <TableRow key={this_producer.fields.producer_id}>
                                   <TableCell padding="checkbox">
                                      <Checkbox id={this_producer.fields.producer_id.toString()} onClick={handleSelect}/>
                                   </TableCell>
                                    <TableCell>{this_producer.fields.producer_name}</TableCell>
                                    <TableCell>{this_producer.fields.producer_contactperson}</TableCell>
                                    <TableCell>{this_producer.fields.producer_address}</TableCell>
                                    <TableCell>{this_producer.fields.producer_kind}</TableCell>
                                    <TableCell>{this_producer.fields.producer_GUI}</TableCell>
                                    <TableCell>{this_producer.fields.producer_info}</TableCell>
                                    <TableCell>{this_producer.fields.producer_phone}</TableCell>
                                    <TableCell>{this_producer.fields.producer_email}</TableCell>
                                    <TableCell>{this_producer.fields.producer_remark}</TableCell>
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
                        count={filteredProducer.length}
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


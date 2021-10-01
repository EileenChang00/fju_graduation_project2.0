import { Grid, Table, TableCell, TableRow, TableContainer, TableHead, Checkbox, TableBody, TablePagination, Paper } from "@material-ui/core";
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import FirmUpdate from "./firm_update";
import FirmCreate from "./firm_create";
import FirmDelete from "./firm_delete";
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
export default function Firm_search(props){
    const classes = useStyles();
    var Airtable = require('airtable');
    var base = new Airtable({ apiKey: 'keyUAL9XklAOyi08b' }).base('apphBomMb49ieU17N');
    
    const [firm, setFirm] = useState([]);
    const [filteredFirm, setFilteredFirm] = useState([]);

    useEffect(() => {
        base('firm').select({
            view: "Grid view2"
        }).eachPage(function page(records, fetchNextPage) {
            records.forEach(function (record) {
                setFilteredFirm(records);
                setFirm(records);

            });
            fetchNextPage();
        }, function done(err) {
            if (err) { console.error(err); return; }
            console.log("in useEffect");
            console.log(firm.length);
            
            
        });
    },[])


    //將被勾選的資料id存進array
    const [SelectedId_arr, setUpdateId] = useState([]);
    const [SelectedFirm, setSelectedFirm] = useState([]);
    const handleSelect = (event) => {
        //從勾選id得知哪筆資料要進行修改//勾選id=com_id
        var new_select_id = event.target.getAttribute("id");
        var new_arr = SelectedId_arr;
        base('firm').select({
            view: "Grid view2",
            filterByFormula: "{firm_id}='" + new_select_id + "'"
        }).eachPage(function page(records, fetchNextPage) {
            records.forEach(function (record) {
                setSelectedFirm(record);
                new_arr.includes(record.id) ? new_arr = new_arr.filter(item => item !== record.id) : new_arr = [...new_arr, record.id];//若紀錄已被勾選刪除紀錄，否則紀錄勾選id
                setUpdateId(new_arr);
            });
            fetchNextPage();
        }, function done(err) {
            if (err) { console.error(err); return; }
        });
    }
    //console.log(SelectedId_arr);

    function filter_firm(inputvalue){
        console.log("firm:"+firm);
        console.log("inputvalue:"+inputvalue);
       
        var filter_temp = firm.filter((this_firm) => {
            console.log("f:"+this_firm.fields.firm_name);
            return this_firm.fields.firm_name.toLowerCase().includes(inputvalue.toLowerCase())
            ||this_firm.fields.firm_phone.toLowerCase().includes(inputvalue.toLowerCase())
            ||this_firm.fields.firm_category.toLowerCase().includes(inputvalue.toLowerCase())
            ||this_firm.fields.firm_address.toLowerCase().includes(inputvalue.toLowerCase())
            ||this_firm.fields.firm_fax.toLowerCase().includes(inputvalue.toLowerCase())
            ||this_firm.fields.firm_mail.toLowerCase().includes(inputvalue.toLowerCase())
            ||this_firm.fields.firm_GUI.toLowerCase().includes(inputvalue.toLowerCase())
            ||this_firm.fields.firm_remit.toLowerCase().includes(inputvalue.toLowerCase())
            ||this_firm.fields.firm_remark.toLowerCase().includes(inputvalue.toLowerCase());
            }
        )
        if (filter_temp.length > 0 ){
            setFilteredFirm([...filter_temp]);
    
            console.log(filter_temp.length);
            console.log("filter:"+filter_temp[0].fields.firm_name);

        }
        
    };
    //處理換頁footer
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, filteredFirm.length - page * rowsPerPage);

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
              <input type="text" id="search" placeholder="搜尋" onChange={e => filter_firm(e.target.value)} style={{ color: "black" }} />
            </Grid>
            <Grid item>
              <Grid container direction="row" justify="flex-end" alignItems="center" spacing={3}>
                <Grid item>
                    {SelectedId_arr.length === 1 && <FirmUpdate update_id={SelectedId_arr[0]} firm={SelectedFirm} />}
                </Grid>
                <Grid item>
                    {SelectedId_arr.length > 0 && <FirmDelete delete_id={SelectedId_arr} />}
                </Grid>
                <Grid item><FirmCreate /></Grid>
              </Grid>
            </Grid>
          </Grid>
              <Paper className={classes.paper}>
              <div>
                <TableContainer>
                    <Table tablename="firm">
                        <TableHead>
                            <TableRow>
                                <TableCell padding="checkbox">
                                    
                                </TableCell>
                                <TableCell>廠商公司名稱</TableCell>
                                <TableCell>公司類別</TableCell>
                                <TableCell>公司電話</TableCell>
                                <TableCell>公司傳真</TableCell>
                                <TableCell>公司地址</TableCell>
                                <TableCell>公司信箱</TableCell>
                                <TableCell>統編</TableCell>
                                <TableCell>匯款資訊</TableCell>
                                <TableCell>備註</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {(rowsPerPage > 0
                                ? filteredFirm.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                : filteredFirm).map((this_firm)=>(
                                <TableRow key={this_firm.fields.firm_id}>
                                    <TableCell padding="checkbox">
                                        <Checkbox id={this_firm.fields.firm_id.toString()} onClick={handleSelect}/>
                                    </TableCell>
                                    <TableCell>{this_firm.fields.firm_name}</TableCell>
                                    <TableCell>{this_firm.fields.firm_category}</TableCell>
                                    <TableCell>{this_firm.fields.firm_phone}</TableCell>
                                    <TableCell>{this_firm.fields.firm_fax}</TableCell>
                                    <TableCell>{this_firm.fields.firm_address}</TableCell>
                                    <TableCell>{this_firm.fields.firm_mail}</TableCell>
                                    <TableCell>{this_firm.fields.firm_GUI}</TableCell>
                                    <TableCell>{this_firm.fields.firm_remit}</TableCell>
                                    <TableCell>{this_firm.fields.firm_remark}</TableCell>
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
                        count={filteredFirm.length}
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
import { Grid, Table, TableCell, TableRow, TableContainer, TableHead, Checkbox, TableBody, TablePagination, Paper } from "@material-ui/core";
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import ReservationUpdate from "./reservation_update";
import ReservationCreate from "./reservation_create";
import ReservationDelete from "./reservation_delete";
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
export default function Reservation_search(props){
  const classes = useStyles();
    var Airtable = require('airtable');
    var base = new Airtable({ apiKey: 'keyUAL9XklAOyi08b' }).base('apphBomMb49ieU17N');
    //get Customer data from airtable
    var moment = require('moment');
    const [reservation, setReservation] = useState([]);
  
    const [filteredReservation, setFilteredReservation] = useState([]);

    useEffect(() => {
        base('reservation').select({
            view: "Grid view"
        }).eachPage(function page(records, fetchNextPage) {
            records.forEach(function (record) {
                setFilteredReservation(records);
                setReservation(records);

            });
            fetchNextPage();
        }, function done(err) {
            if (err) { console.error(err); return; }
            console.log("in useEffect");
            console.log(reservation.length);
            
           
        });
    },[])

    const [SelectedId_arr, setUpdateId] = useState([]);
    const [SelectedReservation, setSelectedReservation] = useState([]);
    const handleSelect = (event) => {
        var new_select_id = event.target.getAttribute("id");
        var new_arr = SelectedId_arr;
        base('reservation').select({
            view: "Grid view",
            filterByFormula: "{res_id}='" + new_select_id + "'"
        }).eachPage(function page(records, fetchNextPage) {
            records.forEach(function (record) {
                setSelectedReservation(record);
                new_arr.includes(record.id) ? new_arr = new_arr.filter(item => item !== record.id) : new_arr = [...new_arr, record.id];//??????????????????????????????????????????????????????id
                setUpdateId(new_arr);
            });
            fetchNextPage();
        }, function done(err) {
            if (err) { console.error(err); return; }
        });
    }

    function filter_res(inputvalue){
        console.log("reservation:"+reservation);
        console.log("inputvalue:"+inputvalue);
        console.log("-----");
        var filter_temp = reservation.filter((this_reservation) => {
            console.log("r:"+this_reservation.fields.res_name);
            const res_cus_name =  this_reservation.fields.res_cus_name.toString();
            const res_cus_phone =  this_reservation.fields.res_cus_phone.toString();
            const res_date =  (moment(this_reservation.fields.res_date).format('YYYY-MM-DD HH:mm')).toString();
            const res_em_name =  this_reservation.fields.res_em_name.toString();
            

            return res_cus_name.toLowerCase().includes(inputvalue.toLowerCase())
            ||res_cus_phone.toLowerCase().includes(inputvalue.toLowerCase())
            ||res_date.toLowerCase().includes(inputvalue.toLowerCase())
            ||res_em_name.toLowerCase().includes(inputvalue.toLowerCase())
            ||this_reservation.fields.res_status.toLowerCase().includes(inputvalue.toLowerCase())
            ||this_reservation.fields.res_remark.toLowerCase().includes(inputvalue.toLowerCase())

            }
        )
        if (filter_temp.length > 0 ){
            setFilteredReservation([...filter_temp]);
    
            console.log(filter_temp.length);
            console.log("filter:"+filter_temp[0].fields.res_name);

        }
        
    };
    //????????????footer
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, filteredReservation.length - page * rowsPerPage);

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
              <input type="text" id="search" placeholder="??????" onChange={e => filter_res(e.target.value)} style={{ color: "black" }} />
            </Grid>
            <Grid item>
              <Grid container direction="row" justify="flex-end" alignItems="center" spacing={3}>
                <Grid item>
                    {SelectedId_arr.length === 1 && <ReservationUpdate update_id={SelectedId_arr[0]} reservation={SelectedReservation} />}
                </Grid>
                <Grid item>
                    {SelectedId_arr.length > 0 && <ReservationDelete delete_id={SelectedId_arr} />}
                </Grid>
                <Grid item><ReservationCreate /></Grid>
              </Grid>
            </Grid>
          </Grid>
                <Paper className={classes.paper}>
                <div>
                <TableContainer>
                    <Table tablename='reservation'>
                        <TableHead>
                            <TableRow>
                                <TableCell padding="checkbox">
                                </TableCell>
                                <TableCell>????????????</TableCell>
                                <TableCell>????????????</TableCell>
                                <TableCell>????????????</TableCell>
                                <TableCell>??????????????????</TableCell>
                                <TableCell>????????????</TableCell>
                                <TableCell>??????</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {(rowsPerPage > 0
                                ? filteredReservation.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                : filteredReservation).map((this_reservation)=>(
                                <TableRow key={this_reservation.fields.res_id}>
                                    <TableCell padding="checkbox">
                                        <Checkbox id={this_reservation.fields.res_id.toString()} onClick={handleSelect}/>
                                    </TableCell>
                                    <TableCell>{this_reservation.fields.res_cus_name}</TableCell>
                                    <TableCell>{this_reservation.fields.res_cus_phone}</TableCell>
                                    <TableCell>{moment(this_reservation.fields.res_date).format('YYYY-MM-DD HH:mm')}</TableCell>
                                    <TableCell>{this_reservation.fields.res_em_name}</TableCell>
                                    <TableCell>{this_reservation.fields.res_status}</TableCell>
                                    <TableCell>{this_reservation.fields.res_remark}</TableCell>
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
                        count={filteredReservation.length}
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
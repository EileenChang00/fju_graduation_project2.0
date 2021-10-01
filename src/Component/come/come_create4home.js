import { Button, Dialog, DialogContent, DialogTitle, InputLabel, Select, MenuItem, TextField, DialogActions,Typography } from "@material-ui/core";
import { useState, useEffect } from 'react';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';


export default function Come_create4home(){
    //connect airtable
    var Airtable = require('airtable');
    var base = new Airtable({apiKey: 'keyUAL9XklAOyi08b'}).base('apphBomMb49ieU17N');
    //import moment
    var moment = require('moment');
    const currentDate = moment().format('YYYY-MM-DD');
    console.log(currentDate);
    //control Update-Dialog open
    const [open,setOpen] = useState(false);
    const handleOpen = () =>{
        setOpen(true);
    }
    const handleClose = () =>{
        setOpen(false);
    }
    //multiple choices 
    //顧客名稱選單
    const [SelectCustomer, setSelectCustomer] = useState([]);
    useEffect(()=>{
        base('customer').select({
        view: "Grid view2"
    }).eachPage(function page(records, fetchNextPage) {
        records.forEach(function(record) {
            SelectCustomer.push([record.fields.cus_name,record.fields.cus_phone,record.id]);
            setSelectCustomer(SelectCustomer);
        });
        fetchNextPage();

    }, function done(err) {
        if (err) { console.error(err); return; }
    });
    },[])
    const filter = createFilterOptions();//選單內搜尋
    const [open_Customer, openCustomerDialog] = useState(false);//打開新增顧客視窗
    const [value_cus, setValue_cus] = useState('');
    const [dialogValue_cus, setDialogValue_cus] = useState({
        name: '',
        phone: '',
    });
    const closeCustomerDialog = () => {
        setDialogValue_cus({
        name: '',
        phone: '',
        });
        openCustomerDialog(false);
    };
        //判斷手機格式
    const [phoneError, setphoneError] = useState(false);
    function phoneFormat(phoneNum){
        console.log(phoneNum);
        setDialogValue_cus({ ...dialogValue_cus, phone: phoneNum })
        if(phoneNum.toString().length===10){
            setphoneError(false);
        }else{
            setphoneError(true);
        }
    }
        //新增新顧客姓名電話
    const handleSubmitCustomer = (event) =>{
        event.preventDefault();
        if(phoneError){
            alert("輸入資料有誤，請確認")
        }else{
            base('customer').create([{
            "fields": {
                "cus_name": dialogValue_cus.name,
                "cus_phone": dialogValue_cus.phone
            }}
            ], function(err, records) {
            if (err) {
                return;
            }
            records.forEach(function (record) {
                setCustomerId(record.getId());
            });
            });
            setValue_cus(dialogValue_cus.name);
            closeCustomerDialog();
        }
    }

    //員工名稱選單
    const [SelectEmployee, setSelectEmployee] = useState([]);
    useEffect(()=>{
        base('employee').select({
            view: "Grid view2"
        }).eachPage(function page(records, fetchNextPage) {
            records.forEach(function(record) {
                SelectEmployee.push({
                    recordId:record.id,
                    name:record.fields.em_name});
                setSelectEmployee(SelectEmployee);
            });
            fetchNextPage();
        }, function done(err) {
            if (err) { console.error(err); return; }
        });
    },[])
    //產品名稱選單
    const [SelectProduct, setSelectProduct] = useState([]);
    useEffect(()=>{
        base('product').select({
            view: "Grid view2"
        }).eachPage(function page(records, fetchNextPage) {
            records.forEach(function(record) {
                SelectProduct.push({
                    recordId:record.id,
                    name:record.fields.product_name});
                setSelectProduct(SelectProduct);
            });
            fetchNextPage();
        }, function done(err) {
            if (err) { console.error(err); return; }
        });
    },[])
    console.log(SelectProduct);
    //得知管道選單
    const [infomenu, setInfomenu] = useState([]);
    useEffect(()=>{
        base('infomenu').select({
            view: "Grid view"
        }).eachPage(function page(records, fetchNextPage) {
            records.forEach(function(record) {
                infomenu.push(record.fields.menu);
                setInfomenu(infomenu);
            });
            fetchNextPage();
        }, function done(err) {
            if (err) { console.error(err); return; }
        });
    },[])
    //選單樣式
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
    PaperProps: {
        style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
        },
    },
    };

    //get & prepare update data
    const [newCustomerId, setCustomerId] = useState('');
    const [newComeDate, setComeDate] = useState(currentDate);
    const ChangeComeDate = (event) =>{
        setComeDate(event.target.value);
    };
    const [newEmployeeId, setEmployeeId] = useState(localStorage.getItem('id'));
    const ChangeEmployeeId = (event) =>{
        setEmployeeId(event.target.value);
    };
    const [newKnow, setKnow] = useState('');
    const ChangeKnow = (event) =>{
        setKnow(event.target.value);
    };
    const [newProductId, setProductId] = useState([]);
    const [newTime, setTime] = useState('');
    const ChangeTime = (event) =>{
        setTime(event.target.value);
    };
    const [newRemark, setRemark] = useState('');
    const ChangeRemark = (event) =>{
        setRemark(event.target.value);
    };
    //when Create button is clicked
    function handleClick(){
        base('come').create([
        {
            "fields": {
            "com_cus_id": [newCustomerId],
            "com_date": newComeDate,
            "com_em_id": [newEmployeeId],
            "com_know": newKnow,
            "com_time": newTime,
            "com_remark": newRemark,
            "com_product_id": newProductId
            }
        },
        ], function(err, records) {
        if (err) {
            console.error(err);
            alert(err);
            return;
        }
        alert("完成新增");
        });
        handleClose();
    }
    return(
        <div>
            <Typography variant="h6" onClick={handleOpen}>來訪</Typography>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>新增來訪資料</DialogTitle>
                <DialogContent>
                    <Autocomplete 
                    value={value_cus}
                    onChange={(event, newValue) => {
                        console.log(newValue);
                        if(!newValue){
                            console.log('newValue');
                        }else if (newValue && newValue[0].search(newValue[1]) !== -1) {
                            // timeout to avoid instant validation of the dialog's form.
                            setTimeout(() => {
                            openCustomerDialog(true);
                            setDialogValue_cus({
                                name: newValue[1],
                                phone:''
                            });
                            });
                        }else {
                            setValue_cus(newValue[0]);
                            setCustomerId(newValue[2]);
                        }
                        }}
                    filterOptions={(options, params) => {
                        const filtered = filter(options, params);
                        if (params.inputValue !== '') {
                            filtered.push([
                            `新增顧客 "${params.inputValue}"`,
                            params.inputValue,
                            ]);
                        }
                        return filtered;
                        }}
                    options={SelectCustomer}
                    getOptionLabel={(option) => {
                        // e.g value selected with enter, right from the input
                        if (typeof option === 'string') {
                            return option;
                        }
                        return option[0];
                        }}// 在選單中按了選擇的名稱後，回傳顯示在TextField裡的值
                    selectOnFocus
                    clearOnBlur
                    renderOption={(option) => option[0]+","+option[1]}//在選單中顯示的內容(此為顧客名稱List)
                    freeSolo//可以任意輸入非選單內的文字
                    renderInput={(params) => (
                        <TextField {...params} label="顧客名稱" />
                    )}
                    />
                    <Dialog open={open_Customer} onClose={closeCustomerDialog} aria-labelledby="form-dialog-title">
                        <form onSubmit={handleSubmitCustomer}>
                        <DialogTitle id="form-dialog-title">請輸入新顧客的姓名和聯絡方式!</DialogTitle>
                        <DialogContent>
                            <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            value={dialogValue_cus.name}
                            onChange={(event) => setDialogValue_cus({ ...dialogValue_cus, name: event.target.value })}
                            label="顧客名稱"
                            type="text"
                            />
                            <TextField
                            margin="dense"
                            id="phone"
                            error={phoneError}
                            value={dialogValue_cus.phone}
                            onChange={(event) => phoneFormat(event.target.value)}
                            label="手機"
                            type="number"
                            helperText={phoneError&& "輸入長度有誤"}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={closeCustomerDialog} color="primary">
                            取消
                            </Button>
                            <Button type="submit" color="primary">
                            新增
                            </Button>
                        </DialogActions>
                        </form>
                    </Dialog>
                    <InputLabel>來訪日期</InputLabel>
                    <TextField margin="dense" type="date" value={newComeDate} onChange={ChangeComeDate} fullWidth />
                    <InputLabel>負責員工名稱</InputLabel>
                    <Select label="負責員工名稱" fullWidth value={newEmployeeId} onChange={ChangeEmployeeId} MenuProps={MenuProps}>
                        {SelectEmployee.map((nameList) =>(
                            <MenuItem key={nameList.recordId} value={nameList.recordId}>{nameList.name}</MenuItem>
                        ))}
                    </Select>
                    <InputLabel>得知管道</InputLabel>
                    <Select label="得知管道" fullWidth value={newKnow} onChange={ChangeKnow} MenuProps={MenuProps}>
                        {infomenu.map((infomenu) =>(
                            <MenuItem key={infomenu} value={infomenu}>{infomenu}</MenuItem>
                        ))}
                    </Select>
                    <Autocomplete
                        freeSolo
                        multiple
                        onChange={(event,newValue)=>{
                            if(!newValue){
                                console.log("!newValue");
                            }
                            console.log(newValue);
                            setProductId(newValue.map((product)=>product.recordId));
                        }}
                        options={SelectProduct}
                        getOptionLabel={(option) => option.name}
                        renderInput={(params) => (
                        <TextField {...params} label="有興趣的產品" margin="normal" />
                        )}
                    />
                    <TextField margin="dense" label="停留時長" type="text" value={newTime} onChange={ChangeTime} fullWidth />
                    <TextField margin="dense" label="備註" type="text" value={newRemark} onChange={ChangeRemark} fullWidth />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>取消</Button>
                    <Button onClick={handleClick}>新增</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
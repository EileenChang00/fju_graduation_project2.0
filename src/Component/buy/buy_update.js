import React, { useState, useEffect } from "react";
import { Button, Dialog, DialogContent, DialogTitle, DialogActions, TextField, InputLabel, Select, MenuItem, Grid, IconButton, Typography } from "@material-ui/core";
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';

export default function Buy_update(props){
    const buy = props.buy;
    console.log(props.update_id);
    //connect airtable
    var Airtable = require('airtable');
    var base = new Airtable({apiKey: 'keyUAL9XklAOyi08b'}).base('apphBomMb49ieU17N');
    //import moment
    var moment = require('moment');
    const currentDate = moment().format('YYYY-MM-DD');
    //open 新增 Dialog
    const [open, setOpen] = useState(false);
    const handleOpen = () =>{
        setOpen(true);
    }
    const handleClose = () =>{
        setOpen(false);
    }
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
    const [newCustomerId, setCustomerId] = useState(buy.fields.buy_cus_id);
    const [newBuyDate, setBuyDate] = useState(buy.fields.buy_date);
    const [newShippingDate, setShippingDate] = useState(buy.fields.buy_shippingdate);
    const [newShop, setShop] = useState(buy.fields.buy_shop);
    const [newEmployeeId, setEmployeeId] = useState(buy.fields.buy_em_id);
    const [newActualPrice, setActualPrice] = useState(buy.fields.buy_actualprice);
    const [newFixedPrice, setFixedPrice] = useState(buy.fields.buy_fixedprice);
    const [newRemark, setRemark] = useState(buy.fields.buy_remark);
    const ChangeBuyDate = (event) =>{
        setBuyDate(event.target.value);
    }
    const ChangeShippingDate = (event) =>{
        setShippingDate(event.target.value);
    }
    const ChangeShop = (event) =>{
        setShop(event.target.value);
    }
    const ChangeEmployeeId = (event) =>{
        setEmployeeId(event.target.value);
    }
    const ChangeActualPrice = (event) =>{
        setActualPrice(event.target.value);
    }
    const ChangeFixedPrice = (event) =>{
        setFixedPrice(event.target.value);
    }
    const ChangeRemark = (event) =>{
        setRemark(event.target.value);
    }
    //multiple choices select
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
    const [value_cus, setValue_cus] = useState(buy.fields.buy_cus_name);
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
        //新增新顧客姓名電話
    const handleSubmitCustomer = (event) =>{
        event.preventDefault();
        base('customer').create([{
        "fields": {
            "cus_name": dialogValue_cus.name,
            "cus_phone": dialogValue_cus.phone
        }
    }
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
    //購買門市選單
    const ShopChoice = [
        {id:'Taipei', name:'台北門市'},
        {id:'Taichung', name:'台中門市'}
    ]
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
    //Sale Section
    const [open_Sale, openSaleDialog] = useState(false);
    const handleSaleDialog = () =>{
        openSaleDialog(true);
    }
    const closeSaleDialog = () =>{
        setSaleName('');
        setSaleCount('');
        openSaleDialog(false);
    }
        //已選擇的sale
    var buy_sale = [];
    useEffect(()=>{
        buy.fields.sale_id && buy.fields.sale_id.forEach(function(sale_id){
            base('sale').find(sale_id, function(err, record) {
                if (err) { console.error(err); return; }
                console.log('Retrieved', record.id);
                buy_sale.push([
                    record.fields.product_name[0],
                    record.fields.sale_count,
                    record.fields.product[0]
                ]);
            });
        })
    },[]);
    console.log(buy_sale);
    const [value_sale, setValue_sale] = useState(buy_sale);
    const [saleName, setSaleName] = useState();
    const [saleId, setSaleId] = useState();
    const [saleCount, setSaleCount] = useState();
    const ChangesaleCount = (event) =>{
        setSaleCount(event.target.value);
    }
        //點擊 Sale 的 Add Icon
    const addSale = () =>{
        value_sale.includes(saleName) ? value_sale.push([saleName,saleCount]) : value_sale.push([saleName,saleCount,saleId]);
        setValue_sale(value_sale);
        setSaleName('');
        setSaleCount('');
        setSaleId('');
    }
        //點擊 Sale 的 Delete Icon
    const deleteSale = (event) =>{
        var delete_sale;
        value_sale.forEach(function(sale){
            console.log(event.currentTarget.getAttribute("getname"));
            if(sale[0]===event.currentTarget.getAttribute("getname")){
                delete_sale = sale;
                console.log(delete_sale);
            }
        })
        var sale_temp = value_sale.filter(item => item!==delete_sale);
        setValue_sale(sale_temp);
    }
    console.log(value_sale);
    const [sale_arr, setSaleArr] = useState([]);
    //Gift Section
    const [open_Gift, openGiftDialog] = useState(false);
    const handleGiftDialog = () =>{
        openGiftDialog(true);
    }
    const closeGiftDialog = () =>{
        setGiftName('');
        setGiftCount('');
        openGiftDialog(false);
    }
        //已選擇的gift
    var buy_gift = [];
    useEffect(()=>{
        buy.fields.buy_gift_id && buy.fields.buy_gift_id.forEach(function(gift_id){
            base('gift').find(gift_id, function(err, record) {
                if (err) { console.error(err); return; }
                console.log('Retrieved', record.id);
                buy_gift.push([
                    record.fields.product_name[0],
                    record.fields.gift_count,
                    record.fields.product[0]
                ]);
            });
        })
    },[]);
    console.log(buy_gift);
    const [value_gift, setValue_gift] = useState(buy_gift);
    const [giftName, setGiftName] = useState();
    const [giftId, setGiftId] = useState();
    const [giftCount, setGiftCount] = useState();
    const ChangegiftCount = (event) =>{
        setGiftCount(event.target.value);
    }
        //點擊 Gift 的 Add Icon
    const addGift = () =>{
        value_gift.includes(giftName) ? value_gift.push([giftName,giftCount]) : value_gift.push([giftName,giftCount,giftId]);
        setValue_gift(value_gift);
        setGiftName('');
        setGiftCount('');
        setGiftId('');
    }
        //點擊 Gift 的 Delete Icon
    const deleteGift = (event) =>{
        var delete_gift;
        value_gift.forEach(function(gift){
            console.log(event.currentTarget.getAttribute("getname"));
            if(gift[0]===event.currentTarget.getAttribute("getname")){
                delete_gift = gift;
                console.log(delete_gift);
            }
        })
        var gift_temp = value_gift.filter(item => item!==delete_gift);
        setValue_gift(gift_temp);
    }
    console.log(value_gift);
    const [gift_arr, setGiftArr] = useState([]);
    //When UpdateButton is clicked
    function handleClick(){
        if(!buy.fields.sale_id && !buy.fields.buy_gift_id){
            update_sale();
            update_gift();
        }else if(typeof buy.fields.sale_id === "object" && !buy.fields.buy_gift_id){
            delete_sale();
            update_gift();
        }else if(!buy.fields.sale_id && typeof buy.fields.buy_gift_id === "object"){
            update_sale();
            delete_gift();
        }
        else{
            delete_sale();
            delete_gift();
        }
    }
    function update_buy(){
        console.log("buy");  
        base('buy').update([
        newShippingDate ? 
        {"id": props.update_id,
        "fields": {
            "buy_cus_id": newCustomerId,
            "buy_date": newBuyDate, 
            "buy_shippingdate": newShippingDate,
            "buy_shop": newShop,
            "buy_em_id": newEmployeeId,
            "buy_actualprice": newActualPrice,
            "buy_fixedprice":newFixedPrice,
            "buy_remark":newRemark,
            "sale_id":sale_arr,
            "buy_gift_id":gift_arr,
            }
        } : {"id": props.update_id,
        "fields": {
            "buy_cus_id": newCustomerId,
            "buy_date": newBuyDate,
            "buy_shop": newShop,
            "buy_em_id": newEmployeeId,
            "buy_actualprice": newActualPrice,
            "buy_fixedprice":newFixedPrice,
            "buy_remark":newRemark,
            "sale_id":sale_arr,
            "buy_gift_id":gift_arr,
            }
        }
        ], function(err, records) {
        if (err) {
            console.error(err);
            alert(err);
            return;
        }
        records.forEach(function (record) {
            console.log(record.getId());
        });
        alert("完成修改");
        handleClose();
        window.location.reload();
        });
    }
    function delete_sale(){
        base('sale').destroy(buy.fields.sale_id, function(err, deletedRecords) {
            if (err) {
                console.error(err);
                return;
            }
            console.log('Deleted', deletedRecords.length, 'records');
            update_sale();
        });
    }
    function update_sale(){
        var sales_records = value_sale.map((item)=>{return {fields: {
                    product: [item[2]],
                    sale_count: parseInt(item[1],10)}
            }})
        //console.log(sales_records);
        if(!value_sale[0]){
            alert("請選擇購買產品");
        }else{
            base('sale').create(sales_records, function(err, records) {
                if (err) {
                    console.error(err);
                    alert(err);
                    return;
                }
                records.forEach(function(record){
                    var sale_temp = sale_arr;
                    //console.log("typeof sale_temp="+typeof sale_temp);
                    //console.log("sale_temp(before)="+sale_temp);
                    //console.log(record.getId());
                    sale_temp.push(record.id);
                    setSaleArr(sale_temp);
                    //console.log(sale_arr);
                    //console.log("typeof sale_arr="+typeof sale_arr);
                });
                update_buy();
            });
        }
    };
    function delete_gift(){
        base('gift').destroy(buy.fields.buy_gift_id, function(err, deletedRecords) {
            if (err) {
                console.error(err);
                return;
            }
            console.log('Deleted', deletedRecords.length, 'records');
            update_gift();
        });
    }
    function update_gift(){
        var gifts_records = value_gift.map((item)=>{return {fields: {
                    product: [item[2]],
                    gift_count: parseInt(item[1],10)}
            }})
        //console.log(sales_records);
        if(!value_gift[0]){
            console.log("no gift");
            update_buy();
        }else{ 
            base('gift').create(gifts_records, function(err, records) {
                if (err) {
                    console.error(err);
                    alert(err);
                    return;
                }
                records.forEach(function(record){
                    var gift_temp = gift_arr;
                    //console.log("typeof sale_temp="+typeof sale_temp);
                    //console.log("sale_temp(before)="+sale_temp);
                    //console.log(record.getId());
                    gift_temp.push(record.id);
                    setGiftArr(gift_temp);
                    //console.log(sale_arr);
                    //console.log("typeof sale_arr="+typeof sale_arr);
                });
                update_buy();
            });
        }
    };
    return(
        <div>
            <Button variant="contained" color="default" onClick={handleOpen} >修改</Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>新增資料</DialogTitle>
                <DialogContent>
                    <Autocomplete  
                    value={value_cus}
                    onChange={(event, newValue) => {
                        if(!newValue){
                            console.log('!newValue');
                        }else if (newValue && newValue[0].search(newValue[1]) !== -1) {
                            //顧客不存在
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
                            value={dialogValue_cus.phone}
                            onChange={(event) => setDialogValue_cus({ ...dialogValue_cus, phone: event.target.value })}
                            label="手機"
                            type="number"
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
                    {/* 在Autocomplete freesolo下拉式選單
                    選擇產品，
                    彈出視窗輸入該產品購買數量，
                    並新增至sale資料表 */}
                    <InputLabel>購買產品</InputLabel>
                    <TextField button disabled fullWidth margin="dense" id="sale" onClick={handleSaleDialog} value={value_sale.map((sale)=>sale[0])}></TextField>
                    <Dialog open={open_Sale} onClose={closeSaleDialog} fullWidth>
                        <DialogTitle id="form-dialog-title">請輸入購買產品及數量</DialogTitle>
                        <DialogContent>
                            <Grid container direction="row" justify="flex-end" spacing={3}>
                                <Grid item xs>
                                <Autocomplete
                                freeSolo//可以任意輸入非選單內的文字
                                value={saleName}
                                options={SelectProduct}
                                onChange={(event,newValue)=>{
                                    if(!newValue){
                                        console.log("!newValue");
                                    }else{
                                        setSaleName(newValue.name);
                                        setSaleId(newValue.recordId);
                                    }
                                }}
                                getOptionLabel={(option) =>{return option.name}}
                                selectOnFocus
                                clearOnBlur
                                renderInput={(params) => (
                                    <TextField {...params} label="產品名稱" margin="dense" size="medium"/>
                                )}
                                /></Grid>
                                <Grid item xs>
                                <TextField
                                margin="dense"
                                id="count"
                                value={saleCount}
                                onChange={ChangesaleCount}
                                label="數量"
                                type="number"
                                /></Grid>
                                <Grid item>
                                    <label  onClick={addSale}>
                                    <IconButton color="primary"><AddRoundedIcon/></IconButton>
                                    </label>
                                </Grid>
                            </Grid>
                            {value_sale.map((sale)=>(
                                <Grid container direction="row" justify="flex-end" spacing={3}
                                key={sale[0]}>
                                    <Grid item xs>
                                        <Typography color="secondary">{sale[0]}</Typography>
                                    </Grid>
                                    <Grid item xs>
                                        <Typography color="secondary">{sale[1]}</Typography>
                                    </Grid>  
                                    <Grid item>
                                        <IconButton color="primary"  onClick={deleteSale} getname={sale[0]}><DeleteRoundedIcon/></IconButton>
                                    </Grid>
                                </Grid>
                            ))}
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={closeSaleDialog} color="primary">
                            完成
                            </Button>
                        </DialogActions>
                    </Dialog>
                    <InputLabel>購買日期</InputLabel>
                    <TextField margin="dense" type="date" value={newBuyDate} onChange={ChangeBuyDate} fullWidth />
                    <InputLabel>出貨日期</InputLabel>
                    <TextField margin="dense" type="date" value={newShippingDate} onChange={ChangeShippingDate} fullWidth />
                    <InputLabel>購買門市</InputLabel>
                    <Select label="購買門市" fullWidth value={newShop} onChange={ChangeShop} MenuProps={MenuProps}>
                        {ShopChoice.map((list) =>(
                            <MenuItem key={list.id} value={list.name}>{list.name}</MenuItem>
                        ))}
                    </Select>
                    <InputLabel>負責員工名稱</InputLabel>
                    <Select label="負責員工名稱" fullWidth value={newEmployeeId} onChange={ChangeEmployeeId} MenuProps={MenuProps}>
                        {SelectEmployee.map((nameList) =>(
                            <MenuItem key={nameList.recordId} value={nameList.recordId}>{nameList.name}</MenuItem>
                        ))}
                    </Select>
                    <TextField margin="dense" label="實價" type="number" value={newActualPrice} onChange={ChangeActualPrice} fullWidth />
                    <InputLabel>定價</InputLabel>
                    <TextField disabled margin="dense" type="number" value={newFixedPrice} onChange={ChangeFixedPrice} fullWidth />
                    {/* 在Autocomplete freesolo下拉式選單
                    選擇贈品，
                    彈出視窗輸入該贈品數量，
                    並新增至gift資料表 */}
                    <InputLabel>贈品</InputLabel>
                    <TextField button disabled fullWidth margin="dense" id="gift" onClick={handleGiftDialog} value={value_gift.map((gift)=>gift[0])}></TextField>
                    <Dialog open={open_Gift} onClose={closeGiftDialog} fullWidth>
                        <DialogTitle id="form-dialog-title">請輸入購買產品及數量</DialogTitle>
                        <DialogContent>
                            <Grid container direction="row" justify="flex-end" spacing={3}>
                                <Grid item xs>
                                <Autocomplete
                                freeSolo//可以任意輸入非選單內的文字
                                value={giftName}
                                options={SelectProduct}
                                onChange={(event,newValue)=>{
                                    if(!newValue){
                                        console.log("!newValue");
                                    }else{
                                        setGiftName(newValue.name);
                                        setGiftId(newValue.recordId);
                                    }
                                }}
                                getOptionLabel={(option) =>{return option.name}}
                                selectOnFocus
                                clearOnBlur
                                renderInput={(params) => (
                                    <TextField {...params} label="產品名稱" margin="dense" size="medium"/>
                                )}
                                /></Grid>
                                <Grid item xs>
                                <TextField
                                margin="dense"
                                id="count"
                                value={giftCount}
                                onChange={ChangegiftCount}
                                label="數量"
                                type="number"
                                /></Grid>
                                <Grid item>
                                    <label  onClick={addGift}>
                                    <IconButton color="primary"><AddRoundedIcon/></IconButton>
                                    </label>
                                </Grid>
                            </Grid>
                            {value_gift.map((gift)=>(
                                <Grid container direction="row" justify="flex-end" spacing={3}
                                key={gift[0]}>
                                    <Grid item xs>
                                        <Typography color="secondary">{gift[0]}</Typography>
                                    </Grid>
                                    <Grid item xs>
                                        <Typography color="secondary">{gift[1]}</Typography>
                                    </Grid>  
                                    <Grid item>
                                        <IconButton color="primary"  onClick={deleteGift} getname={gift[0]}><DeleteRoundedIcon/></IconButton>
                                    </Grid>
                                </Grid>
                            ))}
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={closeGiftDialog} color="primary">
                            完成
                            </Button>
                        </DialogActions>
                    </Dialog>
                    <TextField margin="dense" label="備註" type="text" value={newRemark} onChange={ChangeRemark} fullWidth />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>取消</Button>
                    <Button onClick={handleClick}>修改</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
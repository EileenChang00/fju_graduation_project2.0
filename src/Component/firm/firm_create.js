import { Button, Dialog, DialogContent, DialogTitle, InputLabel, Select, MenuItem, TextField, DialogActions } from "@material-ui/core";
import { useState, useEffect } from 'react';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';

export default function Firm_create(){
    //connect airtable
    var Airtable = require('airtable');
    var base = new Airtable({apiKey: 'keyUAL9XklAOyi08b'}).base('apphBomMb49ieU17N');
    //control Update-Dialog open
    const [open,setOpen] = useState(false);
    const handleOpen = () =>{
        setOpen(true);
    }
    const handleClose = () =>{
        setOpen(false);
    }
    //multiple choice
    //廠商類別選單
    const [firmmenu, setFirmmenu] = useState([]);
    useEffect(()=>{
        base('firmmenu').select({
            view: "Grid view"
        }).eachPage(function page(records, fetchNextPage) {
            records.forEach(function(record) {
                firmmenu.push(record.fields.menu);
                setFirmmenu(firmmenu);
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
    const [newName, setName] = useState('');
    const ChangeName = (event) =>{
        setName(event.target.value);
    };
    const [newCategory, setCategory] = useState('');
    const ChangeCategory = (event) =>{
        setCategory(event.target.value);
    };
    const [newPhone, setPhone] = useState('');
    const ChangePhone = (event) =>{
        setPhone(event.target.value);
    };
    const [newFax, setFax] = useState('');
    const ChangeFax = (event) =>{
        setFax(event.target.value);
    };
    const [newAddress, setAddress] = useState('');
    const ChangeAddress = (event) =>{
        setAddress(event.target.value);
    };
    const [newMail, setMail] = useState('');
    const ChangeMail = (event) =>{
        setMail(event.target.value);
    };
    const [newGUI, setGUI] = useState('');
    const ChangeGUI = (event) =>{
        setGUI(event.target.value);
    };
    const [newRemit, setRemit] = useState('');
    const ChangeRemit = (event) =>{
        setRemit(event.target.value);
    };
    const [newRemark, setRemark] = useState('');
    const ChangeRemark = (event) =>{
        setRemark(event.target.value);
    };
    //when Create button is clicked
    function handleClick(){
        base('firm').create([
        {
            "fields": {
            "firm_name" : newName,
            "firm_category": newCategory,
            "firm_phone": newPhone,
            "firm_fax" : newFax,
            "firm_address" : newAddress,
            "firm_mail": newMail,
            "firm_GUI" : newGUI,
            "firm_remit" : newRemit,
            "firm_remark": newRemark,
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
            alert("完成新增");
            handleClose();
        window.location.reload();
        });
        });
    }
    return(
        <div>
            <Button width="25px" variant="contained" color="primary" onClick={handleOpen}>新增</Button>
            <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth="xs">
                <DialogTitle>新增資料</DialogTitle>
                <DialogContent>
                    <TextField margin="dense" label="廠商公司名稱" type="text" value={newName} onChange={ChangeName} fullWidth />
                    <InputLabel>公司類別</InputLabel>
                    <Select label="公司類別" fullWidth value={newCategory} onChange={ChangeCategory} MenuProps={MenuProps}>
                        {firmmenu.map((firmmenu) =>(
                            <MenuItem key={firmmenu} value={firmmenu}>{firmmenu}</MenuItem>
                        ))}
                    </Select>
                    <TextField margin="dense" label="公司電話" type="text" value={newPhone} onChange={ChangePhone} fullWidth />
                    <TextField margin="dense" label="公司傳真" type="text" value={newFax} onChange={ChangeFax} fullWidth />
                    <TextField margin="dense" label="地址" type="text" value={newAddress} onChange={ChangeAddress} fullWidth />
                    <TextField margin="dense" label="電子信箱" type="text" value={newMail} onChange={ChangeMail} fullWidth />
                    <TextField margin="dense" label="公司統編" type="text" value={newGUI} onChange={ChangeGUI} fullWidth />
                    <TextField margin="dense" label="匯款資訊" type="text" value={newRemit} onChange={ChangeRemit} fullWidth />
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
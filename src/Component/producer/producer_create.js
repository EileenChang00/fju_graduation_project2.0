import React, { useState} from "react";
import { Button, Dialog, DialogContent, DialogTitle, DialogActions, TextField} from "@material-ui/core";



export default function Producer_create(){
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
    const [newProducerName, setProducerName] = useState('');
    const ChangeProducerName = (event) =>{
        setProducerName(event.target.value);
    }
    const [newContactperson, setContactperson] = useState('');
    const ChangeContactperson = (event) =>{
        setContactperson(event.target.value);
    }
    const [newAddress, setAddress] = useState('');
    const ChangeAddress = (event) =>{
        setAddress(event.target.value);
    }
    const [newKind, setKind] = useState('');
    const ChangeKind = (event) =>{
        setKind(event.target.value);
    }
    const [newgui, setGui] = useState('');
    const ChangeGui = (event) =>{
        setGui(event.target.value);
    }
    const [newInfo, setInfo] = useState('');
    const ChangeInfo = (event) =>{
        setInfo(event.target.value);
    }
    const [newPhone, setPhone] = useState('');
    const ChangePhone = (event) =>{
        setPhone(event.target.value);
    }
    const [newEmail, setEmail] = useState('');
    const ChangeEmail = (event) =>{
        setEmail(event.target.value);
    }
    const [newRemark, setRemark] = useState('');
    const ChangeRemark = (event) =>{
        setRemark(event.target.value);
    }
    //新增button is clickded
    function handleClick(){
        base('producer').create([
        {
            "fields": {
            "producer_name": newProducerName,
            "producer_contactperson":newContactperson,
            "producer_address": newAddress,
            "producer_kind": newKind,
            "producer_GUI": newgui,
            "producer_info": newInfo,
            "producer_phone": newPhone,
            "producer_email": newEmail,
            "producer_remark": newRemark,
            }
        },
        ], function(err, records) {
        if (err) {
            console.error(err);
            alert(err);
            return;
        }
        alert("完成新增");
        handleClose();
        window.location.reload();
        });
    }
    return(    
      <div>
            <Button width="25px" variant="contained" color="primary" onClick={handleOpen}>新增</Button>
            <Dialog open={open} onClose={handleClose}>
            <DialogTitle>新增資料</DialogTitle>
            <DialogContent>
                <TextField margin="dense" label="後勤廠商名稱" type="text" value={newProducerName} onChange={ChangeProducerName} fullWidth />
                <TextField margin="dense" label="聯絡人" type="text" value={newContactperson} onChange={ChangeContactperson} fullWidth />
                <TextField margin="dense" label="地址" type="text" value={newAddress} onChange={ChangeAddress} fullWidth />
                <TextField margin="dense" label="類別" type="text" value={newKind} onChange={ChangeKind} fullWidth />
                <TextField margin="dense" label="統一編號" type="text" value={newgui} onChange={ChangeGui} fullWidth />
                <TextField margin="dense" label="匯款資訊" type="text" value={newInfo} onChange={ChangeInfo} fullWidth />
                <TextField margin="dense" label="電話" type="text" value={newPhone} onChange={ChangePhone} fullWidth />
                <TextField margin="dense" label="電子信箱" type="text" value={newEmail} onChange={ChangeEmail} fullWidth />   
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
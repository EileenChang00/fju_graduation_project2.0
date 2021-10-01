import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Select, MenuItem, InputLabel } from "@material-ui/core";
import { useEffect, useState } from 'react';

export default function Firm_update(props){
    const firm = props.firm;
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
    const [newName, setName] = useState(firm.fields.firm_name);
    const ChangeName = (event) =>{
        setName(event.target.value);
    };
    const [newCategory, setCategory] = useState(firm.fields.firm_category);
    const ChangeCategory = (event) =>{
        setCategory(event.target.value);
    };
    const [newPhone, setPhone] = useState(firm.fields.firm_phone);
    const ChangePhone = (event) =>{
        setPhone(event.target.value);
    };
    const [newFax, setFax] = useState(firm.fields.firm_fax);
    const ChangeFax = (event) =>{
        setFax(event.target.value);
    };
    const [newAddress, setAddress] = useState(firm.fields.firm_address);
    const ChangeAddress = (event) =>{
        setAddress(event.target.value);
    };
    const [newMail, setMail] = useState(firm.fields.firm_mail);
    const ChangeMail = (event) =>{
        setMail(event.target.value);
    };
    const [newGUI, setGUI] = useState(firm.fields.firm_GUI);
    const ChangeGUI = (event) =>{
        setGUI(event.target.value);
    };
    const [newRemit, setRemit] = useState(firm.fields.firm_remit);
    const ChangeRemit = (event) =>{
        setRemit(event.target.value);
    };
    const [newRemark, setRemark] = useState(firm.fields.firm_remark);
    const ChangeRemark = (event) =>{
        setRemark(event.target.value);
    };
    //When UpdateButton is clicked
    function handleClick(){
        base('firm').update([
        {"id": props.update_id,
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
        }], function(err, records) {
        if (err) {
            console.error(err);
            alert(err);
            return;
        }records.forEach(function(record) {
            console.log(record.get('firm_id'));
            alert("完成修改");
            handleClose();
        window.location.reload();
        });
        });
    };
    return(
        <div>
            <Button variant="contained" color="default" onClick={handleOpen} >修改</Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>修改資料</DialogTitle>
                <DialogContent>
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
                    <Button onClick={handleClick}>修改</Button>
                </DialogActions>
                </DialogContent>
            </Dialog>
        </div>
    )
}
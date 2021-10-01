import { Button, Dialog, DialogContent, DialogTitle, TextField, DialogActions } from "@material-ui/core";
import { useState, useEffect } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';

export default function Firmstaff_create(){
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
    //廠商公司選單
    const [SelectFirm, setSelectFirm] = useState([]);
    useEffect(()=>{
        base('firm').select({
        view: "Grid view2"
    }).eachPage(function page(records, fetchNextPage) {
        records.forEach(function(record) {
            SelectFirm.push({
                recordId:record.id,
                name:record.fields.firm_name,
            });
            setSelectFirm(SelectFirm);
        });
        fetchNextPage();

    }, function done(err) {
        if (err) { console.error(err); return; }
    });
    },[]);
    
    //get & prepare update data
    const [newName, setName] = useState('');
    const ChangeName = (event) =>{
        setName(event.target.value);
    };
    const [newFirmId, setFirmId] = useState('');
    console.log(newFirmId);
    const [newPhone, setPhone] = useState('');
    const ChangePhone = (event) =>{
        setPhone(event.target.value);
    };
    const [newFax, setFax] = useState('');
    const ChangeFax = (event) =>{
        setFax(event.target.value);
    };
    const [newProfession, setProfession] = useState('');
    const ChangeProfession = (event) =>{
        setProfession(event.target.value);
    };
    const [newMail, setMail] = useState('');
    const ChangeMail = (event) =>{
        setMail(event.target.value);
    };
    const [newEvaluation, setEvaluation] = useState('');
    const ChangeEvaluation = (event) =>{
        setEvaluation(event.target.value);
    };
    const [newRemark, setRemark] = useState('');
    const ChangeRemark = (event) =>{
        setRemark(event.target.value);
    };
    //when Create button is clicked
    function handleClick(){
        base('firmstaff').create([
            newFirmId ? {
            "fields": {  
            "firmstaff_name" : newName,
            "firmstaff_firm_id": [newFirmId],
            "firmstaff_phone": newPhone,
            "firmstaff_fax" : newFax,
            "firmstaff_profession" : newProfession,
            "firmstaff_mail": newMail,
            "firmstaff_evaluation" : newEvaluation,
            "firmstaff_remark": newRemark,
            }
        } : {
            "fields": {
            "firmstaff_name" : newName,
            "firmstaff_phone": newPhone,
            "firmstaff_fax" : newFax,
            "firmstaff_profession" : newProfession,
            "firmstaff_mail": newMail,
            "firmstaff_evaluation" : newEvaluation,
            "firmstaff_remark": newRemark,
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
                    <TextField margin="dense" label="廠商人員名稱" type="text" value={newName} onChange={ChangeName} fullWidth />
                    <Autocomplete
                        freeSolo
                        onChange={(event,newValue)=>{
                            if(!newValue){
                                console.log("!newValue");
                            }
                            console.log(newValue);
                            setFirmId(newValue.recordId);
                        }}
                        options={SelectFirm}
                        getOptionLabel={(option) => option.name}
                        renderInput={(params) => (
                        <TextField {...params} label="廠商公司" margin="normal" />
                        )}
                    />
                    <TextField margin="dense" label="手機" type="text" value={newPhone} onChange={ChangePhone} fullWidth />
                    <TextField margin="dense" label="傳真" type="text" value={newFax} onChange={ChangeFax} fullWidth />
                    <TextField margin="dense" label="職稱" type="text" value={newProfession} onChange={ChangeProfession} fullWidth />
                    <TextField margin="dense" label="電子信箱" type="text" value={newMail} onChange={ChangeMail} fullWidth />
                    <TextField margin="dense" label="評價" type="text" value={newEvaluation} onChange={ChangeEvaluation} fullWidth />
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
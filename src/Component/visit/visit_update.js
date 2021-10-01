import Airtable from 'airtable';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Select, MenuItem, InputLabel, DialogContentText } from "@material-ui/core";
import { useEffect, useState } from 'react';


export default function Visit_update(props){
    console.log("update id = "+props.update_id);
    const visit = props.visit;
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
    //當點選修改鍵
    function handleClick(){
        base('visit').update([
        {"id": props.update_id,
            "fields": {
            "vis_firmstaff_id": newFirmstaffId,
            "vis_date": newVisitDate,
            "vis_em_id": newEmployeeId,
            "vis_method": newMethod,
            "vis_purpose": newPurpose,
            "vis_duration": newDuration,
            "vis_status":newStatus,
            "vis_remark": newRemark
            }
        }], function(err, records) {
        if (err) {
            console.error(err);
            alert(err);
            return;
        }records.forEach(function(record) {
            console.log(record.get('vis_id'));
            alert("完成修改");
            handleClose();
        window.location.reload();
        });
        });
    }
    
    //get & prepare update data
    const [newFirmstaffId, setFirmstaffId] = useState(visit.fields.vis_firmstaff_id);
    const ChangeFirmstaffId = (event) =>{
       setFirmstaffId(event.target.value);
    };
    const [newVisitDate, setVisitDate] = useState(visit.fields.vis_date);
    const ChangeVisitDate = (event) =>{
        setVisitDate(event.target.value);
    };
    const [newEmployeeId, setEmployeeId] = useState(visit.fields.vis_em_id);
    const ChangeEmployeeId = (event) =>{
        setEmployeeId(event.target.value);
    };
    const [newMethod, setMethod] = useState(visit.fields.vis_method);
    const ChangeMethod = (event) =>{
        setMethod(event.target.value);
    };
    const [newPurpose, setPurpose] = useState(visit.fields.vis_purpose);
    const ChangePurpose = (event) =>{
        setPurpose(event.target.value);
    };
    const [newDuration, setDuration] = useState(visit.fields.vis_duration);
    const ChangeDuration = (event) =>{
        setDuration(event.target.value);
    };
    const [newStatus, setStatus] = useState(visit.fields.vis_status);
    const ChangeStatus = (event) =>{
        setStatus(event.target.value);
    };
    const [newRemark, setRemark] = useState(visit.fields.vis_remark);
    const ChangeRemark = (event) =>{
        setRemark(event.target.value);
    };

    //firmstafff 選單
    const [SelectFirmstaff, setSelectFirmstaff] = useState([]);
    useEffect(()=>{
        base('firmstaff').select({
            view: "Grid view2"
        }).eachPage(function page(records, fetchNextPage) {
            records.forEach(function(record) {
                SelectFirmstaff.push({
                    recordId:record.id,
                    name:record.fields.firmstaff_name});
                setSelectFirmstaff(SelectFirmstaff);
            });
            fetchNextPage();
        }, function done(err) {
            if (err) { console.error(err); return; }
        });
    },[])
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
    //後續狀態選單
    const StatusChoice = [
        {id:"complete", name:"完成"},
        {id:"Reschedule", name:"改期"},
        {id:"cancel", name:"取消"},
    ]
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

    return(
        <div>
            <Button variant="contained" color="default" onClick={handleOpen} >修改</Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>修改資料</DialogTitle>
                <DialogContent>
                <InputLabel>廠商員工姓名</InputLabel>
                <Select label="廠商員工名稱" fullWidth value={newFirmstaffId} onChange={ChangeFirmstaffId} MenuProps={MenuProps}>
                        {SelectFirmstaff.map((nameList) =>(
                            <MenuItem key={nameList.recordId} value={nameList.recordId}>{nameList.name}</MenuItem>
                        ))}
                    </Select>
                <InputLabel>拜訪日期</InputLabel>
                    <TextField margin="dense" type="date" value={newVisitDate} onChange={ChangeVisitDate} fullWidth />
                    <InputLabel>負責員工名稱</InputLabel>
                    <Select label="負責員工名稱" fullWidth value={newEmployeeId} onChange={ChangeEmployeeId} MenuProps={MenuProps}>
                        {SelectEmployee.map((nameList) =>(
                            <MenuItem key={nameList.recordId} value={nameList.recordId}>{nameList.name}</MenuItem>
                        ))}
                    </Select>
                    <TextField margin="dense" label="方式" type="text" value={newMethod} onChange={ChangeMethod} fullWidth />
                    <TextField margin="dense" label="目的" type="text" value={newPurpose} onChange={ChangePurpose} fullWidth />
                    <TextField margin="dense" label="拜訪時長(分鐘)" type="text" value={newDuration} onChange={ChangeDuration} fullWidth />
                    <InputLabel>後續狀態</InputLabel>
                    <Select label="後續狀態" fullWidth value={newStatus} onChange={ChangeStatus} MenuProps={MenuProps}>
                        {StatusChoice.map((list) =>(
                            <MenuItem key={list.id} value={list.name}>{list.name}</MenuItem>
                        ))}
                    </Select>
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
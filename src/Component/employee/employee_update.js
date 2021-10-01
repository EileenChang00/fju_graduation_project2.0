import { Button, Dialog, DialogContent, DialogTitle, InputLabel, TextField, DialogActions } from '@material-ui/core'
import { useState, useEffect } from 'react'

export default function Employee_update(props) {
    //console.log(props.update_id);
    //console.log(props.employee);
    const employee = props.employee
    //connect airtable
    var Airtable = require('airtable')
    var base = new Airtable({ apiKey: 'keyUAL9XklAOyi08b' }).base('apphBomMb49ieU17N')
    //control Update-Dialog open
    const [open, setOpen] = useState(false)
    const handleOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }
    //multiple choices
    //選單樣式
    const ITEM_HEIGHT = 48
    const ITEM_PADDING_TOP = 8
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    }

    useEffect(() => {
        base('employee').find(props.update_id, function (err, record) {
            if (err) {
                console.error(err)
                return
            }
            console.log('Retrieved', record.id)
            //setEmployee(record);
        })
    }, [])
    //判斷手機格式
    const [phoneError, setphoneError] = useState(false)
    //判斷身份證字號格式
    const [IDError, setIDError] = useState(false)

    //get default value
    const [newEmployeeName, setEmployeeName] = useState(employee.fields.em_name)
    const [newPhone, setPhone] = useState(employee.fields.em_phone)
    const [newBirth, setBirth] = useState(employee.fields.em_birth)
    const [newIDnumber, setIDnumber] = useState(employee.fields.em_IDnumber)
    const [newAddress, setAddress] = useState(employee.fields.em_address)
    const [newEnterDate, setEnterDate] = useState(employee.fields.em_enterdate)
    const [newResignDate, setResignDate] = useState(employee.fields.em_resigndate)

    //get & prepare update data
    const ChangeEmployeeName = (event) => {
        setEmployeeName(event.target.value)
    }
    const ChangePhone = (event) => {
        setPhone(event.target.value)
        if (event.target.value.toString().length === 10) {
            setphoneError(false)
        } else {
            setphoneError(true)
        }
    }
    const ChangeBirth = (event) => {
        setBirth(event.target.value)
    }
    const ChangeIDnumber = (event) => {
        setIDnumber(event.target.value)
        if (event.target.value.length === 10) {
            setIDError(false)
        } else {
            setIDError(true)
        }
    }
    const [newAccount, setAccount] = useState('')
    const ChangeAccount = (event) => {
        setAccount(event.target.value)
    }
    const [newPassword, setPassword] = useState('')
    const ChangePassword = (event) => {
        setPassword(event.target.value)
    }
    const ChangeAddress = (event) => {
        setAddress(event.target.value)
    }
    const ChangeEnterDate = (event) => {
        setEnterDate(event.target.value)
    }
    const ChangeResignDate = (event) => {
        setResignDate(event.target.value)
    }
    //when Create button is clicked
    function handleClick() {
        if (phoneError || IDError) {
            alert('輸入資料有誤，請確認')
        } else {
            base('employee').update(
                [
                    newResignDate
                        ? {
                              id: props.update_id,
                              fields: {
                                  em_name: newEmployeeName,
                                  em_phone: newPhone,
                                  em_birth: newBirth,
                                  em_IDnumber: newIDnumber,
                                  em_account: newAccount,
                                  em_password: newPassword,
                                  em_address: newAddress,
                                  em_enterdate: newEnterDate,
                                  em_resigndate: newResignDate,
                              },
                          }
                        : {
                              id: props.update_id,
                              fields: {
                                  em_name: newEmployeeName,
                                  em_phone: newPhone,
                                  em_birth: newBirth,
                                  em_IDnumber: newIDnumber,
                                  em_account: newAccount,
                                  em_password: newPassword,
                                  em_address: newAddress,
                                  em_enterdate: newEnterDate,
                              },
                          },
                ],
                function (err, records) {
                    if (err) {
                        console.error(err)
                        alert(err)
                        return
                    }
                    records.forEach(function (record) {
                        console.log(record.get('em_id'))
                        alert('完成修改')
                        handleClose()
                        window.location.reload()
                    })
                },
            )
        }
    }
    return (
        <div>
            <Button width="25px" variant="contained" color="default" onClick={handleOpen}>
                修改
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>修改資料</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        label="員工名稱"
                        type="text"
                        value={newEmployeeName}
                        onChange={ChangeEmployeeName}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="帳號"
                        type="text"
                        value={newAccount}
                        onChange={ChangeAccount}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="密碼"
                        type="text"
                        value={newPassword}
                        onChange={ChangePassword}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="手機"
                        type="text"
                        value={newPhone}
                        onChange={ChangePhone}
                        fullWidth
                        error={phoneError}
                        helperText={phoneError && '輸入長度有誤'}
                    />
                    <InputLabel>生日</InputLabel>
                    <TextField margin="dense" type="date" value={newBirth} onChange={ChangeBirth} fullWidth />
                    <TextField
                        margin="dense"
                        label="身分證字號"
                        type="text"
                        value={newIDnumber}
                        onChange={ChangeIDnumber}
                        fullWidth
                        error={IDError}
                        helperText={IDError && '輸入長度有誤'}
                    />
                    <TextField
                        margin="dense"
                        label="地址"
                        type="text"
                        value={newAddress}
                        onChange={ChangeAddress}
                        fullWidth
                    />
                    <InputLabel>到職日期</InputLabel>
                    <TextField margin="dense" type="date" value={newEnterDate} onChange={ChangeEnterDate} fullWidth />
                    <InputLabel>離職日期</InputLabel>
                    <TextField margin="dense" type="date" value={newResignDate} onChange={ChangeResignDate} fullWidth />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>取消</Button>
                    <Button onClick={handleClick}>修改</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

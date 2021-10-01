import {
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    InputLabel,
    Select,
    MenuItem,
    TextField,
    DialogActions,
} from '@material-ui/core'
import { useState } from 'react'

export default function Employee_create() {
    //connect airtable
    var Airtable = require('airtable')
    var base = new Airtable({ apiKey: 'keyUAL9XklAOyi08b' }).base('apphBomMb49ieU17N')
    //import moment
    var moment = require('moment')
    const currentDate = moment().format('YYYY-MM-DD')
    console.log(currentDate)

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
    //判斷手機格式
    const [phoneError, setphoneError] = useState(true)
    //判斷身份證字號格式
    const [IDError, setIDError] = useState(true)

    //get & prepare update data
    const [newEmployeeName, setEmployeeName] = useState('')
    const ChangeEmployeeName = (event) => {
        setEmployeeName(event.target.value)
    }
    const [newPhone, setPhone] = useState('')
    function phoneFormat(phone) {
        setPhone(phone)
        if (phone.toString().length === 10) {
            setphoneError(false)
        } else {
            setphoneError(true)
        }
    }
    const [newBirth, setBirth] = useState('')
    const ChangeBirth = (event) => {
        setBirth(event.target.value)
    }
    const [newIDnumber, setIDnumber] = useState('')
    function IDFormat(IDnum) {
        setIDnumber(IDnum)
        if (IDnum.length === 10) {
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
    const [newAddress, setAddress] = useState('')
    const ChangeAddress = (event) => {
        setAddress(event.target.value)
    }
    const [newEnterDate, setEnterDate] = useState(currentDate)
    const ChangeEnterDate = (event) => {
        setEnterDate(event.target.value)
    }
    const [newResignDate, setResignDate] = useState('')
    const ChangeResignDate = (event) => {
        setResignDate(event.target.value)
    }
    //when Create button is clicked
    function handleClick() {
        if (phoneError || IDError) {
            alert('輸入資料有誤，請確認')
        } else {
            base('employee').create(
                [
                    newResignDate
                        ? {
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
                                  em_position: 'E',
                              },
                          }
                        : {
                              fields: {
                                  em_name: newEmployeeName,
                                  em_phone: newPhone,
                                  em_birth: newBirth,
                                  em_IDnumber: newIDnumber,
                                  em_account: newAccount,
                                  em_password: newPassword,
                                  em_address: newAddress,
                                  em_enterdate: newEnterDate,
                                  em_position: 'E',
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
                        alert('完成新增')
                        handleClose()
                        window.location.reload()
                    })
                },
            )
        }
    }
    return (
        <div>
            <Button width="25px" variant="contained" color="primary" onClick={handleOpen}>
                新增
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>新增資料</DialogTitle>
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
                        type="number"
                        value={newPhone}
                        onChange={(event) => phoneFormat(event.target.value)}
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
                        onChange={(event) => IDFormat(event.target.value)}
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
                    <Button onClick={handleClick}>新增</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

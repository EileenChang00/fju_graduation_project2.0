import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    InputLabel,
    Select,
    MenuItem,
} from '@material-ui/core'
import { useState, useEffect } from 'react'
import Autocomplete from '@material-ui/lab/Autocomplete'

export default function Customer_update(props) {
    console.log(props.update_id)
    const customer = props.customer
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
    //介紹人選單
    //顧客選單
    //顧客名稱選單
    const [SelectCustomer, setSelectCustomer] = useState([])
    useEffect(() => {
        base('customer')
            .select({
                view: 'Grid view2',
            })
            .eachPage(
                function page(records, fetchNextPage) {
                    records.forEach(function (record) {
                        SelectCustomer.push({
                            recordId: record.id,
                            name: record.fields.cus_name,
                            introtimes: record.fields.cus_intro,
                        })
                        setSelectCustomer(SelectCustomer)
                    })
                    fetchNextPage()
                },
                function done(err) {
                    if (err) {
                        console.error(err)
                        return
                    }
                },
            )
    }, [])
    //設計師名稱選單
    const [SelectFirmstaff, setSelectFirmstaff] = useState([])
    useEffect(() => {
        base('firmstaff')
            .select({
                view: 'Grid view2',
            })
            .eachPage(
                function page(records, fetchNextPage) {
                    records.forEach(function (record) {
                        SelectFirmstaff.push({
                            recordId: record.id,
                            name: record.fields.firmstaff_name,
                        })
                        setSelectFirmstaff(SelectFirmstaff)
                    })
                    fetchNextPage()
                },
                function done(err) {
                    if (err) {
                        console.error(err)
                        return
                    }
                },
            )
    }, [])
    //職業選單
    const [promenu, setPromenu] = useState([])
    useEffect(() => {
        base('promenu')
            .select({
                view: 'Grid view',
            })
            .eachPage(
                function page(records, fetchNextPage) {
                    records.forEach(function (record) {
                        promenu.push(record.fields.menu)
                        setPromenu(promenu)
                    })
                    fetchNextPage()
                },
                function done(err) {
                    if (err) {
                        console.error(err)
                        return
                    }
                },
            )
    }, [])
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
    const [phoneError, setphoneError] = useState(false)

    //get & prepare update data
    const [newCustomerName, setCustomerName] = useState(customer.fields.cus_name)
    const ChangeCustomerName = (event) => {
        setCustomerName(event.target.value)
    }
    const [newPhone, setPhone] = useState(customer.fields.cus_phone)
    function phoneFormat(phone) {
        setPhone(phone)
        if (phone.toString().length === 10) {
            setphoneError(false)
        } else {
            setphoneError(true)
        }
    }
    const [newBirth, setBirth] = useState(customer.fields.cus_birth)
    const ChangeBirth = (event) => {
        setBirth(event.target.value)
    }
    const [newProfession, setProfession] = useState(customer.fields.cus_profession)
    const ChangeProfession = (event) => {
        setProfession(event.target.value)
    }
    const [newTitle, setTitle] = useState(customer.fields.cus_title)
    const ChangeTitle = (event) => {
        setTitle(event.target.value)
    }
    const [newEmail, setEmail] = useState(customer.fields.cus_email)
    const ChangeEmail = (event) => {
        setEmail(event.target.value)
    }
    const [newAddress, setAddress] = useState(customer.fields.cus_address)
    const ChangeAddress = (event) => {
        setAddress(event.target.value)
    }
    const [newintro, setIntro] = useState('') //介紹人(顧客).recordID
    const ChangeIntro = (event) => {
        setIntro(event.target.value)
    }
    const [newminorintro, setMinorIntro] = useState('') //介紹人(設計師).recordID
    const ChangeMinorIntro = (event) => {
        setMinorIntro(event.target.value)
    }
    const [newgui, setGui] = useState(customer.fields.cus_GUI)
    const ChangeGui = (event) => {
        setGui(event.target.value)
    }
    const [newinvoice, setInvoice] = useState(customer.fields.cus_invoice)
    const ChangeInvoice = (event) => {
        setInvoice(event.target.value)
    }

    //when Create button is clicked
    function handleClick() {
        var introSuccess = false
        if (phoneError) {
            alert('輸入資料有誤，請確認')
        } else {
            newintro ? find_oldintro(introSuccess) : create((introSuccess = true))
        }
    }
    function create(introSuccess) {
        //console.log("create="+introSuccess);
        if (!newBirth) {
            if (!newminorintro) {
                var customer_record = {
                    id: props.update_id,
                    fields: {
                        cus_name: newCustomerName,
                        cus_phone: newPhone,
                        cus_profession: newProfession,
                        cus_title: newTitle,
                        cus_email: newEmail,
                        cus_address: newAddress,
                        cus_intro: 0,
                        cus_GUI: newgui,
                        cus_invoice: newinvoice,
                    },
                }
            } else {
                customer_record = {
                    id: props.update_id,
                    fields: {
                        cus_name: newCustomerName,
                        cus_phone: newPhone,
                        cus_profession: newProfession,
                        cus_title: newTitle,
                        cus_email: newEmail,
                        cus_address: newAddress,
                        cus_intro: 0,
                        cus_firmstaff_id: [newminorintro],
                        cus_GUI: newgui,
                        cus_invoice: newinvoice,
                    },
                }
            }
        } else {
            if (!newminorintro) {
                customer_record = {
                    id: props.update_id,
                    fields: {
                        cus_name: newCustomerName,
                        cus_phone: newPhone,
                        cus_birth: newBirth,
                        cus_profession: newProfession,
                        cus_title: newTitle,
                        cus_email: newEmail,
                        cus_address: newAddress,
                        cus_intro: 0,
                        cus_GUI: newgui,
                        cus_invoice: newinvoice,
                    },
                }
            } else {
                customer_record = {
                    id: props.update_id,
                    fields: {
                        cus_name: newCustomerName,
                        cus_phone: newPhone,
                        cus_birth: newBirth,
                        cus_profession: newProfession,
                        cus_title: newTitle,
                        cus_email: newEmail,
                        cus_address: newAddress,
                        cus_intro: 0,
                        cus_firmstaff_id: [newminorintro],
                        cus_GUI: newgui,
                        cus_invoice: newinvoice,
                    },
                }
            }
        }
        introSuccess &&
            base('customer').update([customer_record], function (err, records) {
                if (err) {
                    console.error(err)
                    alert('輸入資料有誤，請確認')
                    return
                }
                alert('完成修改')
                handleClose()
                window.location.reload()
            })
    }
    function find_oldintro(introSuccess) {
        customer.fields.customer
            ? base('customer').find(customer.fields.customer, function (err, record) {
                  if (err) {
                      alert('介紹人(顧客)資料新增失敗')
                      return
                  }
                  console.log('Retrieved:old intro times=' + record.fields.cus_intro)
                  var oldintro = record.fields.cus_intro
                  delete_intro(introSuccess, oldintro)
              })
            : update_intro(introSuccess)
    }
    function delete_intro(introSuccess, oldintro) {
        console.log(customer.fields.customer)
        oldintro = oldintro - 1
        console.log('new oldintro = ' + oldintro + typeof oldintro)
        //把原本的介紹人的介紹次數-1
        base('customer').update(
            [
                {
                    id: customer.fields.customer[0],
                    fields: {
                        cus_intro: oldintro,
                    },
                },
            ],
            function (err, records) {
                if (err) {
                    console.log(err)
                    alert('介紹人(顧客)資料新增-1失敗')
                    return
                }
                console.log('-1成功')
                update_intro(introSuccess)
            },
        )
    }
    function update_intro(introSuccess) {
        var intro = newintro.introtimes + 1
        console.log('intro times=' + intro)
        //把新的介紹人的介紹次數+1
        base('customer').update(
            [
                {
                    id: newintro.recordId,
                    fields: {
                        cus_intro: intro,
                    },
                },
            ],
            function (err, records) {
                if (err) {
                    console.log(err)
                    alert('介紹人資料有誤，請確認後重試')
                    return
                }
                console.log('+1成功')
                introSuccess = true
                create(introSuccess)
            },
        )
        //把顧客的介紹人改成新的介紹人
        base('customer').update(
            [
                {
                    id: props.update_id,
                    fields: {
                        customer: [newintro.recordId],
                    },
                },
            ],
            function (err, records) {
                if (err) {
                    console.error(err)
                    alert('介紹人(顧客)資料新增失敗')
                    return
                }
                setIntro('')
            },
        )
    }
    return (
        <div>
            <Button variant="contained" color="default" onClick={handleOpen}>
                修改
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>修改資料</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        label="顧客名稱"
                        type="text"
                        value={newCustomerName}
                        onChange={ChangeCustomerName}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="手機"
                        type="text"
                        value={newPhone}
                        onChange={(event) => phoneFormat(event.target.value)}
                        fullWidth
                        error={phoneError}
                        helperText={phoneError && '輸入長度有誤'}
                    />
                    <InputLabel>生日</InputLabel>
                    <TextField margin="dense" type="date" value={newBirth} onChange={ChangeBirth} fullWidth />
                    <InputLabel>職業</InputLabel>
                    <Select
                        label="職業"
                        fullWidth
                        value={newProfession}
                        onChange={ChangeProfession}
                        MenuProps={MenuProps}
                    >
                        {promenu.map((promenu) => (
                            <MenuItem key={promenu} value={promenu}>
                                {promenu}
                            </MenuItem>
                        ))}
                    </Select>
                    <TextField
                        margin="dense"
                        label="職稱"
                        type="text"
                        value={newTitle}
                        onChange={ChangeTitle}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="信箱"
                        type="text"
                        value={newEmail}
                        onChange={ChangeEmail}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="地址"
                        type="text"
                        value={newAddress}
                        onChange={ChangeAddress}
                        fullWidth
                    />
                    <Autocomplete
                        freeSolo
                        onChange={(event, newValue) => {
                            if (!newValue) {
                                console.log('!newValue')
                            }
                            setIntro({ recordId: newValue.recordId, introtimes: newValue.introtimes })
                        }}
                        options={SelectCustomer}
                        getOptionLabel={(option) => option.name}
                        renderInput={(params) => <TextField {...params} label="介紹人(顧客)" margin="normal" />}
                    />
                    <Autocomplete
                        freeSolo
                        onChange={(event, newValue) => {
                            if (!newValue) {
                                console.log('!newValue')
                            }
                            setMinorIntro(newValue.recordId)
                        }}
                        options={SelectFirmstaff}
                        getOptionLabel={(option) => option.name}
                        renderInput={(params) => <TextField {...params} label="介紹人(設計師)" margin="normal" />}
                    />
                    <TextField
                        margin="dense"
                        label="統一編號"
                        type="text"
                        value={newgui}
                        onChange={ChangeGui}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="統編抬頭"
                        type="text"
                        value={newinvoice}
                        onChange={ChangeInvoice}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>取消</Button>
                    <Button onClick={handleClick}>修改</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

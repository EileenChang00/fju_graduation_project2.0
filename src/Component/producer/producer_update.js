import Airtable from 'airtable'
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, InputLabel } from '@material-ui/core'
import { useState } from 'react'

export default function Producer_update(props) {
    console.log(props.update_id)
    const producer = props.producer
    //connect airtable
    var Airtable = require('airtable')
    var base = new Airtable({ apiKey: 'keyUAL9XklAOyi08b' }).base('apphBomMb49ieU17N')
    //control Update-Dialog
    const [open, setOpen] = useState(false)
    const handleOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }

    const [newProducerName, setProducerName] = useState(producer.fields.producer_name)
    const ChangeProducerName = (event) => {
        setProducerName(event.target.value)
    }
    const [newContactperson, setContactperson] = useState(producer.fields.producer_contactperson)
    const ChangeContactperson = (event) => {
        setContactperson(event.target.value)
    }
    const [newAddress, setAddress] = useState(producer.fields.producer_address)
    const ChangeAddress = (event) => {
        setAddress(event.target.value)
    }
    const [newKind, setKind] = useState(producer.fields.producer_kind)
    const ChangeKind = (event) => {
        setKind(event.target.value)
    }
    const [newgui, setGui] = useState(producer.fields.producer_GUI)
    const ChangeGui = (event) => {
        setGui(event.target.value)
    }
    const [newInfo, setInfo] = useState(producer.fields.producer_info)
    const ChangeInfo = (event) => {
        setInfo(event.target.value)
    }
    const [newPhone, setPhone] = useState(producer.fields.producer_phone)
    const ChangePhone = (event) => {
        setPhone(event.target.value)
    }
    const [newEmail, setEmail] = useState(producer.fields.producer_email)
    const ChangeEmail = (event) => {
        setEmail(event.target.value)
    }
    const [newRemark, setRemark] = useState(producer.fields.producer_remark)
    const ChangeRemark = (event) => {
        setRemark(event.target.value)
    }

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
    //When UpdateButton is clicked
    function handleClick() {
        base('producer').update(
            [
                {
                    id: props.update_id,
                    fields: {
                        producer_name: newProducerName,
                        producer_contactperson: newContactperson,
                        producer_address: newAddress,
                        producer_kind: newKind,
                        producer_GUI: newgui,
                        producer_info: newInfo,
                        producer_phone: newPhone,
                        producer_email: newEmail,
                        producer_remark: newRemark,
                    },
                },
            ],
            function (err, records) {
                if (err) {
                    console.error(err)
                    alert(err)
                    return
                }
                alert('完成修改')
                handleClose()
                window.location.reload()
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
                        label="後勤廠商名稱"
                        type="text"
                        value={newProducerName}
                        onChange={ChangeProducerName}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="聯絡人"
                        type="text"
                        value={newContactperson}
                        onChange={ChangeContactperson}
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
                    <TextField
                        margin="dense"
                        label="類別"
                        type="text"
                        value={newKind}
                        onChange={ChangeKind}
                        fullWidth
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
                        label="匯款資訊"
                        type="text"
                        value={newInfo}
                        onChange={ChangeInfo}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="電話"
                        type="text"
                        value={newPhone}
                        onChange={ChangePhone}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="電子信箱"
                        type="text"
                        value={newEmail}
                        onChange={ChangeEmail}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="備註"
                        type="text"
                        value={newRemark}
                        onChange={ChangeRemark}
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

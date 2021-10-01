import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@material-ui/core'
import { useEffect, useState } from 'react'
import Autocomplete from '@material-ui/lab/Autocomplete'

export default function Firmstaff_update(props) {
    const firmstaff = props.firmstaff
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
    //multiple choice
    //廠商公司選單
    const [SelectFirm, setSelectFirm] = useState([])
    useEffect(() => {
        base('firm')
            .select({
                view: 'Grid view2',
            })
            .eachPage(
                function page(records, fetchNextPage) {
                    records.forEach(function (record) {
                        SelectFirm.push({
                            recordId: record.id,
                            name: record.fields.firm_name,
                        })
                        setSelectFirm(SelectFirm)
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
    const [value_firm, setValue_firm] = useState(firmstaff.fields.firmstaff_firm_name.toString())
    //get & prepare update data
    const [newName, setName] = useState(firmstaff.fields.firmstaff_name)
    const ChangeName = (event) => {
        setName(event.target.value)
    }
    const [newFirmId, setFirmId] = useState(firmstaff.fields.firmstaff_firm_id)
    console.log(newFirmId)
    const [newPhone, setPhone] = useState(firmstaff.fields.firmstaff_phone)
    const ChangePhone = (event) => {
        setPhone(event.target.value)
    }
    const [newFax, setFax] = useState(firmstaff.fields.firmstaff_fax)
    const ChangeFax = (event) => {
        setFax(event.target.value)
    }
    const [newProfession, setProfession] = useState(firmstaff.fields.firmstaff_profession)
    const ChangeProfession = (event) => {
        setProfession(event.target.value)
    }
    const [newMail, setMail] = useState(firmstaff.fields.firmstaff_mail)
    const ChangeMail = (event) => {
        setMail(event.target.value)
    }
    const [newEvaluation, setEvaluation] = useState(firmstaff.fields.firmstaff_evaluation)
    const ChangeEvaluation = (event) => {
        setEvaluation(event.target.value)
    }
    const [newRemark, setRemark] = useState(firmstaff.fields.firmstaff_remark)
    const ChangeRemark = (event) => {
        setRemark(event.target.value)
    }
    //When UpdateButton is clicked
    function handleClick() {
        base('firmstaff').update(
            [
                newFirmId
                    ? {
                          id: props.update_id,
                          fields: {
                              firmstaff_name: newName,
                              firmstaff_firm_id: [newFirmId],
                              firmstaff_phone: newPhone,
                              firmstaff_fax: newFax,
                              firmstaff_profession: newProfession,
                              firmstaff_mail: newMail,
                              firmstaff_evaluation: newEvaluation,
                              firmstaff_remark: newRemark,
                          },
                      }
                    : {
                          id: props.update_id,
                          fields: {
                              firmstaff_name: newName,
                              firmstaff_phone: newPhone,
                              firmstaff_fax: newFax,
                              firmstaff_profession: newProfession,
                              firmstaff_mail: newMail,
                              firmstaff_evaluation: newEvaluation,
                              firmstaff_remark: newRemark,
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
                    console.log(record.get('firmstaff_id'))
                    alert('完成修改')
                    handleClose()
                    window.location.reload()
                })
            },
        )
    }
    return (
        <div>
            <Button width="25px" variant="contained" color="default" onClick={handleOpen}>
                修改
            </Button>
            <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth="xs">
                <DialogTitle>修改資料</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        label="廠商人員名稱"
                        type="text"
                        value={newName}
                        onChange={ChangeName}
                        fullWidth
                    />
                    <Autocomplete
                        freeSolo
                        options={SelectFirm}
                        value={value_firm}
                        onChange={(event, newValue) => {
                            if (!newValue) {
                                console.log('!newValue')
                            }
                            console.log(newValue)
                            setFirmId(newValue.recordId)
                            setValue_firm(newValue.name)
                        }}
                        getOptionLabel={(option) => {
                            if (typeof option === 'string') {
                                console.log('string')
                                return option
                            }
                            console.log('else')
                            return option.name
                        }}
                        renderInput={(params) => <TextField {...params} label="廠商公司" margin="normal" />}
                    />
                    <TextField
                        margin="dense"
                        label="手機"
                        type="text"
                        value={newPhone}
                        onChange={ChangePhone}
                        fullWidth
                    />
                    <TextField margin="dense" label="傳真" type="text" value={newFax} onChange={ChangeFax} fullWidth />
                    <TextField
                        margin="dense"
                        label="職稱"
                        type="text"
                        value={newProfession}
                        onChange={ChangeProfession}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="電子信箱"
                        type="text"
                        value={newMail}
                        onChange={ChangeMail}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="評價"
                        type="text"
                        value={newEvaluation}
                        onChange={ChangeEvaluation}
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

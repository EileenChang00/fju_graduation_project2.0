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
import { useState, useEffect } from 'react'

export default function Product_create() {
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
    //製造商選單
    const [SelectProducer, setSelectProducer] = useState([])
    useEffect(() => {
        base('producer')
            .select({
                view: 'Grid view',
            })
            .eachPage(
                function page(records, fetchNextPage) {
                    records.forEach(function (record) {
                        SelectProducer.push([record.id, record.fields.producer_name])
                        setSelectProducer(SelectProducer)
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
    //產品類別選單
    const [productmenu, setProductmenu] = useState([])
    useEffect(() => {
        base('productmenu')
            .select({
                view: 'Grid view',
            })
            .eachPage(
                function page(records, fetchNextPage) {
                    records.forEach(function (record) {
                        productmenu.push(record.fields.menu)
                        setProductmenu(productmenu)
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
    //產品系列選單
    const [seriesmenu, setSeriesmenu] = useState([])
    useEffect(() => {
        base('seriesmenu')
            .select({
                view: 'Grid view',
            })
            .eachPage(
                function page(records, fetchNextPage) {
                    records.forEach(function (record) {
                        seriesmenu.push(record.fields.menu)
                        setSeriesmenu(seriesmenu)
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
    //產品尺寸選單
    const [sizemenu, setSizemenu] = useState([])
    useEffect(() => {
        base('sizemenu')
            .select({
                view: 'Grid view',
            })
            .eachPage(
                function page(records, fetchNextPage) {
                    records.forEach(function (record) {
                        sizemenu.push(record.fields.menu)
                        setSizemenu(sizemenu)
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

    //get & prepare update data
    const [newProductName, setProductName] = useState('')
    const ChangeProductName = (event) => {
        setProductName(event.target.value)
    }
    const [newCategory, setCategory] = useState('')
    const ChangeCategory = (event) => {
        setCategory(event.target.value)
    }
    const [newSeries, setSeries] = useState('')
    const ChangeSeries = (event) => {
        setSeries(event.target.value)
    }
    const [newFixedSize, setFixedSize] = useState('')
    const ChangeFixedSize = (event) => {
        setFixedSize(event.target.value)
    }
    const [newSize, setSize] = useState('')
    const ChangeSize = (event) => {
        setSize(event.target.value)
    }
    const [newPrice, setPrice] = useState('')
    const ChangePrice = (event) => {
        setPrice(parseInt(event.target.value, 10))
    }
    const [newProducerId, setProducerId] = useState('')
    const ChangeProducerId = (event) => {
        setProducerId(event.target.value)
    }
    const [newNote, setNote] = useState('')
    const ChangeNote = (event) => {
        setNote(event.target.value)
    }
    //when Create button is clicked
    function handleClick() {
        base('product').create(
            [
                {
                    fields: {
                        product_name: newProductName,
                        product_category: newCategory,
                        product_series: newSeries,
                        product_fixedsize: newFixedSize,
                        product_size: newSize,
                        product_price: newPrice,
                        product_producer_id: [newProducerId],
                        product_note: newNote,
                    },
                },
            ],
            function (err, records) {
                if (err) {
                    alert(err)
                    return
                }
                records.forEach(function (record) {
                    console.log(record.getId())
                    handleClose()
                    alert('完成新增')
                    window.location.reload()
                })
            },
        )
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
                        label="產品名稱"
                        type="text"
                        value={newProductName}
                        onChange={ChangeProductName}
                        fullWidth
                    />
                    <InputLabel>類別</InputLabel>
                    <Select label="類別" fullWidth value={newCategory} onChange={ChangeCategory} MenuProps={MenuProps}>
                        {productmenu.map((productmenu) => (
                            <MenuItem key={productmenu} value={productmenu}>
                                {productmenu}
                            </MenuItem>
                        ))}
                    </Select>
                    <InputLabel>系列</InputLabel>
                    <Select label="系列" fullWidth value={newSeries} onChange={ChangeSeries} MenuProps={MenuProps}>
                        {seriesmenu.map((seriesmenu) => (
                            <MenuItem key={seriesmenu} value={seriesmenu}>
                                {seriesmenu}
                            </MenuItem>
                        ))}
                    </Select>
                    <InputLabel>尺寸</InputLabel>
                    <Select
                        label="尺寸"
                        fullWidth
                        value={newFixedSize}
                        onChange={ChangeFixedSize}
                        MenuProps={MenuProps}
                    >
                        {sizemenu.map((sizemenu) => (
                            <MenuItem key={sizemenu} value={sizemenu}>
                                {sizemenu}
                            </MenuItem>
                        ))}
                    </Select>
                    <TextField
                        margin="dense"
                        label="特殊尺寸"
                        type="text"
                        value={newSize}
                        onChange={ChangeSize}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="價格"
                        type="text"
                        value={newPrice}
                        onChange={ChangePrice}
                        fullWidth
                    />
                    <InputLabel>製造商名稱</InputLabel>
                    <Select
                        label="製造商名稱"
                        fullWidth
                        value={newProducerId}
                        onChange={ChangeProducerId}
                        MenuProps={MenuProps}
                    >
                        {SelectProducer.map((producer) => (
                            <MenuItem key={producer[0]} value={producer[0]}>
                                {producer[1]}
                            </MenuItem>
                        ))}
                    </Select>
                    <TextField
                        margin="dense"
                        label="備註"
                        type="text"
                        value={newNote}
                        onChange={ChangeNote}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>取消</Button>
                    <Button onClick={handleClick}>新增</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

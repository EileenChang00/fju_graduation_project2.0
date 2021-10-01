import './App.css'
import {
    //BrowserRouter as Router,
    //Switch,
    //Route,
    Link,
} from 'react-router-dom'
import Airtable from 'airtable'
import { useEffect, useState } from 'react'

const base = new Airtable({ apiKey: 'keyC0nR1e39lOmrhm' }).base('apphBomMb49ieU17N')

function Changemenu2() {
    const [productmenu, setProductmenu] = useState([])
    const [seriesmenu, setSeriesmenu] = useState([])
    const [sizemenu, setSizemenu] = useState([])

    useEffect(() => {
        base('productmenu')
            .select({ view: 'Grid view' })
            .eachPage((records, fetchNextPage) => {
                //console.log(records);
                fetchNextPage()
                setProductmenu(records)
            })
    }, [])

    useEffect(() => {
        base('seriesmenu')
            .select({ view: 'Grid view' })
            .eachPage((records, fetchNextPage) => {
                //console.log(records);
                fetchNextPage()
                setSeriesmenu(records)
            })
    }, [])

    useEffect(() => {
        base('sizemenu')
            .select({ view: 'Grid view' })
            .eachPage((records, fetchNextPage) => {
                //console.log(records);
                fetchNextPage()
                setSizemenu(records)
            })
    }, [])

    const [newproduct, setproduct] = useState('')
    const onChangeproduct = (event) => {
        setproduct(event.target.value)
    }

    const [newseries, setseries] = useState('')
    const onChangeseries = (event) => {
        setseries(event.target.value)
    }

    const [newsize, setsize] = useState('')
    const onChangesize = (event) => {
        setsize(event.target.value)
    }

    const productarray = []
    productmenu.map((productmenu) => productarray.push(productmenu.fields.menu))
    console.log(productarray)
    const productid = []
    productmenu.map((productmenu) => productid.push(productmenu.id))
    console.log(productid)

    const seriesarray = []
    seriesmenu.map((seriesmenu) => seriesarray.push(seriesmenu.fields.menu))
    console.log(seriesarray)
    const seriesid = []
    seriesmenu.map((seriesmenu) => seriesid.push(seriesmenu.id))
    console.log(seriesid)

    const sizearray = []
    sizemenu.map((sizemenu) => sizearray.push(sizemenu.fields.menu))
    console.log(sizearray)
    const sizeid = []
    sizemenu.map((sizemenu) => sizeid.push(sizemenu.id))
    console.log(sizeid)

    const productsplit1 = []
    for (let i = 0; i < productmenu.length; i += 3) {
        productsplit1.push([productid[i], productarray[i]])
    }
    //console.log(productsplit1);
    const productsplit2 = []
    for (let i = 1; i < productmenu.length; i += 3) {
        productsplit2.push([productid[i], productarray[i]])
    }
    //console.log(productsplit2);
    const productsplit3 = []
    for (let i = 2; i < productmenu.length; i += 3) {
        productsplit3.push([productid[i], productarray[i]])
    }
    //console.log(productsplit3);

    const seriessplit1 = []
    for (let i = 0; i < seriesmenu.length; i += 3) {
        seriessplit1.push([seriesid[i], seriesarray[i]])
    }
    const seriessplit2 = []
    for (let i = 1; i < seriesmenu.length; i += 3) {
        seriessplit2.push([seriesid[i], seriesarray[i]])
    }
    const seriessplit3 = []
    for (let i = 2; i < seriesmenu.length; i += 3) {
        seriessplit3.push([seriesid[i], seriesarray[i]])
    }

    const sizesplit1 = []
    for (let i = 0; i < sizemenu.length; i += 3) {
        sizesplit1.push([sizeid[i], sizearray[i]])
    }
    const sizesplit2 = []
    for (let i = 1; i < sizemenu.length; i += 3) {
        sizesplit2.push([sizeid[i], sizearray[i]])
    }
    const sizesplit3 = []
    for (let i = 2; i < sizemenu.length; i += 3) {
        sizesplit3.push([sizeid[i], sizearray[i]])
    }

    return (
        <div class="container-fluid">
            <h1 class="mt-4" style={{ color: 'black' }}>
                選單修改
            </h1>
            <div class="bar">
                <h5>
                    <Link to="/home/changemenu">
                        職業選單/
                        <br />
                        得知管道選單/
                        <br />
                        售後服務選單
                    </Link>
                </h5>
                <h5>
                    <Link to="/home/changemenu2">
                        產品類別選單/
                        <br />
                        產品系列選單/
                        <br />
                        產品尺寸選單
                    </Link>
                </h5>
                <h5>
                    <Link to="/home/changemenu3">
                        廠商類別選單/
                        <br />
                        拜訪方式選單/
                        <br />
                        拜訪目的選單
                    </Link>
                </h5>
            </div>
            <div class="block1">
                <p>產品類別選單</p>
                <div align="center">
                    新增類別:&nbsp;<input name="newproduct" onChange={onChangeproduct}></input>&nbsp;&nbsp;
                    <button
                        type="button"
                        class="badge rounded-pill bg-success"
                        style={{ width: '80px', height: '40px' }}
                        onClick={createproduct}
                    >
                        新增
                    </button>
                    <button
                        type="button"
                        class="badge rounded-pill bg-danger"
                        style={{ width: '80px', height: '40px' }}
                        id="delete"
                        onClick={deleteproduct}
                    >
                        刪除
                    </button>
                </div>
                <div class="list1">
                    {productsplit1.map((productsplit1) => (
                        <li>
                            <input type="radio" name="product" id={productsplit1[0]} />
                            &nbsp;&nbsp;{productsplit1[1]}
                        </li>
                    ))}
                </div>
                <div class="list2">
                    {productsplit2.map((productsplit2) => (
                        <li>
                            <input type="radio" name="product" id={productsplit2[0]} />
                            &nbsp;&nbsp;{productsplit2[1]}
                        </li>
                    ))}
                </div>
                <div class="list3">
                    {productsplit3.map((productsplit3) => (
                        <li>
                            <input type="radio" name="product" id={productsplit3[0]} />
                            &nbsp;&nbsp;{productsplit3[1]}
                        </li>
                    ))}
                </div>
            </div>
            <div class="block2">
                <p>產品系列選單</p>
                <div align="center">
                    新增系列:&nbsp;<input name="newseries" onChange={onChangeseries}></input>&nbsp;&nbsp;
                    <button
                        type="button"
                        class="badge rounded-pill bg-success"
                        style={{ width: '80px', height: '40px' }}
                        onClick={createseries}
                    >
                        新增
                    </button>
                    <button
                        type="button"
                        class="badge rounded-pill bg-danger"
                        style={{ width: '80px', height: '40px' }}
                        id="delete"
                        onClick={deleteseries}
                    >
                        刪除
                    </button>
                </div>
                <div class="list1">
                    {seriessplit1.map((seriessplit1) => (
                        <li>
                            <input type="radio" name="series" id={seriessplit1[0]} />
                            &nbsp;&nbsp;{seriessplit1[1]}
                        </li>
                    ))}
                </div>
                <div class="list2">
                    {seriessplit2.map((seriessplit2) => (
                        <li>
                            <input type="radio" name="series" id={seriessplit2[0]} />
                            &nbsp;&nbsp;{seriessplit2[1]}
                        </li>
                    ))}
                </div>
                <div class="list3">
                    {seriessplit3.map((seriessplit3) => (
                        <li>
                            <input type="radio" name="series" id={seriessplit3[0]} />
                            &nbsp;&nbsp;{seriessplit3[1]}
                        </li>
                    ))}
                </div>
            </div>
            <div class="block3">
                <p>產品尺寸選單</p>
                <div align="center">
                    新增尺寸:&nbsp;<input name="newsize" onChange={onChangesize}></input>&nbsp;&nbsp;
                    <button
                        type="button"
                        class="badge rounded-pill bg-success"
                        style={{ width: '80px', height: '40px' }}
                        onClick={createsize}
                    >
                        新增
                    </button>
                    <button
                        type="button"
                        class="badge rounded-pill bg-danger"
                        style={{ width: '80px', height: '40px' }}
                        id="delete"
                        onClick={deletesize}
                    >
                        刪除
                    </button>
                </div>
                <div class="list1">
                    {sizesplit1.map((sizesplit1) => (
                        <li>
                            <input type="radio" name="size" id={sizesplit1[0]} />
                            &nbsp;&nbsp;{sizesplit1[1]}
                        </li>
                    ))}
                </div>
                <div class="list2">
                    {sizesplit2.map((sizesplit2) => (
                        <li>
                            <input type="radio" name="size" id={sizesplit2[0]} />
                            &nbsp;&nbsp;{sizesplit2[1]}
                        </li>
                    ))}
                </div>
                <div class="list3">
                    {sizesplit3.map((sizesplit3) => (
                        <li>
                            <input type="radio" name="size" id={sizesplit3[0]} />
                            &nbsp;&nbsp;{sizesplit3[1]}
                        </li>
                    ))}
                </div>
            </div>
        </div>
    )

    function createproduct() {
        const value = document.querySelector('[name=newproduct]')
        if (value.value) {
            base('productmenu').create(
                {
                    menu: newproduct,
                },
                function (err, record) {
                    if (err) {
                        console.error(err)
                        return
                    }
                    console.log(record.fields)
                    window.location.reload()
                },
            )
        } else {
            alert('請輸入新類別')
        }
    }

    function createseries() {
        const value = document.querySelector('[name=newseries]')
        if (value.value) {
            base('seriesmenu').create(
                {
                    menu: newseries,
                },
                function (err, record) {
                    if (err) {
                        console.error(err)
                        return
                    }
                    console.log(record.fields)
                    window.location.reload()
                },
            )
        } else {
            alert('請輸入新系列')
        }
    }

    function createsize() {
        const value = document.querySelector('[name=newsize]')
        if (value.value) {
            base('sizemenu').create(
                {
                    menu: newsize,
                },
                function (err, record) {
                    if (err) {
                        console.error(err)
                        return
                    }
                    console.log(record.fields)
                    window.location.reload()
                },
            )
        } else {
            alert('請輸入新尺寸')
        }
    }

    function deleteproduct() {
        const checked = document.querySelector('[name=product]:checked')
        //console.log(checked.id);
        //console.log(checked);
        if (checked) {
            console.log('有選取')

            base('productmenu').destroy(checked.id, function (err, deletedRecord) {
                if (err) {
                    console.error(err)
                    return
                }
                console.log('Deleted record', deletedRecord.id)
                window.location.reload()
            })
        } else {
            alert('未選取類別')
            console.log('未選取')
        }
    }

    function deleteseries() {
        const checked = document.querySelector('[name=series]:checked')
        //console.log(checked.id);
        //console.log(checked);
        if (checked) {
            console.log('有選取')

            base('seriesmenu').destroy(checked.id, function (err, deletedRecord) {
                if (err) {
                    console.error(err)
                    return
                }
                console.log('Deleted record', deletedRecord.id)
                window.location.reload()
            })
        } else {
            alert('未選取系列')
            console.log('未選取')
        }
    }

    function deletesize() {
        const checked = document.querySelector('[name=size]:checked')
        //console.log(checked.id);
        //console.log(checked);
        if (checked) {
            console.log('有選取')

            base('sizemenu').destroy(checked.id, function (err, deletedRecord) {
                if (err) {
                    console.error(err)
                    return
                }
                console.log('Deleted record', deletedRecord.id)
                window.location.reload()
            })
        } else {
            alert('未選取尺寸')
            console.log('未選取')
        }
    }
}

export default Changemenu2

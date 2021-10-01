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

function Changemenu() {
    const [promenu, setPromenu] = useState([])
    const [infomenu, setInfomenu] = useState([])
    const [sermenu, setServicemenu] = useState([])

    useEffect(() => {
        base('promenu')
            .select({ view: 'Grid view' })
            .eachPage((records, fetchNextPage) => {
                //console.log(records);
                fetchNextPage()
                setPromenu(records)
            })
    }, [])

    useEffect(() => {
        base('infomenu')
            .select({ view: 'Grid view' })
            .eachPage((records, fetchNextPage) => {
                //console.log(records);
                fetchNextPage()
                setInfomenu(records)
            })
    }, [])

    useEffect(() => {
        base('servicemenu')
            .select({ view: 'Grid view' })
            .eachPage((records, fetchNextPage) => {
                //console.log(records);
                fetchNextPage()
                setServicemenu(records)
            })
    }, [])

    const [newpro, setpro] = useState('')
    const onChangepro = (event) => {
        setpro(event.target.value)
    }

    const [newinfo, setinfo] = useState('')
    const onChangeinfo = (event) => {
        setinfo(event.target.value)
    }

    const [newser, setser] = useState('')
    const onChangeser = (event) => {
        setser(event.target.value)
    }

    const proarray = []
    promenu.map((promenu) => proarray.push(promenu.fields.menu))
    console.log(proarray)
    const proid = []
    promenu.map((promenu) => proid.push(promenu.id))
    console.log(proid)

    const infoarray = []
    infomenu.map((infomenu) => infoarray.push(infomenu.fields.menu))
    console.log(infoarray)
    const infoid = []
    infomenu.map((infomenu) => infoid.push(infomenu.id))
    console.log(infoid)

    const serarray = []
    sermenu.map((sermenu) => serarray.push(sermenu.fields.menu))
    console.log(serarray)
    const serid = []
    sermenu.map((sermenu) => serid.push(sermenu.id))
    console.log(serid)

    const prosplit1 = []
    for (let i = 0; i < promenu.length; i += 3) {
        prosplit1.push([proid[i], proarray[i]])
    }
    //console.log(prosplit1);
    const prosplit2 = []
    for (let i = 1; i < promenu.length; i += 3) {
        prosplit2.push([proid[i], proarray[i]])
    }
    //console.log(prosplit2);
    const prosplit3 = []
    for (let i = 2; i < promenu.length; i += 3) {
        prosplit3.push([proid[i], proarray[i]])
    }
    //console.log(prosplit3);

    const infosplit1 = []
    for (let i = 0; i < infomenu.length; i += 3) {
        infosplit1.push([infoid[i], infoarray[i]])
    }
    const infosplit2 = []
    for (let i = 1; i < infomenu.length; i += 3) {
        infosplit2.push([infoid[i], infoarray[i]])
    }
    const infosplit3 = []
    for (let i = 2; i < infomenu.length; i += 3) {
        infosplit3.push([infoid[i], infoarray[i]])
    }

    const sersplit1 = []
    for (let i = 0; i < sermenu.length; i += 3) {
        sersplit1.push([serid[i], serarray[i]])
    }
    const sersplit2 = []
    for (let i = 1; i < sermenu.length; i += 3) {
        sersplit2.push([serid[i], serarray[i]])
    }
    const sersplit3 = []
    for (let i = 2; i < sermenu.length; i += 3) {
        sersplit3.push([serid[i], serarray[i]])
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
                <p>職業選單</p>
                <div align="center">
                    新增職業:&nbsp;<input name="newpro" onChange={onChangepro}></input>&nbsp;&nbsp;
                    <button
                        type="button"
                        class="badge rounded-pill bg-success"
                        style={{ width: '80px', height: '40px', color: 'white' }}
                        onClick={createpro}
                    >
                        新增
                    </button>
                    <button
                        type="button"
                        class="badge rounded-pill bg-danger"
                        style={{ width: '80px', height: '40px' }}
                        id="delete"
                        onClick={deletepro}
                    >
                        刪除
                    </button>
                </div>
                <div class="list1">
                    {prosplit1.map((prosplit1) => (
                        <li>
                            <input type="radio" name="pro" id={prosplit1[0]} />
                            &nbsp;&nbsp;{prosplit1[1]}
                        </li>
                    ))}
                </div>
                <div class="list2">
                    {prosplit2.map((prosplit2) => (
                        <li>
                            <input type="radio" name="pro" id={prosplit2[0]} />
                            &nbsp;&nbsp;{prosplit2[1]}
                        </li>
                    ))}
                </div>
                <div class="list3">
                    {prosplit3.map((prosplit3) => (
                        <li>
                            <input type="radio" name="pro" id={prosplit3[0]} />
                            &nbsp;&nbsp;{prosplit3[1]}
                        </li>
                    ))}
                </div>
            </div>
            <div class="block2">
                <p>得知管道選單</p>
                <div align="center">
                    新增管道:&nbsp;<input name="newinfo" onChange={onChangeinfo}></input>&nbsp;&nbsp;
                    <button
                        type="button"
                        class="badge rounded-pill bg-success"
                        style={{ width: '80px', height: '40px' }}
                        onClick={createinfo}
                    >
                        新增
                    </button>
                    <button
                        type="button"
                        class="badge rounded-pill bg-danger"
                        style={{ width: '80px', height: '40px' }}
                        id="delete"
                        onClick={deleteinfo}
                    >
                        刪除
                    </button>
                </div>
                <div class="list1">
                    {infosplit1.map((infosplit1) => (
                        <li>
                            <input type="radio" name="info" id={infosplit1[0]} />
                            &nbsp;&nbsp;{infosplit1[1]}
                        </li>
                    ))}
                </div>
                <div class="list2">
                    {infosplit2.map((infosplit2) => (
                        <li>
                            <input type="radio" name="info" id={infosplit2[0]} />
                            &nbsp;&nbsp;{infosplit2[1]}
                        </li>
                    ))}
                </div>
                <div class="list3">
                    {infosplit3.map((infosplit3) => (
                        <li>
                            <input type="radio" name="info" id={infosplit3[0]} />
                            &nbsp;&nbsp;{infosplit3[1]}
                        </li>
                    ))}
                </div>
            </div>
            <div class="block3">
                <p>售後服務選單</p>
                <div align="center">
                    新增服務:&nbsp;<input name="newser" onChange={onChangeser}></input>&nbsp;&nbsp;
                    <button
                        type="button"
                        class="badge rounded-pill bg-success"
                        style={{ width: '80px', height: '40px' }}
                        onClick={createser}
                    >
                        新增
                    </button>
                    <button
                        type="button"
                        class="badge rounded-pill bg-danger"
                        style={{ width: '80px', height: '40px' }}
                        id="delete"
                        onClick={deleteser}
                    >
                        刪除
                    </button>
                </div>
                <div class="list1">
                    {sersplit1.map((sersplit1) => (
                        <li>
                            <input type="radio" name="ser" id={sersplit1[0]} />
                            &nbsp;&nbsp;{sersplit1[1]}
                        </li>
                    ))}
                </div>
                <div class="list2">
                    {sersplit2.map((sersplit2) => (
                        <li>
                            <input type="radio" name="ser" id={sersplit2[0]} />
                            &nbsp;&nbsp;{sersplit2[1]}
                        </li>
                    ))}
                </div>
                <div class="list3">
                    {sersplit3.map((sersplit3) => (
                        <li>
                            <input type="radio" name="ser" id={sersplit3[0]} />
                            &nbsp;&nbsp;{sersplit3[1]}
                        </li>
                    ))}
                </div>
            </div>
        </div>
    )

    function createpro() {
        const value = document.querySelector('[name=newpro]')
        if (value.value) {
            base('promenu').create(
                {
                    menu: newpro,
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
            alert('請輸入新職業')
        }
    }

    function createinfo() {
        const value = document.querySelector('[name=newinfo]')
        if (value.value) {
            base('infomenu').create(
                {
                    menu: newinfo,
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
            alert('請輸入新管道')
        }
    }

    function createser() {
        const value = document.querySelector('[name=newser]')
        if (value.value) {
            base('servicemenu').create(
                {
                    menu: newser,
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
            alert('請輸入新服務')
        }
    }

    function deletepro() {
        const checked = document.querySelector('[name=pro]:checked')
        //console.log(checked.id);
        //console.log(checked);
        if (checked) {
            console.log('有選取')

            base('promenu').destroy(checked.id, function (err, deletedRecord) {
                if (err) {
                    console.error(err)
                    return
                }
                console.log('Deleted record', deletedRecord.id)
                window.location.reload()
            })
        } else {
            alert('未選取職業')
            console.log('未選取')
        }
    }

    function deleteinfo() {
        const checked = document.querySelector('[name=info]:checked')
        //console.log(checked.id);
        //console.log(checked);
        if (checked) {
            console.log('有選取')

            base('infomenu').destroy(checked.id, function (err, deletedRecord) {
                if (err) {
                    console.error(err)
                    return
                }
                console.log('Deleted record', deletedRecord.id)
                window.location.reload()
            })
        } else {
            alert('未選取管道')
            console.log('未選取')
        }
    }

    function deleteser() {
        const checked = document.querySelector('[name=ser]:checked')
        //console.log(checked.id);
        //console.log(checked);
        if (checked) {
            console.log('有選取')

            base('servicemenu').destroy(checked.id, function (err, deletedRecord) {
                if (err) {
                    console.error(err)
                    return
                }
                console.log('Deleted record', deletedRecord.id)
                window.location.reload()
            })
        } else {
            alert('未選取服務')
            console.log('未選取')
        }
    }
}

export default Changemenu

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

function Changemenu3() {
    const [firmmenu, setFirmmenu] = useState([])
    const [visitmenu, setVisitmenu] = useState([])
    const [purposemenu, setPurposemenu] = useState([])

    useEffect(() => {
        base('firmmenu')
            .select({ view: 'Grid view' })
            .eachPage((records, fetchNextPage) => {
                //console.log(records);
                fetchNextPage()
                setFirmmenu(records)
            })
    }, [])

    useEffect(() => {
        base('visitmenu')
            .select({ view: 'Grid view' })
            .eachPage((records, fetchNextPage) => {
                //console.log(records);
                fetchNextPage()
                setVisitmenu(records)
            })
    }, [])

    useEffect(() => {
        base('purposemenu')
            .select({ view: 'Grid view' })
            .eachPage((records, fetchNextPage) => {
                //console.log(records);
                fetchNextPage()
                setPurposemenu(records)
            })
    }, [])

    const [newfirm, setfirm] = useState('')
    const onChangefirm = (event) => {
        setfirm(event.target.value)
    }

    const [newvisit, setvisit] = useState('')
    const onChangevisit = (event) => {
        setvisit(event.target.value)
    }

    const [newpurpose, setpurpose] = useState('')
    const onChangepurpose = (event) => {
        setpurpose(event.target.value)
    }

    const firmarray = []
    firmmenu.map((firmmenu) => firmarray.push(firmmenu.fields.menu))
    console.log(firmarray)
    const firmid = []
    firmmenu.map((firmmenu) => firmid.push(firmmenu.id))
    console.log(firmid)

    const visitarray = []
    visitmenu.map((visitmenu) => visitarray.push(visitmenu.fields.menu))
    console.log(visitarray)
    const visitid = []
    visitmenu.map((visitmenu) => visitid.push(visitmenu.id))
    console.log(visitid)

    const purposearray = []
    purposemenu.map((purposemenu) => purposearray.push(purposemenu.fields.menu))
    console.log(purposearray)
    const purposeid = []
    purposemenu.map((purposemenu) => purposeid.push(purposemenu.id))
    console.log(purposeid)

    const firmsplit1 = []
    for (let i = 0; i < firmmenu.length; i += 3) {
        firmsplit1.push([firmid[i], firmarray[i]])
    }
    //console.log(firmsplit1);
    const firmsplit2 = []
    for (let i = 1; i < firmmenu.length; i += 3) {
        firmsplit2.push([firmid[i], firmarray[i]])
    }
    //console.log(firmsplit2);
    const firmsplit3 = []
    for (let i = 2; i < firmmenu.length; i += 3) {
        firmsplit3.push([firmid[i], firmarray[i]])
    }
    //console.log(firmsplit3);

    const visitsplit1 = []
    for (let i = 0; i < visitmenu.length; i += 3) {
        visitsplit1.push([visitid[i], visitarray[i]])
    }
    const visitsplit2 = []
    for (let i = 1; i < visitmenu.length; i += 3) {
        visitsplit2.push([visitid[i], visitarray[i]])
    }
    const visitsplit3 = []
    for (let i = 2; i < visitmenu.length; i += 3) {
        visitsplit3.push([visitid[i], visitarray[i]])
    }

    const purposesplit1 = []
    for (let i = 0; i < purposemenu.length; i += 3) {
        purposesplit1.push([purposeid[i], purposearray[i]])
    }
    const purposesplit2 = []
    for (let i = 1; i < purposemenu.length; i += 3) {
        purposesplit2.push([purposeid[i], purposearray[i]])
    }
    const purposesplit3 = []
    for (let i = 2; i < purposemenu.length; i += 3) {
        purposesplit3.push([purposeid[i], purposearray[i]])
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
                <p>廠商類別選單</p>
                <div align="center">
                    新增類別:&nbsp;<input name="newfirm" onChange={onChangefirm}></input>&nbsp;&nbsp;
                    <button
                        type="button"
                        class="badge rounded-pill bg-success"
                        style={{ width: '80px', height: '40px' }}
                        onClick={createfirm}
                    >
                        新增
                    </button>
                    <button
                        type="button"
                        class="badge rounded-pill bg-danger"
                        style={{ width: '80px', height: '40px' }}
                        id="delete"
                        onClick={deletefirm}
                    >
                        刪除
                    </button>
                </div>
                <div class="list1">
                    {firmsplit1.map((firmsplit1) => (
                        <li>
                            <input type="radio" name="firm" id={firmsplit1[0]} />
                            &nbsp;&nbsp;{firmsplit1[1]}
                        </li>
                    ))}
                </div>
                <div class="list2">
                    {firmsplit2.map((firmsplit2) => (
                        <li>
                            <input type="radio" name="firm" id={firmsplit2[0]} />
                            &nbsp;&nbsp;{firmsplit2[1]}
                        </li>
                    ))}
                </div>
                <div class="list3">
                    {firmsplit3.map((firmsplit3) => (
                        <li>
                            <input type="radio" name="firm" id={firmsplit3[0]} />
                            &nbsp;&nbsp;{firmsplit3[1]}
                        </li>
                    ))}
                </div>
            </div>
            <div class="block2">
                <p>拜訪方式選單</p>
                <div align="center">
                    新增方式:&nbsp;<input name="newvisit" onChange={onChangevisit}></input>&nbsp;&nbsp;
                    <button
                        type="button"
                        class="badge rounded-pill bg-success"
                        style={{ width: '80px', height: '40px' }}
                        onClick={createvisit}
                    >
                        新增
                    </button>
                    <button
                        type="button"
                        class="badge rounded-pill bg-danger"
                        style={{ width: '80px', height: '40px' }}
                        id="delete"
                        onClick={deletevisit}
                    >
                        刪除
                    </button>
                </div>
                <div class="list1">
                    {visitsplit1.map((visitsplit1) => (
                        <li>
                            <input type="radio" name="visit" id={visitsplit1[0]} />
                            &nbsp;&nbsp;{visitsplit1[1]}
                        </li>
                    ))}
                </div>
                <div class="list2">
                    {visitsplit2.map((visitsplit2) => (
                        <li>
                            <input type="radio" name="visit" id={visitsplit2[0]} />
                            &nbsp;&nbsp;{visitsplit2[1]}
                        </li>
                    ))}
                </div>
                <div class="list3">
                    {visitsplit3.map((visitsplit3) => (
                        <li>
                            <input type="radio" name="visit" id={visitsplit3[0]} />
                            &nbsp;&nbsp;{visitsplit3[1]}
                        </li>
                    ))}
                </div>
            </div>
            <div class="block3">
                <p>拜訪目的選單</p>
                <div align="center">
                    新增目的:&nbsp;<input name="newpurpose" onChange={onChangepurpose}></input>&nbsp;&nbsp;
                    <button
                        type="button"
                        class="badge rounded-pill bg-success"
                        style={{ width: '80px', height: '40px' }}
                        onClick={createpurpose}
                    >
                        新增
                    </button>
                    <button
                        type="button"
                        class="badge rounded-pill bg-danger"
                        style={{ width: '80px', height: '40px' }}
                        id="delete"
                        onClick={deletepurpose}
                    >
                        刪除
                    </button>
                </div>
                <div class="list1">
                    {purposesplit1.map((purposesplit1) => (
                        <li>
                            <input type="radio" name="purpose" id={purposesplit1[0]} />
                            &nbsp;&nbsp;{purposesplit1[1]}
                        </li>
                    ))}
                </div>
                <div class="list2">
                    {purposesplit2.map((purposesplit2) => (
                        <li>
                            <input type="radio" name="purpose" id={purposesplit2[0]} />
                            &nbsp;&nbsp;{purposesplit2[1]}
                        </li>
                    ))}
                </div>
                <div class="list3">
                    {purposesplit3.map((purposesplit3) => (
                        <li>
                            <input type="radio" name="purpose" id={purposesplit3[0]} />
                            &nbsp;&nbsp;{purposesplit3[1]}
                        </li>
                    ))}
                </div>
            </div>
        </div>
    )

    function createfirm() {
        const value = document.querySelector('[name=newfirm]')
        if (value.value) {
            base('firmmenu').create(
                {
                    menu: newfirm,
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

    function createvisit() {
        const value = document.querySelector('[name=newvisit]')
        if (value.value) {
            base('visitmenu').create(
                {
                    menu: newvisit,
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
            alert('請輸入新方式')
        }
    }

    function createpurpose() {
        const value = document.querySelector('[name=newpurpose]')
        if (value.value) {
            base('purposemenu').create(
                {
                    menu: newpurpose,
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
            alert('請輸入新目的')
        }
    }

    function deletefirm() {
        const checked = document.querySelector('[name=firm]:checked')
        //console.log(checked.id);
        //console.log(checked);
        if (checked) {
            console.log('有選取')

            base('firmmenu').destroy(checked.id, function (err, deletedRecord) {
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

    function deletevisit() {
        const checked = document.querySelector('[name=visit]:checked')
        //console.log(checked.id);
        //console.log(checked);
        if (checked) {
            console.log('有選取')

            base('visitmenu').destroy(checked.id, function (err, deletedRecord) {
                if (err) {
                    console.error(err)
                    return
                }
                console.log('Deleted record', deletedRecord.id)
                window.location.reload()
            })
        } else {
            alert('未選取方式')
            console.log('未選取')
        }
    }

    function deletepurpose() {
        const checked = document.querySelector('[name=purpose]:checked')
        //console.log(checked.id);
        //console.log(checked);
        if (checked) {
            console.log('有選取')

            base('purposemenu').destroy(checked.id, function (err, deletedRecord) {
                if (err) {
                    console.error(err)
                    return
                }
                console.log('Deleted record', deletedRecord.id)
                window.location.reload()
            })
        } else {
            alert('未選取目的')
            console.log('未選取')
        }
    }
}

export default Changemenu3

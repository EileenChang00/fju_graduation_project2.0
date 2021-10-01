import { Paper, Divider } from '@material-ui/core'
import React from 'react'
import { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '70%',
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
        margin: '30px',
        padding: '30px',
    },
    table: {
        minWidth: 750,
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
}))

export default function Bulletin() {
    const classes = useStyles()
    //connect airtable
    var Airtable = require('airtable')
    var base = new Airtable({ apiKey: 'keyUAL9XklAOyi08b' }).base('apphBomMb49ieU17N')
    //import moment
    var moment = require('moment')
    const currentDate = moment().format('YYYY-MM-DD')
    //get 'reservation' records as reservation
    const [reservation, setReservation] = useState([])
    useEffect(() => {
        base('reservation')
            .select({
                view: 'Grid view2',
                filterByFormula: "AND(IS_BEFORE({res_date},DATEADD(TODAY(),1,'month')),IS_AFTER({res_date},TODAY()))",
            })
            .eachPage(
                function page(records, fetchNextPage) {
                    records.forEach(function (record) {
                        setReservation(records)
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
    const [service, setService] = useState([])
    useEffect(() => {
        base('service')
            .select({
                view: 'Grid view2',
                filterByFormula:
                    "AND(IS_BEFORE({ser_actualdate},DATEADD(TODAY(),1,'month')),IS_AFTER({ser_actualdate},TODAY()))",
            })
            .eachPage(
                function page(records, fetchNextPage) {
                    records.forEach(function (record) {
                        setService(records)
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
    //完成狀態checkbox
    //點選預約完成checkbox
    const resStatusDone = (event) => {
        //alert(event.target.value);
        var doneId = event.target.value
        base('reservation').update(
            [
                {
                    id: doneId,
                    fields: {
                        res_status: '完成',
                    },
                },
            ],
            function (err, records) {
                if (err) {
                    console.error(err)
                    alert(err)
                    return
                }
                alert('完成')
                window.location.reload()
            },
        )
    }
    //點選售後服務完成checkbox
    const serStatusDone = (event) => {
        //alert(event.target.value);
        var doneId = event.target.value
        base('service').update(
            [
                {
                    id: doneId,
                    fields: {
                        ser_donedate: currentDate,
                        ser_status: '完成',
                    },
                },
            ],
            function (err, records) {
                if (err) {
                    console.error(err)
                    alert(err)
                    return
                }
                alert('完成')
                window.location.reload()
            },
        )
    }
    return (
        <Paper className={classes.paper}>
            <div class="container-fluid">
                <h1 class="mt-4">
                    <font style={{ color: 'black' }}>公告</font>
                </h1>
                <Divider variant="middle" />
                <h2 align="center">預約</h2>
                <table border="1" cellpadding="5" align="center" style={{ fontSize: 'large' }}>
                    <tr>
                        <td>日期時段</td>
                        <td>顧客姓名</td>
                        <td>顧客電話</td>
                        <td>預約門市</td>
                        <td>員工姓名</td>
                        <td>完成</td>
                    </tr>
                    {reservation.map((reservation) => (
                        <tr>
                            <td>{moment(reservation.fields.res_date).format('YYYY-MM-DD HH:mm')}</td>
                            <td>{reservation.fields.res_cus_name}</td>
                            <td>{reservation.fields.res_cus_phone}</td>
                            <td>{reservation.fields.res_shop}</td>
                            <td>{reservation.fields.res_em_name}</td>
                            <td>
                                <input
                                    type="checkbox"
                                    name="resStatus[]"
                                    value={reservation.id}
                                    id="resStatus"
                                    onClick={resStatusDone}
                                ></input>
                            </td>
                        </tr>
                    ))}
                </table>
                <p></p>
                <h2 align="center">售後服務</h2>
                <table border="1" cellpadding="5" align="center" style={{ fontSize: 'large' }}>
                    <tr>
                        <td>日期時段</td>
                        <td>顧客姓名</td>
                        <td>顧客電話</td>
                        <td>員工姓名</td>
                        <td>服務項目</td>
                        <td>狀態</td>
                        <td>完成</td>
                    </tr>
                    {service.map((service) => (
                        <tr>
                            <td>{moment(service.fields.ser_actualdate).format('YYYY-MM-DD HH:mm')}</td>
                            <td>{service.fields.ser_cus_name}</td>
                            <td>{service.fields.ser_cus_phone}</td>
                            <td>{service.fields.ser_em_name}</td>
                            <td>
                                <a href={'mailto:' + service.fields.ser_cus_email}>{service.fields.ser_project}</a>
                            </td>
                            <td>{service.fields.ser_status}</td>
                            <td>
                                <input
                                    type="checkbox"
                                    name="serStatus[]"
                                    value={service.id}
                                    id="serStatus"
                                    onClick={serStatusDone}
                                ></input>
                            </td>
                        </tr>
                    ))}
                </table>
            </div>
        </Paper>
    )
}

import { useState } from 'react'
import //BrowserRouter as Router,
//Switch,
//Route,
//Link
'react-router-dom'

export default function Changepw() {
    const id = localStorage.getItem('id')
    console.log(localStorage.getItem('id'))

    //connect airtable
    var Airtable = require('airtable')
    var base = new Airtable({ apiKey: 'keyUAL9XklAOyi08b' }).base('apphBomMb49ieU17N')

    //get & prepare update data
    const [newEmployeePassword, setEmployeePassword] = useState('')
    const ChangeEmployeePassword = (event) => {
        console.log(event.target.value)
        setEmployeePassword(event.target.value)
    }
    //判斷兩個密碼是否相同
    const [same, setSame] = useState(true)
    const theSame = (event) => {
        event.target.value === newEmployeePassword ? setSame(true) : setSame(false)
    }
    //When UpdateButton is clicked
    function handleClick() {
        same === true
            ? base('employee').update(
                  [
                      {
                          id: id,
                          fields: {
                              em_password: newEmployeePassword,
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
                      window.location.reload()
                  },
              )
            : alert('兩次輸入密碼不同，請重新確認')
    }

    return (
        <div>
            <div class="d-flex" id="wrapper">
                <div id="page-content-wrapper">
                    <div class="container-fluid">
                        <h1 class="mt-4" style={{ color: 'black' }}>
                            員工更改密碼
                        </h1>
                        <p>新密碼</p>
                        <p>
                            <input onChange={ChangeEmployeePassword}></input>
                        </p>
                        <p>再輸入新密碼</p>
                        <p>
                            <input onChange={theSame}></input>
                        </p>
                        {same === false && <p>密碼不同</p>}
                        <p>
                            <button onClick={handleClick}>確定更改</button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

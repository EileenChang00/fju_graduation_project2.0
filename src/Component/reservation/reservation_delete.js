import { Button } from '@material-ui/core'

export default function Reservation_delete(props) {
    console.log(props.delete_id)
    //connect Airtable
    var Airtable = require('airtable')
    var base = new Airtable({ apiKey: 'keyUAL9XklAOyi08b' }).base('apphBomMb49ieU17N')
    //when delete button is clicked
    function handleDelete() {
        base('reservation').destroy(props.delete_id, function (err, deletedRecords) {
            if (err) {
                console.error(err)
                alert(err)
                return
            }
            alert('完成刪除')
            window.location.reload()
        })
    }
    return (
        <div>
            <Button variant="contained" color="secondary" onClick={handleDelete}>
                刪除
            </Button>
        </div>
    )
}

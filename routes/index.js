console.log("myName")
const express = require('express');
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000
const { postEmail } = require('./sendMail')

app.use(express.json());
app.use(cors({ origin: true }));

app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))

app.get('/', async (req, res) => {
    res.json({
        "msg": "sucess"
    })
})
app.post('/api/user/:clName', async (req, res) => {
    let getName = req.params.clName
    console.log(`postBody ${JSON.stringify(req.body)}`)
    console.log(`postParam ${JSON.stringify(getName)}`)

    if (JSON.stringify(getName) != null) {
        let getdata = await postEmail(JSON.stringify(getName), req.body.emailBody, req.body.emailSubject)
        if (getdata != null) {
            return res.json({
                msg: "PostUserclName",
                data: `Param is ${JSON.stringify(getName)} email body ${req.body.emailBody} with subject ${req.body.emailSubject}`,
                result: JSON.stringify(getdata)
            })
        }
    }
})
app.listen(port, () => console.log(`app is listening to ${port}`))


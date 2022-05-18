const express = require("express")
const app = express()
const port = 3000

app.get("/", (req, res) => {
    res.send("Hello World! Yes, we did it!")    
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})
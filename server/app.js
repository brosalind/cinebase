// if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
// }
const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 3000
const router = require('./routers/index')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use(router)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

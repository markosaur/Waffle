const express= require('express');
const cors  = require
const app= express();
const ctrl= require('./controller');

app.use(express.json())

//my endpoints
app.get('/api/waffles', ctrl.getWaffles)
app.put('/api/waffles/:id', ctrl.updateWaffles)
app.post('/api/waffles', ctrl.createWaffles)
app.delete('/api/waffles/:id', ctrl.deleteWaffles)

//Server Listening
app.listen(8080, () =>console.log('Server Running!'));
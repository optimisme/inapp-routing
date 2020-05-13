var express = require('express'),
    path = require('path')
    app = express(),
    port = 8001

// Server routes
app.use('/call', callAJAX)
app.use('/routing.js', (crida, resposta) => { resposta.sendFile(path.join(__dirname + '/routing.js')) })
app.use('/', (crida, resposta) => { resposta.sendFile(path.join(__dirname + '/index.html')) })

// Run server
app.listen(port, () => console.log('Example app listening on port:', port))

async function callAJAX (request, response) {
    let url = request.url,
        obj = null

    try {
        obj = await promiseGetPostData(request)
    } catch (e) {
        console.error(e)
        return
    }
    switch (url) {
    case '/something': /* do something */  break;
    default: response.json({ resultat: "ko", missatge: "Unknown call" })
    }
}

function promiseGetPostData (request) {
    return new Promise(async (resolve, reject) => {
        let body = '',
            error = null

        request.on('data', (data) => { body = body + data.toString() })
        request.on('close', () => { /* TODO - Client closed connection, destroy everything! */ })
        request.on('error', (err) => { error = 'Error getting data' })
        request.on('end', async () => {
            let rst = null
            if (error !== null) {
                console.log('Error getting data from post: ', error)
                return reject(error)
            } else {
                try {
                    return resolve(JSON.parse(body))
                } catch (e) {
                    console.log('Error parsing data from post: ', error)
                    return reject(e)
                }
                
            }
        })
    })
}
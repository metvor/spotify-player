const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const SpotifyWebApi = require('spotify-web-api-node');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/refresh', (req, res) => {
    const refreshToken = req.body.refreshToken
    console.log("hi")
    const spotifyApi = new SpotifyWebApi({
        redirectUri: 'http://localhost:3000',
        clientId: '7cbbd802a9ca428585a6c24eb9eec37e',
        clientSecret: '146ab96b80004c43a4d6669b08e58f17',
        refreshToken,
    })

    spotifyApi.refreshAccessToken().then(
        (data) => {
            res.json({
                accessToken: data.body.accessToken,
                expiresIn: data.body.expiresIn
            })
        }).catch(() => {
            res.sendStatus(400)
        })
})
app.post('/login', (req, res) => {
const code = req.body.code
const spotifyApi = new SpotifyWebApi({
    redirectUri: 'http://localhost:3000',
    clientId: '7cbbd802a9ca428585a6c24eb9eec37e',
    clientSecret: '146ab96b80004c43a4d6669b08e58f17',
})

spotifyApi.authorizationCodeGrant(code).then(data => {
    res.json({
        accessToken: data.body.access_token,
        refreshToken: data.body.refresh_token,
        expiresIn: data.body.expires_in
    })
})
.catch(() => {
    res.sendStatus(400)
})
})

app.listen(3001)
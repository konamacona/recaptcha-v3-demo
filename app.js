const express = require('express')
const fetch = require('node-fetch');
const app = express()

const PORT = 4001
const V3_SECRET = "6LfXfL0ZAAAAABOKddbl2ftIYlYC_z7_99BA-nHW"

function verify(secret, token) {
	const params = new URLSearchParams()
	params.append("secret", secret)
	params.append("response", token)
	const url = `https://www.google.com/recaptcha/api/siteverify?${params.toString()}`
	
	return fetch(url, {
		method: 'POST',
	}).then(response => response.json())
}

app.get('/v3-verify', (req, res) => {
	verify(V3_SECRET, req.query.token)
		.then(data => res.send(data))
		.catch(err => {
			console.error(err)
			res.status(500).send(err)
		})
})

app.use(express.static('public'))

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
})
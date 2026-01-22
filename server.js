const express = require('express')
const nunjucks = require('nunjucks')
const path = require('path')

const app = express()
const port = process.env.PORT || 3000

// 1. Configure Nunjucks
// We tell it to look in our 'app/views' AND the govuk-frontend components folder
nunjucks.configure([
  path.join(__dirname, 'app/views'),
  path.join(__dirname, 'node_modules/govuk-frontend/dist')
], {
  autoescape: true,
  express: app,
  noCache: true, // Useful for development
  watch: true    // Reload templates when they change
})

app.set('view engine', 'html')

// 2. Serve Static Assets
// Serve your compiled CSS from /public
app.use('/assets', express.static(path.join(__dirname, 'public')))

// Serve GOV.UK's own assets (images, fonts)
app.use('/assets/govuk', express.static(path.join(__dirname, 'node_modules/govuk-frontend/dist/govuk/assets')))

// 3. Routes
app.get('/', (req, res) => {
  res.render('index.html', {
    serviceName: 'Ψηφιακές Υπηρεσίες gov.gr'
  })
})

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
})

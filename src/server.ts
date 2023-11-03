import app from './app'
import registerRoutes from './routes/api'

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server listening on port....: ${PORT}`)
})

registerRoutes(app)

import { Hono } from 'hono'
import { basicAuth } from 'hono/basic-auth'


const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Signals!')
})

app.get('/api/hello', (c) => {
  return c.json({
    ok: true,
    message: 'Hello Signals!',
  })
})

app.get('/posts/:id', (c) => {
  const page = c.req.query('page')
  const id = c.req.param('id')
  c.header('X-Message', 'Hi!')
  return c.text(`You want see ${page} of ${id}`)
})

app.post('/posts', (c) => c.text('Created!', 201))

app.delete('/posts/:id', (c) => c.text(`${c.req.param('id')} is deleted!`))


app.get('/response', (c) => {
  return new Response('Good morning!')
})

app.use(
  '/admin/*',
  basicAuth({
    username: 'admin',
    password: 'secret',
  })
)

app.get('/admin', (c) => {
  return c.text('You are authorized!')
})


export default app
// const express = require('express')
// const bodyParser = require('body-parser')
// const db = require('./database')

// const app = express()
// app.use(bodyParser.json())

// app.post('/transactions', (req, res) => {
//   const {type, category, amount, date, description} = req.body
//   db.run(
//     'INSERT INTO transactions (type, category, amount, date, description) VALUES (?, ?, ?, ?, ?)',
//     [type, category, amount, date, description],
//     function (err) {
//       if (err) {
//         return res.status(500).json({error: err.message})
//       }
//       res.status(201).json({id: this.lastID})
//     },
//   )
// })

// app.get('/transactions', (req, res) => {
//   db.all('SELECT * FROM transactions', [], (err, rows) => {
//     if (err) {
//       return res.status(500).json({error: err.message})
//     }
//     res.json(rows)
//   })
// })

// app.get('/transactions/:id', (req, res) => {
//   const {id} = req.params
//   db.get('SELECT * FROM transactions WHERE id = ?', [id], (err, row) => {
//     if (err) {
//       return res.status(500).json({error: err.message})
//     }
//     res.json(row)
//   })
// })

// app.put('/transactions/:id', (req, res) => {
//   const {id} = req.params
//   const {type, category, amount, date, description} = req.body
//   db.run(
//     'UPDATE transactions SET type = ?, category = ?, amount = ?, date = ?, description = ? WHERE id = ?',
//     [type, category, amount, date, description, id],
//     function (err) {
//       if (err) {
//         return res.status(500).json({error: err.message})
//       }
//       res.json({changes: this.changes})
//     },
//   )
// })

// app.delete('/transactions/:id', (req, res) => {
//   const {id} = req.params
//   db.run('DELETE FROM transactions WHERE id = ?', [id], function (err) {
//     if (err) {
//       return res.status(500).json({error: err.message})
//     }
//     res.json({changes: this.changes})
//   })
// })

// app.get('/summary', (req, res) => {
//   db.all(
//     'SELECT type, SUM(amount) as total FROM transactions GROUP BY type',
//     [],
//     (err, rows) => {
//       if (err) {
//         return res.status(500).json({error: err.message})
//       }
//       res.json(rows)
//     },
//   )
// })

// // const PORT = process.env.PORT || 5000
// // app.listen(PORT, () => {
// //   console.log(`Server is running on port ${PORT}`)
// // })
// const PORT = process.env.PORT || 3000
// app.listen(PORT, '0.0.0.0', () => {
//   console.log(`Server is running on port ${PORT}`)
// })

const express = require('express')
const bodyParser = require('body-parser')
const db = require('./database')

const app = express()
app.use(bodyParser.json())

// Root route to check if the server is running
app.get('/', (req, res) => {
  res.send('Server is running!')
})

app.post('/transactions', (req, res) => {
  const {type, category, amount, date, description} = req.body
  db.run(
    'INSERT INTO transactions (type, category, amount, date, description) VALUES (?, ?, ?, ?, ?)',
    [type, category, amount, date, description],
    function (err) {
      if (err) {
        return res.status(500).json({error: err.message})
      }
      res.status(201).json({id: this.lastID})
    },
  )
})

app.get('/transactions', (req, res) => {
  db.all('SELECT * FROM transactions', [], (err, rows) => {
    if (err) {
      return res.status(500).json({error: err.message})
    }
    res.json(rows)
  })
})

app.get('/transactions/:id', (req, res) => {
  const {id} = req.params
  db.get('SELECT * FROM transactions WHERE id = ?', [id], (err, row) => {
    if (err) {
      return res.status(500).json({error: err.message})
    }
    res.json(row)
  })
})

app.put('/transactions/:id', (req, res) => {
  const {id} = req.params
  const {type, category, amount, date, description} = req.body
  db.run(
    'UPDATE transactions SET type = ?, category = ?, amount = ?, date = ?, description = ? WHERE id = ?',
    [type, category, amount, date, description, id],
    function (err) {
      if (err) {
        return res.status(500).json({error: err.message})
      }
      res.json({changes: this.changes})
    },
  )
})

app.delete('/transactions/:id', (req, res) => {
  const {id} = req.params
  db.run('DELETE FROM transactions WHERE id = ?', [id], function (err) {
    if (err) {
      return res.status(500).json({error: err.message})
    }
    res.json({changes: this.changes})
  })
})

app.get('/summary', (req, res) => {
  db.all(
    'SELECT type, SUM(amount) as total FROM transactions GROUP BY type',
    [],
    (err, rows) => {
      if (err) {
        return res.status(500).json({error: err.message})
      }
      res.json(rows)
    },
  )
})

// Start the server
const PORT = process.env.PORT || 3000
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`)
})

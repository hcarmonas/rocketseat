const express = require('express')

const app = express()

app.use(express.json())

/**
 * Métodos HTTP:
 *
 * GET: Buscar infomações do back-end
 * POST: Criar uma informação no back-end
 * PUT/PATCH: Altera uma informação no back-end
 * DELETE: Deletar uma informação no back-end
 */

/**
 * Tipos de parâmetros:
 *
 * Query Params: Filtros e paginação
 * Route Params: Identificar recursos (Atualizar/deletar)
 * Request Body: Conteúdo na hora de criar ou editar um recurso
 */

app.get('/projects', (request, response) => {
  const { title, owner } = request.query

  console.log(title)
  console.log(owner)

  return response.json([
    'Projeto 1',
    'Projeto 2',
  ])
})

app.post('/projects', (request, response) => {
  const body = request.body

  console.log(body)

  return response.json([
    'Projeto 1',
    'Projeto 2',
    'Projeto 3',
  ])
})

app.put('/projects/:id', (request, response) => {
  const {id} = request.params

  console.log(`id: ${id}`)

  return response.json([
    'Projeto 4',
    'Projeto 2',
    'Projeto 3',
  ])
})

app.delete('/projects/:id', (request, response) => {
  return response.json([
    'Projeto 2',
    'Projeto 3',
  ])
})

//localhost:3333
app.listen(3333, () => {
  console.log('🚀 Back-end started!')
})

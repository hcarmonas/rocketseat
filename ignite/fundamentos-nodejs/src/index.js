const express = require('express')
const {uuid} = require('uuidv4')

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

const projects = []

app.get('/projects', (request, response) => {
  const { title} = request.query

  const results = title
    ? projects.filter(project => project.title.includes(title))
    : projects

  return response.json(results)
})

app.post('/projects', (request, response) => {
  const { title, owner } = request.body

  const project = { id: uuid(), title, owner}

  projects.push(project)

  return response.json(project)
})

app.put('/projects/:id', (request, response) => {
  const {id} = request.params
  const { title, owner } = request.body
  const project = { id, title, owner}

  const projectIndex = projects.findIndex(project => project.id === id)

  if (projectIndex < 0) {
    return response.status(404).json({ error: 'Project Not Found'})
  } else {
    projects[projectIndex] = project

    return response.json(project)
  }
})

app.delete('/projects/:id', (request, response) => {
  const {id} = request.params

  const projectIndex = projects.findIndex(project => project.id === id)

  if (projectIndex < 0) {
    return response.status(404).json({ error: 'Project Not Found'})
  } else {
    projects.splice(projectIndex, 1)

    return response.status(204).send()
  }
})

//localhost:3333
app.listen(3333, () => {
  console.log('🚀 Back-end started!')
})

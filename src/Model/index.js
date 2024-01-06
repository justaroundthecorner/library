const knexConfig = require('../knexfile')
const Knex = require('knex')

const { Model} = require('objection')

const knex = Knex(knexConfig)
Model.knex(knex)

const users =require('./user')
const books =require('./book')

module.exports =
{
    users,
    books
}
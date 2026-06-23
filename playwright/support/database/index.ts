import { Kysely, PostgresDialect } from 'kysely'
import pg from 'pg'

const { Pool } = pg

export interface OrderTable {
  id: string
  order_number: string
  color: string
  wheel_type: string
  customer_name: string
  customer_email: string
  customer_phone: string
  customer_cpf: string
  payment_method: string
  total_price: string
  status: 'APROVADO' | 'REPROVADO' | 'EM_ANALISE'
  created_at: string
  updated_at: string
  optionals: string[]
}

export interface Database {
  orders: OrderTable
}

const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:postgres@127.0.0.1:54322/postgres'

export const db = new Kysely<Database>({
  dialect: new PostgresDialect({
    pool: new Pool({
      connectionString,
    })
  })
})

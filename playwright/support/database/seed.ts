import { db } from './index'

export async function seedOrders() {
  const orders = [
    {
      id: 'fc7babf7-4a20-4742-a1d1-9d38e1da598d',
      order_number: 'VLO-RBAQSL',
      color: 'lunar-white',
      wheel_type: 'aero',
      customer_name: 'Renato Reis',
      customer_email: 'renatoreis@live.com',
      customer_phone: '(11) 99999-9999',
      customer_cpf: '000.000.141-41',
      payment_method: 'avista',
      total_price: '40000',
      status: 'APROVADO' as const,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      optionals: []
    },
    {
      id: 'd9e5b8e1-5e20-47a2-a1b1-2c38e1da598f',
      order_number: 'VLO-DOW0ZN',
      color: 'midnight-black',
      wheel_type: 'sport',
      customer_name: 'Maria Aparecida',
      customer_email: 'maria@live.com',
      customer_phone: '(11) 99999-8888',
      customer_cpf: '111.111.141-41',
      payment_method: 'avista',
      total_price: '45000',
      status: 'REPROVADO' as const,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      optionals: []
    },
    {
      id: 'e1a5b8e1-5e20-47a2-a1b1-2c38e1da598a',
      order_number: 'VLO-PWGBSU',
      color: 'glacier-blue',
      wheel_type: 'aero',
      customer_name: 'Andre Reis',
      customer_email: 'andre@live.com',
      customer_phone: '(11) 99999-7777',
      customer_cpf: '222.222.141-41',
      payment_method: 'avista',
      total_price: '40000',
      status: 'EM_ANALISE' as const,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      optionals: []
    }
  ]

  for (const order of orders) {
    await db.insertInto('orders')
      .values(order)
      .onConflict((oc) => oc.column('order_number').doUpdateSet({
        status: order.status,
        color: order.color,
        wheel_type: order.wheel_type,
        customer_name: order.customer_name,
        customer_email: order.customer_email,
        payment_method: order.payment_method,
        updated_at: new Date().toISOString()
      }))
      .execute()
  }
}

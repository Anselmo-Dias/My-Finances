import React from 'react';
import ReactDOM from 'react-dom';
import { createServer, Model } from 'miragejs';
import { App } from './App';

// 

createServer({

  models: {
    transaction: Model,
  },

  seeds(server) {
    server.db.loadData({
      transactions: [
        {
          id:1,
          title: "Projeto entregue",
          type: "deposit",
          category: 'trabalho',
          amount: 4000,
          creatAt: new Date('2022-09-08'),
        },

        {
          id:2,
          title: "Fatura",
          type: "withdraw",
          category: 'Dividas',
          amount: 500,
          creatAt: new Date('2022-09-08'),
        }
      ]
    })
  },

  routes() {
    this.namespace = 'api'

    this.get('/transactions', () => {
      return this.schema.all('transaction')
    })

    this.post('transactions',(schema, request) => {
          const data = JSON.parse(request.requestBody)

          return schema.create('transaction', data)
    })
  }
}) 

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

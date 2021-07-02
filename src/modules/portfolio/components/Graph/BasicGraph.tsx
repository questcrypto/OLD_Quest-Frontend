import React from 'react'
import { AreaChart, Area, YAxis, XAxis, CartesianGrid, Tooltip, Legend } from 'recharts'

export default function BasicGraph() {
  const data = [
    {
      name: '18 June',
      USDC: 1,
    },
    {
      name: '19 June',
      USDC: 1,
    },
    {
      name: '20 June',
      USDC: 1,
    },
    {
      name: '21 June',
      USDC: 1,
    },
    {
      name: '22 June',
      USDC: 1,
    },
  ]
  return (
    <AreaChart width={1130} height={250} data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
      <CartesianGrid strokeDasharray="3 3" />
      <defs>
        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
          <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
        </linearGradient>
        <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
          <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
        </linearGradient>
      </defs>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />

      <Area type="monotone" dataKey="USDC" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
    </AreaChart>
  )
}

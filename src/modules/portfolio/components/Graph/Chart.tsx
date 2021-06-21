import React, { useEffect, useState } from 'react'
import coinGecko from './coinGecko'
import HistoryChart from './HistoryChart'

const Chart = () => {
  const id = 'bitcoin'
  const [coinData, setCoinData] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const formatData = (data: any) => {
    return data.map((el: any) => {
      return {
        t: el[0],
        y: el[1].toFixed(2),
      }
    })
  }

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      const [day, week, year, detail] = await Promise.all([
        coinGecko.get(`/coins/${id}/market_chart/`, {
          params: {
            vs_currency: 'usd',
            days: '1',
          },
        }),
        coinGecko.get(`/coins/${id}/market_chart/`, {
          params: {
            vs_currency: 'usd',
            days: '7',
          },
        }),
        coinGecko.get(`/coins/${id}/market_chart/`, {
          params: {
            vs_currency: 'usd',
            days: '365',
          },
        }),
        coinGecko.get('/coins/markets/', {
          params: {
            vs_currency: 'usd',
            ids: id,
          },
        }),
      ])
      setCoinData({
        day: formatData(day.data.prices),
        week: formatData(week.data.prices),
        year: formatData(year.data.prices),
        detail: detail.data[0],
      })
      setIsLoading(false)
    }

    fetchData()
  }, [])

  const renderData = () => {
    if (isLoading) {
      return <div>Loading....</div>
    }
    return (
      <div className="coinlist">
        <HistoryChart data={coinData} />
      </div>
    )
  }

  return renderData()
}

export default Chart

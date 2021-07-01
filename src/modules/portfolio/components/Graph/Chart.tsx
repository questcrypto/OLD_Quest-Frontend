import React, { useEffect, useState } from 'react'
import coinGecko from './coinGecko'
import HistoryChart from './HistoryChart'
const Moment = require('moment')
const MomentRange = require('moment-range')
const moment = MomentRange.extendMoment(Moment)

const Chart = () => {
  const id = 'bitcoin'
  const [coinData, setCoinData] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [reqDays, setReqDays] = useState([])

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
  useEffect(() => {
    //@ts-ignore
    const datesArr = []
    let start = new Date('06/18/2021')
    let end = new Date('06/30/2021')
    let newend = end.setDate(end.getDate() + 1)
    end = new Date(newend)
    // while (start < end) {
    // console.log(new Date(start).getTime(), '*** 1') // unix timestamp format
    //   // datesArr.push({ t: new Date(start).getDate(), y: '1' })
    //   // console.log(start, '666') // ISO Date format
    //   // console.log()
    var newDate = start.setDate(start.getDate() + 1)
    // console.log(newDate, '***2')
    //   start = new Date(newDate)
    //   const milliSecs = new Date(start).getTime()
    //   // console.log(new Date(start).getMilliseconds(), '***')
    //   // console.log(new Date(milliSecs).toLocaleDateString('en-US'), '****')
    //   const date = new Date(milliSecs * 1000)
    //   // console.log(date.toLocaleDateString('en-US'))
    //   datesArr.push({ t: start, y: '1' })
    // }
    // // @ts-ignore
    // setReqDays(datesArr)
  }, [])

  // const usdcData = { year: reqDays }
  const newData = {
    days: [
      { t: 1624012416000, y: '1' },
      { t: 1624098816000, y: '1' },
      { t: 1624185216000, y: '1' },
      { t: 1624271616000, y: '1' },
      { t: 1624358016000, y: '1' },
    ],
  }
  const renderData = () => {
    if (isLoading) {
      return <div>Loading....</div>
    }
    return (
      <div className="coinlist">
        <HistoryChart data={newData} />
      </div>
    )
  }

  return renderData()
}

export default Chart

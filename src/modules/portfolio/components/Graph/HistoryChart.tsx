import { useRef, useEffect, useState } from 'react'
import { historyOptions } from './chartConfig'
const Chartjs = require('chart.js')

const HistoryChart = (props: any) => {
  const { data } = props
  const chartRef: any = useRef()
  // const { day, week, year, detail } = data
  const { days } = data
  const [timeFormat, setTimeFormat] = useState('24h')

  // const determineTimeFormat = () => {
  //   switch (timeFormat) {
  //     case '24h':
  //       return day
  //     case '7d':
  //       return week
  //     case '1y':
  //       return year
  //     default:
  //       return day
  //   }
  // }

  useEffect(() => {
    if (chartRef && chartRef.current) {
      const chartInstance = new Chartjs(chartRef.current, {
        type: 'line',
        data: {
          datasets: [
            {
              // label: `${detail.name} price`,
              // data: determineTimeFormat(),
              label: `USDC (18-June-2021 to 01-July-2021)`,
              data: days,
              backgroundColor: 'rgba(174, 305, 194, 0.5)',
              borderColor: 'rgba(174, 305, 194, 0.4',
              pointRadius: 0,
            },
          ],
        },
        options: {
          ...historyOptions,
        },
      })
    }
  })

  // const renderPrice = () => {
  //   if (detail) {
  //     return (
  //       <>
  //         <p className="my-0">${detail.current_price.toFixed(2)}</p>
  //         <p className={detail.price_change_24h < 0 ? 'text-danger my-0' : 'text-success my-0'}>
  //           {detail.price_change_percentage_24h.toFixed(2)}%
  //         </p>
  //       </>
  //     )
  //   }
  // }
  return (
    <div className="bg-white border mt-2 rounded p-3">
      {/* <div>{renderPrice()}</div> */}
      <div>
        <canvas ref={chartRef} id="myChart" width={200} height={250}></canvas>
      </div>

      {/* <div className="chart-button mt-1">
        <button onClick={() => setTimeFormat('24h')} className="btn btn-outline-secondary btn-sm">
          24h
        </button>
        <button onClick={() => setTimeFormat('7d')} className="btn btn-outline-secondary btn-sm mx-1">
          7d
        </button>
        <button onClick={() => setTimeFormat('1y')} className="btn btn-outline-secondary btn-sm">
          1y
        </button>
      </div> */}
    </div>
  )
}

export default HistoryChart

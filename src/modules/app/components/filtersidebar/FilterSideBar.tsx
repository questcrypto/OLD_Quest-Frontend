import { Checkbox, FormControlLabel } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useStyles } from './FilterSideBarStyle'

const FilterSideBar = (props: any) => {
  const { setShowFilterSideBar, setShowButtonName } = props
  const classes = useStyles()
  const [showBuyActive, setShowBuyActive] = useState(false)
  const [isPriceActive, setIsPriceActive] = useState(false)
  const [isStatusActive, setIsStatusActive] = useState(false)
  const [showAuctionActive, setShowAuctionActive] = useState(false)
  const [showNewActive, setShowNewActive] = useState(false)
  const [showOfferActive, setShowOfferActive] = useState(false)
  const [filterData, setFilterData] = useState<any>([])
  let buttonNameData: any = []

  const handleApply = () => {
    setShowButtonName(filterData)
    
  }

  const handleBuyButton = () => {
    if (showBuyActive === true) {
      buttonNameData = [...filterData]
      const filterArr = buttonNameData.filter((item: any) => {
        if (item !== 'Buy Now') {
          return item
        }
      })
      setFilterData([...filterArr])
      setShowBuyActive(false)
    } else {
      setShowBuyActive(true)
      buttonNameData = [...filterData]
      buttonNameData.push('Buy Now')
      setFilterData([...buttonNameData])
    }
  }

  const handleAuctionButton = () => {
    if (showAuctionActive === true) {
      buttonNameData = [...filterData]
      const filterArr = buttonNameData.filter((item: any) => {
        if (item !== 'On Auction') {
          return item
        }
      })
      setFilterData([...filterArr])
      setShowAuctionActive(false)
    } else {
      setShowAuctionActive(true)
      buttonNameData = [...filterData]
      buttonNameData.push('On Auction')
      setFilterData([...buttonNameData])
    }
  }
  const handleNewButton = () => {
    if (showNewActive === true) {
      buttonNameData = [...filterData]
      const filterArr = buttonNameData.filter((item: any) => {
        if (item !== 'New') {
          return item
        }
      })
      setFilterData([...filterArr])
      setShowNewActive(false)
    } else {
      setShowNewActive(true)
      buttonNameData = [...filterData]
      buttonNameData.push('New')
      setFilterData([...buttonNameData])
    }
  }
  const handleOfferButton = () => {
    if (showOfferActive === true) {
      buttonNameData = [...filterData]
      const filterArr = buttonNameData.filter((item: any) => {
        if (item !== 'Has Offer') {
          return item
        }
      })
      setFilterData([...filterArr])
      setShowOfferActive(false)
    } else {
      setShowOfferActive(true)
      buttonNameData = [...filterData]
      buttonNameData.push('Has Offer')
      setFilterData([...buttonNameData])
    }
  }

  const handlePriceAccordian = () => {
    if (isPriceActive === true) {
      setIsPriceActive(false)
    } else {
      setIsPriceActive(true)
    }
  }

  const handleStatusAccordian = () => {
    if (isStatusActive === true) {
      setIsStatusActive(false)
    } else {
      setIsStatusActive(true)
    }
  }

  return (
    <div className={classes.sideBarWrapper}>
      <div className={classes.sideBarCloseIcon}>
        <svg
          width="11"
          height="12"
          viewBox="0 0 11 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          onClick={() => setShowFilterSideBar(false)}
          className={classes.svg}
        >
          <path
            d="M6.96875 6L10.3438 2.65625C10.5312 2.46875 10.5312 2.125 10.3438 1.9375L9.5625 1.15625C9.375 0.96875 9.03125 0.96875 8.84375 1.15625L5.5 4.53125L2.125 1.15625C1.9375 0.96875 1.59375 0.96875 1.40625 1.15625L0.625 1.9375C0.4375 2.125 0.4375 2.46875 0.625 2.65625L4 6L0.625 9.375C0.4375 9.5625 0.4375 9.90625 0.625 10.0938L1.40625 10.875C1.59375 11.0625 1.9375 11.0625 2.125 10.875L5.5 7.5L8.84375 10.875C9.03125 11.0625 9.375 11.0625 9.5625 10.875L10.3438 10.0938C10.5312 9.90625 10.5312 9.5625 10.3438 9.375L6.96875 6Z"
            fill="#8C8C8C"
          />
        </svg>
        
      </div>
      <div className={classes.sideBarItem}>
        <div
          className={classes.sideBarHeader}
          onClick={() => {
            handleStatusAccordian()
          }}
        >
          STATUS
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M18.7812 9.25L18.1875 8.625C18.0312 8.46875 17.7812 8.46875 17.6562 8.625L12 14.2812L6.3125 8.625C6.1875 8.46875 5.9375 8.46875 5.78125 8.625L5.1875 9.25C5.03125 9.375 5.03125 9.625 5.1875 9.78125L11.7188 16.3125C11.875 16.4688 12.0938 16.4688 12.25 16.3125L18.7812 9.78125C18.9375 9.625 18.9375 9.375 18.7812 9.25Z"
              fill="#8C8C8C"
            />
          </svg>
        </div>
        {isStatusActive ? (
          <div className={classes.sideBarcontact}>
            <div className={classes.CheckboxRow}>
              <div className={showBuyActive ? classes.CheckboxactiveButton : classes.CheckboxButton} onClick={() => handleBuyButton()}>
                Buy Now
              </div>
              <div
                className={showAuctionActive ? classes.CheckboxactiveButton : classes.CheckboxButton}
                onClick={() => handleAuctionButton()}
              >
                On Auction
              </div>
              <div className={showNewActive ? classes.CheckboxactiveButton : classes.CheckboxButton} onClick={() => handleNewButton()}>
                New
              </div>
              <div className={showOfferActive ? classes.CheckboxactiveButton : classes.CheckboxButton} onClick={() => handleOfferButton()}>
                Has Offer
              </div>
            </div>
          </div>
        ) : null}
      </div>
      <div className={classes.sideBarItem}>
        <div
          className={classes.sideBarHeader}
          onClick={() => {
            handlePriceAccordian()
          }}
        >
          PRICE
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M18.7812 9.25L18.1875 8.625C18.0312 8.46875 17.7812 8.46875 17.6562 8.625L12 14.2812L6.3125 8.625C6.1875 8.46875 5.9375 8.46875 5.78125 8.625L5.1875 9.25C5.03125 9.375 5.03125 9.625 5.1875 9.78125L11.7188 16.3125C11.875 16.4688 12.0938 16.4688 12.25 16.3125L18.7812 9.78125C18.9375 9.625 18.9375 9.375 18.7812 9.25Z"
              fill="#8C8C8C"
            />
          </svg>
        </div>
        {isPriceActive ? (
          <div className={classes.sideBarcontact}>
            <div className={classes.inputRow}>
              <div className={classes.inputBox}>
                <input className={classes.inputItem} placeholder="Min" />
              </div>
              <span className={classes.toSpan}>to</span>
              <div className={classes.inputBox}>
                <input className={classes.inputItem} placeholder="Max" />
              </div>
            </div>
          </div>
        ) : null}
        <div className={classes.applyButtonRow}>
          <div
            className={classes.applyButton}
            onClick={() => {
              handleApply()
            }}
          >
            Apply
          </div>
        </div>
      </div>
    </div>
  )
}

export default FilterSideBar

import React, { useState, useEffect } from 'react'
import { useStyles, PaginationText, NoDataContainer } from './style'
import { getPropertyType } from 'shared/helpers/globalFunction'
import ComponentLoader from 'shared/loader-components/component-loader'
import Grid from '@material-ui/core/Grid'
import TableContainer from '@material-ui/core/TableContainer'
import Table from '@material-ui/core/Table'
import TableRow from '@material-ui/core/TableRow'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import Paper from '@material-ui/core/Paper'
import { PrimaryButton } from 'shared/components/buttons'
import Pagination from '@material-ui/lab/Pagination'
import Spinner from 'shared/loader-components/spinner'
import { SLCContractAddress, slcAbi } from 'modules/block-chain/abi'
import { getWeb3Val, handleSignPendingTransactionSubmit } from 'modules/block-chain/BlockChainMethods'

const TokenToMintTable = (props: any) => {
  const classes = useStyles()
  const [account, setAccount] = useState('')
  const [contractSLC, setContractSLC] = useState<any>('')
  const [loading /* setLoading */] = useState(false)
  const { data, dataLoading } = props

  useEffect(() => {
    const getChainDetails = async () => {
      try {
        const web3 = await getWeb3Val()
        if (web3) {
          const accounts = await web3.eth.getAccounts()
          setAccount(accounts[0])
          const SLCInstance = new web3.eth.Contract(slcAbi, SLCContractAddress)
          window.ethereum.on('accountsChanged', (accounts: any) => {
            setAccount(accounts[0])
          })
          setContractSLC(SLCInstance)
        }
      } catch (err) {
        alert(`Failed to load web3, accounts, or contract. Check console for details.`)
        console.log('err->', err)
      }
    }
    getChainDetails()
  }, [])

  const getName = (firstName: string, lastName: string) => {
    let fName = ''
    let lName = ''
    if (firstName) {
      fName = firstName.charAt(0).toUpperCase() + firstName.slice(1)
    }
    if (lastName) {
      lName = lastName.charAt(0).toUpperCase() + lastName.slice(1)
    }
    const fullName = `${fName} ${lName}`

    return fullName
  }

  const handleSign = async (id: any) => {
    try {
      handleSignPendingTransactionSubmit(contractSLC, account, parseInt(id))
    } catch (error) {}
  }

  return (
    <Grid>
      {dataLoading ? (
        <ComponentLoader />
      ) : (
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead className={classes.tableHeadStyle}>
              <TableRow>
                <TableCell>LOCATION</TableCell>
                <TableCell>MANAGER</TableCell>
                <TableCell>TYPE</TableCell>
                <TableCell>STATUS</TableCell>
                <TableCell>VALUE</TableCell>
                <TableCell>TOKEN ID</TableCell>
                <TableCell>ACTION</TableCell>
              </TableRow>
            </TableHead>
            {!!data && data.length > 0 && (
              <TableBody>
                {data.map((row: any, k: number) => (
                  <TableRow key={k}>
                    <TableCell component="th" scope="row">
                      {row.PropertyDetails && `${row.PropertyDetails.Address1},${row.PropertyDetails.State},${row.PropertyDetails.Country}`}
                    </TableCell>
                    <TableCell>{row.PropertyDetails && getName(row.PropertyDetails.Fname, row.PropertyDetails.Lname)}</TableCell>
                    <TableCell>{row.PropertyDetails && getPropertyType(row.PropertyDetails.PropertyType)}</TableCell>
                    <TableCell>Approved</TableCell>
                    <TableCell>{row.PropertyDetails && `$${parseFloat(row.PropertyDetails.CurrentValue).toFixed(2)}`}</TableCell>
                    <TableCell style={{ textAlign: 'center' }}>{row.TransactionID}</TableCell>
                    <TableCell>
                      <PrimaryButton onClick={() => handleSign(row.TransactionID)}>{loading ? <Spinner /> : 'Sign'}</PrimaryButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            )}
          </Table>
          {!!data && data.length === 0 && (
            <NoDataContainer>
              <p>No data available</p>
            </NoDataContainer>
          )}
        </TableContainer>
      )}

      {!!data && data.length > 10 && (
        <Grid container className={classes.paginationCont} justify="space-between">
          <PaginationText>Showing 1 to 15 of 35 element</PaginationText>
          <Pagination count={10} showFirstButton showLastButton />
        </Grid>
      )}
    </Grid>
  )
}
export default TokenToMintTable

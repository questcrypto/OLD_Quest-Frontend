import React, { useState, useEffect } from 'react'
import { useStyles, NoDataContainer } from './style'
import { getPropertyType } from 'shared/helpers/globalFunction'
import ComponentLoader from 'shared/loader-components/component-loader'
import Grid from '@material-ui/core/Grid'
import TableContainer from '@material-ui/core/TableContainer'
import Table from '@material-ui/core/Table'
import TableRow from '@material-ui/core/TableRow'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableFooter from '@material-ui/core/TableFooter'
import CustomPagination from './CustomPagination'
import Paper from '@material-ui/core/Paper'
import { PrimaryButton } from 'shared/components/buttons'
import { getFullName } from 'shared/helpers/globalFunction'
import Spinner from 'shared/loader-components/spinner'
import { SLCContractAddress, slcAbi } from 'modules/block-chain/abi'
import { getWeb3Val, handleSignPendingTransactionSubmit } from 'modules/block-chain/BlockChainMethods'
import EmptyPage from 'shared/empty-page'

const TokenToMintTable = (props: any) => {
  const classes = useStyles()
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
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

  const handleSign = async (id: any) => {
    try {
      handleSignPendingTransactionSubmit(contractSLC, account, parseInt(id))
    } catch (error) {}
  }

  const renderTableRows = (rowData: any, index: number) => {
    const { PropertyDetails, TransactionID } = rowData
    return (
      <TableRow key={index} className={classes.tableRowStyle}>
        <TableCell component="th" scope="row">
          {PropertyDetails && `${PropertyDetails.Address1},${PropertyDetails.State},${PropertyDetails.Country}`}
        </TableCell>
        <TableCell>{PropertyDetails && getFullName(PropertyDetails.Fname, PropertyDetails.Lname)}</TableCell>
        <TableCell>{PropertyDetails && getPropertyType(PropertyDetails.PropertyType)}</TableCell>
        <TableCell>Approved</TableCell>
        <TableCell>{PropertyDetails && `$${parseFloat(PropertyDetails.CurrentValue).toFixed(2)}`}</TableCell>
        <TableCell style={{ textAlign: 'center' }}>{TransactionID}</TableCell>
        <TableCell>
          <PrimaryButton onClick={() => handleSign(TransactionID)}>{loading ? <Spinner /> : 'Sign'}</PrimaryButton>
        </TableCell>
      </TableRow>
    )
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
                {(rowsPerPage > 0 ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : data).map((row: any, k: number) =>
                  renderTableRows(row, k)
                )}
              </TableBody>
            )}
            {!!data && data.length > 10 && (
              <TableFooter>
                <TableRow>
                  <CustomPagination rows={data} rowsPerPage={rowsPerPage} setRowsPerPage={setRowsPerPage} page={page} setPage={setPage} />
                </TableRow>
              </TableFooter>
            )}
          </Table>
          {!!data && data.length === 0 && (
            <NoDataContainer>
              <EmptyPage name="here for mint" />
            </NoDataContainer>
          )}
        </TableContainer>
      )}
    </Grid>
  )
}
export default TokenToMintTable

export const handlePropertyDetailsSubmit = (contractSLF: any, account: string, propertyValue: number, date: number, propertyId: string) => {
  contractSLF.methods
    .ListProperty_details(propertyValue, propertyValue, propertyValue, 100, 0, 1, 100, date, propertyId, propertyId)
    .send({ from: account })
}

export const getPendingTransaction = async (contractSLC: any, account: string) => {
  try {
    const pendingTransaction = await contractSLC.methods.getPendingTransactions().call({ from: account })
    if (pendingTransaction.length > 0) {
      const trans = await contractSLC.methods._transactions(pendingTransaction[0]).call({ from: account })
      return trans
    }
  } catch (err) {
    console.log('err->', err)
  }
}
export const handleSignPendingTransactionSubmit = (contractSLC: any, account: string, transactionNumber: number) => {
  contractSLC.methods.signTransaction(transactionNumber).send({ from: account })
}

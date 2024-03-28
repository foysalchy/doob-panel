export const getInvoice = () => {
  let invoiceData = []
  const storedinvoiceData = localStorage.getItem('invoiceData')
  if (storedinvoiceData) {
    invoiceData = JSON.parse(storedinvoiceData)
  }
  return invoiceData
}


export const saveInvoice = invoice => {
//   let invoiceData = getInvoice()
//   const isExist = invoiceData.find(b => b.id === invoice.id)
//   if (isExist) {
//     return 
//   }
//   invoiceData.push(invoice)
  localStorage.setItem('invoiceData', JSON.stringify(invoice))

}

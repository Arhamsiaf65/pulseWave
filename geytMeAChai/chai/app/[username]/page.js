import React from 'react'
import PaymentPage from '../components/paymentPage'

function Page({ params }) {
    return (
      <PaymentPage userName = {params.userName}/>
    )
}

export default Page

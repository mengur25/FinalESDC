import { Radio } from '@mui/material'
import React from 'react'

const UserAddressCard = () => {
  return (
    <div className='p-5 border rounded-md flex'>
        <div>
<Radio checked={false} value="" name='radio-button'/>
        </div>
        <div className="space-y-3 pt-3">
            <h1>Nguyen</h1>
            <p className='w-[320px]'>
                19 Nguyen Huu Tho, Tan Hung, Ho Chi Minh City
            </p>
            <p><strong>Mobile: </strong>0896857093</p>
        </div>
    </div>
  )
}

export default UserAddressCard
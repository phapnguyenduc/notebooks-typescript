import React from 'react'
import { Alert, Space } from 'antd'
const Error = ({ data }) => (
  <Space direction='vertical' className='w-100'>
    {data?.map((message, k) => {
      return <Alert key={k} message={message} type="error" showIcon />
    })}
  </Space>
)
export default Error

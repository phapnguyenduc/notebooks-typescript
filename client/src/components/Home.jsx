import React, { useEffect, useState } from 'react'
import axios from '../config/axios-config'
import Error from '../message/Error'
import { useNavigate } from 'react-router-dom'
import { Alert, Button, Col, Form, Input, Row } from 'antd'
import routeConfig from '../config/route-config'
import apiUrlConfig from '../config/api-url-config'

const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo)
}

const Home = () => {
  const navigate = useNavigate()
  const [errorStatus, setErrorStatus] = useState(false)
  const [message, setMessage] = useState('')
  const onFinish = (values) => {
    if (!localStorage.getItem('token')) {
      axios
        .post(apiUrlConfig('user-add'), values)
        .then((res) => {
          localStorage.setItem('token', res.data.data.token)
          localStorage.setItem('username', res.data.data.username)
          navigate(routeConfig('notes'))
        })
        .catch((error) => {
          setMessage(error.response.data.message)
          setErrorStatus(true)
          setTimeout(() => {
            setErrorStatus(false)
          }, 5000)
        })
    }
    // navigate(routeConfig('notes'))
  }

  useEffect(() => {
    let auth = { token: localStorage.getItem('token') !== null }

    if (auth.token) {
      navigate(routeConfig('notes'))
    }
  }, [])

  return (
    <>
      <Row className='username-note'>
        <Col xs={24} lg={12} xl={10} span={10}>
          <Row>
            <Col span={24}>
              {errorStatus && <Error data={message} />}
            </Col>
          </Row>
          <Form layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete='off'>
            <Form.Item
              label='User name: '
              name='username'
              rules={[
                {
                  required: true,
                  message: 'Please input your username!'
                }
              ]}
            >
              <Input
                min={6}
                placeholder='Your name' />
            </Form.Item>
            <Form.Item
              label='Password: '
              name='password'
              rules={[
                {
                  required: true,
                  message: 'Please input your password at least 6 characters !'
                }
              ]}
            >
              <Input type='password'
                min={6}
                placeholder='Password' />
            </Form.Item>
            <Form.Item className='form-continue-btn'>
              <Button className='continue-btn' type='primary' htmlType='submit'>
                Login
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  )
}
export default Home

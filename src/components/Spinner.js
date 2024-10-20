import React, { Component } from 'react'
import loader from './loading.gif';

export default class Spinner extends Component {
  render() {
    return (
      <div className='text-center'>
        <img src={loader} alt="loading" />
      </div>
    )
  }
}

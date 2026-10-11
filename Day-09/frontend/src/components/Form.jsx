import React from 'react'
import { useState } from 'react'

const Form = () => {
  const[customers,setCustomers]= useState([])

  //post
  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData(e.target)

    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        body: formData
      })

      const data = await response.json()
      console.log(data)
     if (response.ok) {
    e.target.reset()
  }
    } catch (error) {
      console.log('Error:', error.message)
    }
  }


  //get
  const fetchUsers = async () => {
try {
const response = await fetch('/api/users')
const data = await response.json()

  setCustomers(data)
} catch (error) {
  console.log('Error:', error.message)
}

}
  return (
    <div className="container">
      <h1>Image Upload App</h1>
<p className="subtitle">Upload your image and manage customers</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          required
        />

        <br /><br />

        <input
          type="file"
          name="image"
          accept="image/*"
          required
        />

        <br /><br />

        <button type="submit">Submit</button>
      </form>
      <hr />
      <button onClick={fetchUsers}>Get Customers</button>

    <div className="customer-list">
      {customers.map((customer) => (
        <div className="customer-card" key={customer._id}>
          <h3>{customer.name}</h3>
          <img
            src={customer.image}
            alt={customer.name}
          />
        </div>
      ))}
    </div>
  </div>
  )
}
export default Form
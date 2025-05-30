import { Button } from '@mui/material'
import React, { useEffect, useState } from 'react'

const Darkmode = () => {
  const [theme , settheme] = useState('light')
  const changetheme =()=>{
    if(theme === 'light'){
      localStorage.setItem('theme', 'dark')
      document.body.style.backgroundColor= 'black'
      
      settheme('dark')
    }else{
       localStorage.setItem('theme', 'light')
      document.body.style.backgroundColor= 'white'
      settheme('light')
    }
  }
  useEffect(()=>{
    const savetheme =localStorage.getItem('theme') || 'light'
    settheme(savetheme)
    document.body.style.backgroundColor = savetheme === 'light' ? 'white':'black'
  })
  
  return (
    <div>
        <Button variant='contained' color="secondary" sx={{   textAlign: "center",backgroundColor :theme === 'light' ? 'black' :'white', color:theme === 'light' ? 'white' :'black', width: { xs: '100%', sm: 'auto' } }} onClick={changetheme}>{theme ==='light' ? 'Enable Dark Mode':"Enable Light Mode " 
          
          }</Button>
    </div>
  )
}

export default Darkmode
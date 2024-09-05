import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  server:{
    proxy:{
      '/api':{
        // target: 'http://127.0.0.1:8000', //if locally run then uncomment 
        target:'https://inquiry.bisjhintus.com/',
        changeOrigin:true,
       headers:{
        Accept:'application/json',
        'Content-Type':'application/json',
       }
      }
    }
  }
})

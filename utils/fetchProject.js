import axios from 'axios'

export const fetchStatus = async (name, type) => {
   try {
      const response = await axios.get(`https://${name}-${type}-rpc.itrocket.net:443/status`)
      return response.data.result
   } catch (err) {
      console.log(err)
   }
}

export const fetchNetInfo = async (name, type) => {
   try {
      const response = await axios.get(`https://${name}-${type}-rpc.itrocket.net:443/net_info`)
      return response.data.result
   } catch (err) {
      console.log(err)
   }
}

export const fetchSnap = async (name, type) => {
   try {
      const response = await fetch(`https://${type}-files.itrocket.net/${name}/.current_state.json`, { cache: 'no-store' })

      if (!response.ok) {
         throw new Error('Network response was not ok')
      }

      const data = await response.json()
      return data
   } catch (err) {
      console.log(err)
   }
}

export const fetchVersion = async (name, type) => {
   try {
      const response = await axios.get(`https://${name}-${type}-rpc.itrocket.net:443/abci_info`)
      return response.data.result.response
   } catch (err) {
      console.log(err)
   }
}

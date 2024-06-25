// Author: HuyHoangDev
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import { useEffect, useState } from 'react'
import axiosClient from '~/utils/authorizedAxios'
import { API_ROOT } from '~/utils/constants'


function Dashboard() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const res = await axiosClient.get(`${API_ROOT}/v1/dashboards/access`)
     
      if (!res?.data) {
        return;
      }

      setUser(res.data);
    }
    fetchData()
  }, [])

  if (!user) {
    return (
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        width: '100vw',
        height: '100vh'
      }}>
        <CircularProgress />
        <Typography>Loading dashboard user...</Typography>
      </Box>
    )
  }

  return (
    <Box sx={{
      maxWidth: '100%',
      marginTop: '1em',
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
      padding: '0 1em'
    }}>
      <Alert severity="info" sx={{ '.MuiAlert-message': { overflow: 'hidden' } }}>
        Đây là trang Dashboard sau khi user:&nbsp;
        <Typography variant="span" sx={{ fontWeight: 'bold', '&:hover': { color: '#fdba26' } }}>{user?.email}</Typography>
        &nbsp; đăng nhập thành công thì mới cho truy cập vào.
      </Alert>

      <Divider sx={{ my: 2 }} />
    </Box>
  )
}

export default Dashboard

// Author: HuyHoangDev
import { Card as MuiCard } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import CardActions from '@mui/material/CardActions'
import TextField from '@mui/material/TextField'
import Zoom from '@mui/material/Zoom'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import axiosClient from '~/utils/authorizedAxios'
import { API_ROOT } from '~/utils/constants'

function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const navigate = useNavigate();
  const submitLogIn = async (data) => {
    const res = await axiosClient.post(`${API_ROOT}/v1/users/login`, data)
    console.log('res',res);
    const {refreshToken, accessToken, userInfo} = res.data ?? {}
    console.log(res);
    localStorage.setItem('accessToken', accessToken)
    localStorage.setItem('refreshToken', refreshToken)
    localStorage.setItem('userInfo', JSON.stringify(userInfo))
    navigate('/dashboard');
  }

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      alignItems: 'center',
      justifyContent: 'flex-start',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      boxShadow: 'inset 0 0 0 2000px rgba(0, 0, 0, 0.4)'
    }}>
      <form onSubmit={handleSubmit(submitLogIn)}>
        <Zoom in={true} style={{ transitionDelay: '200ms' }}>
          <MuiCard sx={{ minWidth: 380, maxWidth: 380, marginTop: '6em', p: '0.5em 0', borderRadius: 2 }}>
            <Box sx={{ width: '70px', bgcolor: 'white', margin: '0 auto' }}>
              <h2>Login</h2>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: theme => theme.palette.grey[500] }}>
              <div>huyhoangtest@gmail</div>
              <div>Admin@12345</div>
            </Box>
            <Box sx={{ padding: '0 1em 1em 1em' }}>
              <Box sx={{ marginTop: '1.2em' }}>
                <TextField
                  autoFocus
                  fullWidth
                  label="Enter Email..."
                  type="text"
                  variant="outlined"
                  {...register('email')}
                />
              </Box>

              <Box sx={{ marginTop: '1em' }}>
                <TextField
                  fullWidth
                  label="Enter Password..."
                  type="password"
                  variant="outlined"
                  {...register('password')}
                />
              </Box>
            </Box>
            <CardActions sx={{ padding: '0.5em 1em 1em 1em' }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                fullWidth
              >
                Login
              </Button>
            </CardActions>
          </MuiCard>
        </Zoom>
      </form>
    </Box>
  )
}

export default Login

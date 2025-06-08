import { Box, Container, Grid, Stack } from '@mui/material';
import { Outlet } from 'react-router';
import useResponsive from 'src/hooks/useResponsive';

export const AuthLayout = () => {
  const isDesktop = useResponsive('up', 'lg');
  return (
    <Container maxWidth={'lg'} sx={{ height: '100vh' }}>
      <Grid container sx={{ height: '100%' }}>
        <Grid item xs={12} md={isDesktop ? 6 : 12}>
          <Stack alignItems={'center'} justifyContent={'center'} sx={{ height: '100%' }}>
            <Outlet />
          </Stack>
        </Grid>
        {isDesktop && (
          <Grid item xs={12} md={6}>
            <Stack alignItems={'center'} justifyContent={'center'} sx={{ height: '100%' }}>
              <Box
                component={'img'}
                src="/images/login-background.jpg"
                alt="login-background"
                sx={{
                  width: '100%',
                  maxWidth: '400px',
                  height: 'auto',
                  borderRadius: (theme) => theme.shape.borderRadius / 4,
                }}
              />
            </Stack>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

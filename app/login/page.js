'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Button, Container, Typography, Paper, Box } from '@mui/material';

export default function Login() {
    const supabase = createClientComponentClient()

    const handleSignIn = async () => {
        await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/callback`
            }
        });
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Container component='main' maxWidth='xs'>
                <Paper elevation={3} sx={{ padding: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '22vw' }}>
                    <Button
                        variant='contained'
                        color='primary'
                        size='large'
                        onClick={handleSignIn}
                        startIcon={<img src='/images/google.png' alt='Google Icon' style={{ height: 24, marginRight: 12 }} />}
                        sx={{ width: '20vw', backgroundColor: '#4285F4', '&:hover': { backgroundColor: '#3a74c1' } }}
                    >
                        Sign In with Google
                    </Button>
                </Paper>
            </Container>
        </Box>
    )
}
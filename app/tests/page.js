'use client'

import { Button, Container, TextField, Grid, Typography, Box, Modal, IconButton, Divider } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';

export default function Tests() {

  const [token, setToken] = useState('');
  const [url, setUrl] = useState('https://platform.ringcentral.com/team-messaging/v1/recent/chats?recordCount=30');
  const [res, setRes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const greatHall = 'url(https://media.architecturaldigest.com/photos/5b8eda82b1ac192deab84587/16:9/w_1920,c_limit/Harry%20Potter%20PBteen%20Boy%20Room%202.jpg)'
  const classroom = 'url(https://images.ctfassets.net/usf1vwtuqyxm/2woRzI2EqwUCSU0kI2IwkG/25131825604b69815b4b124bc432bba3/MoodysClassroom_WB_F4_AlastorMoodysClassroomEmpty_Promo_080615_Land.jpg?w=914&q=70&fm=webp)'

  useEffect(() => {
    const sendReq = async () => {
     
      const result = await axios.get(url, {
        headers: {
          authorization: `Bearer ${token}`
        }
      });
      setRes(result);
      return result;
    };


    if (isSubmitting && token && url) {
      sendReq();
    }

  }, [isSubmitting, token, url]);

  const handleSubmit = () => {
    setIsSubmitting(true)
  };

  console.log(url, token)

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

  const handleTokenChange = (e) => {
    setToken(e.target.value);
  };

  return (

    <Box sx={{ display: 'grid', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Typography variant='h2' align='center' sx={{ fontFamily: 'AlmendraSC' }}>
        Tests
      </Typography>
      <Container sx={{
        height: '85vh',
        width: '85vh',
      }}>
        <TextField onChange={handleUrlChange} />
        <TextField onChange={handleTokenChange} />
        <Button onClick={handleSubmit}>
          Submit
        </Button>
        <Box sx={{ display: 'flex', width: '90vw', border: 'solid', borderColor: 'lightgray', padding: '25px', marginTop: 2 }}>
          <pre>{JSON.stringify(res, null, 2)}</pre>
        </Box>
      </Container>

      <Link href='/' passHref>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            top: '20px',
            right: '20px',
            borderRadius: '50%',
            width: 104,
            height: 104,
            backgroundColor: 'white',
            boxShadow: 'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset'
          }}
        >
          <Image style={{ marginTop: '-5px' }} width={70} height={70} alt='sorting hat' src='/sortinghat.jpg' />
        </Box>
      </Link>
    </Box>
  );
}

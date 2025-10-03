'use client'

import { Button, Container, TextField, Grid, Typography, Box, Modal, IconButton, Divider } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Logs() {

  const greatHall = 'url(https://media.architecturaldigest.com/photos/5b8eda82b1ac192deab84587/16:9/w_1920,c_limit/Harry%20Potter%20PBteen%20Boy%20Room%202.jpg)'
  const classroom = 'url(https://images.ctfassets.net/usf1vwtuqyxm/2woRzI2EqwUCSU0kI2IwkG/25131825604b69815b4b124bc432bba3/MoodysClassroom_WB_F4_AlastorMoodysClassroomEmpty_Promo_080615_Land.jpg?w=914&q=70&fm=webp)'

  return (

    <Box sx={{ display: 'grid', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Typography variant='h2' align='center' sx={{ fontFamily: 'AlmendraSC' }}>
        Logs
      </Typography>
      <Container sx={{
        backgroundImage: classroom,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        height: '85vh',
        width: '85vh',
      }}>
        <iframe src="https://grafana.ps.ringcentral.com/d-solo/dfsfsdfsf/application-logs?orgId=1&var-environment=staging&var-lokisource=Loki+staging&var-repo=onondaga-county-call-recording&var-app=onondaga&var-set_app=onondaga-staging&var-name=onondaga&var-cluster_profile=psi-stagin-eks&var-namespace=onondaga&var-subdomain=staging-&var-simplequery=&from=1713382338935&to=1713385938935&panelId=4" width="450" height="200" frameBorder="0"></iframe>
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

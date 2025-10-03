'use client'

import { Button, Container, TextField, Grid, Typography, Box, Modal, IconButton } from '@mui/material';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import CloseIcon from '@mui/icons-material/Close';
import { useState, useEffect } from 'react';
import { useRouter, redirect } from 'next/navigation';
import Image from 'next/image';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [components, setComponents] = useState('');
  const [imports, setImports] = useState('');
  const [icons, setIcons] = useState('');
  const [hooks, setHooks] = useState('');
  const [house, setHouse] = useState('');
  const [sorted, setSorted] = useState();
  const [user, setUser] = useState();
  const [get, setGet] = useState(false);

  const supabase = createClientComponentClient();
  const router = useRouter();

  useEffect(() => {
    const sortHouse = (house) => {
      const result = {
        'Imports': imports.trim().replace(/\n/g, '|').split('|').sort((a, b) => b.length - a.length).join('<>').replace(/<>/g, '\n').replace(/"/g, "'"),
        'Icons': icons.trim().replace(/\n/g, ',').split(',').sort((a, b) => b.length - a.length).join().replace(/,/g, '\n').replace(/"/g, "'"),
        'Components': components.trim().replace(/\n/g, ',').split(',').sort((a, b) => b.length - a.length).join().replace(/,/g, '\n').replace(/"/g, "'"),
        'Hooks': hooks.trim().split(/\n+/).map((item) => { return item.trim().replace(/"/g, "'") }).sort((a, b) => b.length - a.length).join('\n')
      }
      return result[house];
    }
    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setUser(session)
    }
    if (get && house) {
      setSorted(sortHouse(house));
      setIsModalOpen(true);
      setComponents('');
      setImports('');
      setIcons('');
      setHooks('');
      setGet(false);
    }
    if (get) {
      getUser();
    }
    if (!user && get) {
      redirect('/unauthenticated')
    } else {
      setGet(false);
    }
  }, [get, isModalOpen, house, sorted, user])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.refresh()
  }

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSort = (e) => {
    const id = e.currentTarget.id;
    const hogwarts = {
      'Gryffindor': 'Imports',
      'Slytherin': 'Icons',
      'Hufflepuff': 'Components',
      'Ravenclaw': 'Hooks'
    }
    setHouse(hogwarts[id]);
    setGet(true)
  }

  const modalContent = (
    <Box
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 900,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
      }}
    >
      <IconButton
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
        }}
        onClick={closeModal}
      >
        <CloseIcon />
      </IconButton>
      <Box sx={{ display: 'flex' }}>
        <Image width={200} height={200} alt='sorting hat' src='/sortinghat.jpg' />
        <Typography variant='h4' sx={{ fontFamily: 'AlmendraSC', marginTop: '75px' }} gutterBottom>
          Your {house} have been sorted!
        </Typography >
      </Box>
      {house && sorted &&
        <Typography sx={{ whiteSpace: 'pre-line', fontFamily: 'monospace', color: 'green' }}>{sorted}</Typography>
      }
    </Box>
  );

  const greatHall = 'url(https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/hostedimages/1398089831i/9366155._SX540_.jpg)'

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '94vh',
      }}
    >
      <Typography variant='h2' align='center' sx={{ fontFamily: 'AlmendraSC', fontSize: { xs: '2rem', md: '3rem' } }}>
        Sorting Hat
      </Typography>

      <Container
        sx={{
          marginTop: '5vh',
          backgroundImage: greatHall,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          width: '86vw',
          height: '90vw',
          position: 'relative',
        }}
      >
        <Grid
          sx={{
            position: 'absolute',
            top: '2vw',
            left: '-15vw',
            width: '15vw',
            display: 'grid',
            justifyContent: 'center',
            textAlign: 'center',
          }}
          item xs={12} md={6}
        >
          <Typography variant='h4' sx={{ fontFamily: 'MedievalSharp' }}>Imports</Typography>
          <TextField
            disablezoom='true'
            autoComplete='off'
            sx={{ width: 'auto' }}
            style={{ width: '14vw' }}
            margin='normal'
            multiline={true}
            minRows={10}
            maxRows={10}
            size='medium'
            value={imports}
            onChange={(e) => setImports(e.target.value)}
          />
          <Button id='Gryffindor' sx={{ alignSelf: 'center', width: '4.5vw', marginLeft: '5vw' }}
            variant='contained'
            color='primary'
            onClick={handleSort}
          >
            Sort
          </Button>
        </Grid>

        <Grid
          sx={{
            position: 'absolute',
            top: '2vw',
            right: '-15vw',
            width: '15vw',
            display: 'grid',
            justifyContent: 'center',
            textAlign: 'center',
          }}
          item xs={12} md={6}
        >
          <Typography variant='h4' sx={{ fontFamily: 'MedievalSharp' }}>Icons</Typography>
          <TextField
            disablezoom='true'
            autoComplete='off'
            sx={{ width: 'auto' }}
            style={{ width: '14vw' }}
            margin='normal'
            multiline={true}
            minRows={10}
            maxRows={10}
            size='medium'
            value={icons}
            onChange={(e) => setIcons(e.target.value)}
          />
          <Button id='Slytherin' sx={{ alignSelf: 'center', width: '4.5vw', marginLeft: '5vw' }}
            variant='contained'
            color='primary'
            onClick={handleSort}
          >
            Sort
          </Button>
        </Grid>

        <Grid
          sx={{
            position: 'absolute',
            bottom: '0vw',
            left: '-15vw',
            width: '15vw',
            display: 'grid',
            justifyContent: 'center',
            textAlign: 'center',
          }}
          item xs={12} md={6}
        >
          <Typography variant='h4' sx={{ fontFamily: 'MedievalSharp' }}>Components</Typography>
          <TextField
            disablezoom='true'
            autoComplete='off'
            sx={{ width: 'auto' }}
            style={{ width: '14vw' }}
            margin='normal'
            multiline={true}
            minRows={10}
            maxRows={10}
            size='medium'
            value={components}
            onChange={(e) => setComponents(e.target.value)}
          />
          <Button id='Hufflepuff' sx={{ alignSelf: 'center', width: '4.5vw', marginLeft: '5vw' }}
            variant='contained'
            color='primary'
            onClick={handleSort}
          >
            Sort
          </Button>
        </Grid>

        <Grid
          sx={{
            position: 'absolute',
            bottom: '0vw',
            right: '-15vw',
            width: '15vw',
            display: 'grid',
            justifyContent: 'center',
            textAlign: 'center',
          }}
          item xs={12} md={6}
        >
          <Typography variant='h4' sx={{ fontFamily: 'MedievalSharp' }}>Hooks</Typography>
          <TextField
            disablezoom='true'
            autoComplete='off'
            sx={{ width: 'auto' }}
            style={{ width: '14vw' }}
            margin='normal'
            multiline={true}
            minRows={10}
            maxRows={10}
            size='medium'
            value={hooks}
            onChange={(e) => setHooks(e.target.value)}
          />
          <Button id='Ravenclaw' sx={{ alignSelf: 'center', width: '5vw', marginLeft: '5vw' }}
            variant='contained'
            color='primary'
            onClick={handleSort}
          >
            Sort
          </Button>
        </Grid>
      </Container>

      {isModalOpen &&
        <Modal open={isModalOpen} onClose={closeModal}>
          {modalContent}
        </Modal>
      }

      <Button href='/spells'
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          top: '0.25vh',
          right: '0.25vh',
          borderRadius: '50%',
          width: { xs: '104px', md: '150px' },
          height: { xs: '104px', md: '150px' },
        }}
      >
        <Image width={70} height={70} alt='spell book' src='/images/spellbook.png' />
      </Button>

      <Button onClick={handleSignOut}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          top: '0.25vh',
          left: '0.25vh',
          borderRadius: '50%',
          width: { xs: '104px', md: '150px' },
          height: { xs: '104px', md: '150px' },
        }}
      >
        <Image width={70} height={70} alt='keys' src='/images/lock.png' />
      </Button>
    </Box>
  );
}

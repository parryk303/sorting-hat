'use client'

import { Button, Container, TextField, Grid, Typography, Box, Modal, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [components, setComponents] = useState('');
  const [imports, setImports] = useState('');
  const [icons, setIcons] = useState('');
  const [hooks, setHooks] = useState('');
  const [house, setHouse] = useState('');
  const [sorted, setSorted] = useState();
  const [get, setGet] = useState(false);

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
    if (get && house) {
      setSorted(sortHouse(house));
      setIsModalOpen(true);
      setComponents('');
      setImports('');
      setIcons('');
      setHooks('');
      setGet(false);
    } else {
      setGet(false);
    }
  }, [get, isModalOpen, house, sorted])

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSort = (e) => {
    const id = e.currentTarget.id;
    const hogwarts = {
      'Gryffindor': 'Imports',
      'Slytherin': 'Icons',
      'Hufflepuff': 'components',
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
    <Box sx={{ display: 'grid', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Typography variant='h2' align='center' sx={{ fontFamily: 'AlmendraSC' }}>
        Sorting Hat
      </Typography>
      <Container sx={{
        backgroundImage: greatHall,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}>
        <Grid container spacing={3}>
          <Grid sx={{
            display: 'grid',
            position: 'relative',
            left: '-350px',
          }} item xs={12} md={6}>
            <Typography variant='h4' sx={{ fontFamily: 'MedievalSharp', marginLeft: '90px' }}>Imports</Typography>
            <TextField
              disableZoom 
              autoComplete='off'
              sx={{ width: 'auto' }}
              style={{ width: '300px' }}
              margin='normal'
              multiline={true}
              minRows={10}
              maxRows={10}
              size='medium'
              value={imports}
              onChange={(e) => setImports(e.target.value)}
            />
            <Button id='Gryffindor' sx={{
              position: 'relative',
              top: '7px',
              width: '70px',
              left: '120px'
            }}
              variant='contained'
              color='primary'
              onClick={handleSort}
            >
              Sort
            </Button>
          </Grid>
          <Grid sx={{
            display: 'grid',
            position: 'relative',
            right: '-600px',
          }} item xs={12} md={6}>
            <Typography variant='h4' sx={{ fontFamily: 'MedievalSharp', marginLeft: '110px' }}>Icons</Typography>
            <TextField
              disableZoom 
              autoComplete='off'
              sx={{ width: 'auto' }}
              style={{ width: '300px' }}
              margin='normal'
              multiline={true}
              minRows={10}
              maxRows={10}
              size='medium'
              value={icons}
              onChange={(e) => setIcons(e.target.value)}
            />
            <Button id='Slytherin'
              sx={{
                position: 'relative',
                top: '7px',
                width: '70px',
                left: '120px'
              }}
              variant='contained'
              color='primary'
              onClick={handleSort}
            >
              Sort
            </Button>
          </Grid>
          <Grid sx={{
            display: 'grid',
            position: 'relative',
            left: '-350px',
          }} item xs={12} md={6}>
            <Typography variant='h4' sx={{ fontFamily: 'MedievalSharp', marginLeft: '55px' }}>Components</Typography>
            <TextField
              disableZoom 
              autoComplete='off'
              sx={{ width: 'auto' }}
              style={{ width: '300px' }}
              margin='normal'
              multiline={true}
              minRows={10}
              maxRows={10}
              size='medium'
              value={components}
              onChange={(e) => setComponents(e.target.value)}
            />
            <Button id='Hufflepuff'
              sx={{
                position: 'relative',
                top: '7px',
                width: '70px',
                left: '120px'
              }}
              variant='contained'
              color='primary'
              onClick={handleSort}
            >
              Sort
            </Button>
          </Grid>
          <Grid sx={{
            display: 'grid',
            position: 'relative',
            right: '-600px',
          }} item xs={12} md={6}>
            <Typography variant='h4' sx={{ fontFamily: 'MedievalSharp', marginLeft: '110px' }}>Hooks</Typography>
            <TextField
              disableZoom 
              autoComplete='off'
              sx={{ width: 'auto' }}
              style={{ width: '300px' }}
              margin='normal'
              multiline={true}
              minRows={10}
              maxRows={10}
              size='medium'
              value={hooks}
              onChange={(e) => setHooks(e.target.value)}
            />
            <Button id='Ravenclaw'
              sx={{
                position: 'relative',
                top: '7px',
                width: '70px',
                left: '120px',

              }}
              variant='contained'
              color='primary'
              onClick={handleSort}
            >
              Sort
            </Button>
          </Grid>
        </Grid>
      </Container>
      {isModalOpen &&
        <Modal open={isModalOpen} onClose={closeModal}>
          {modalContent}
        </Modal>
      }
    </Box>
  );
}

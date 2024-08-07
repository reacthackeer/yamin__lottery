import { HamburgerIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerOverlay,
  Image,
  Img,
  useDisclosure
} from '@chakra-ui/react';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function DrawerExample() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()
  const navigate = useNavigate();
  return (
    <>
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        padding={'10px'}
        bgGradient="linear(to-r, teal.500, green.500)"
      >
        <Img 
          width={'200px'} 
          src='/logo.png' 
          alt='global lottery logo'
          onClick={()=> navigate('/')}
        />
        <Button
          onClick={()=> onOpen()}
        ><HamburgerIcon/></Button>
      </Box>
      <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <Image src='/logo.png' alt='logo'/>

          <DrawerBody className='main__menu__container'>  
            <Link className='link__item' to='/'>Home</Link>
            <Link className='link__item' to='/prize'>Prizes</Link>
            <Link className='link__item' to='/winner'>Winner</Link>
            <Link className='link__item' to='/login'>Login</Link>
            <Link className='link__item' to='/signup'>Signup</Link>
            <Link className='link__item' to='/prize'>Prizes</Link>
            <Link className='link__item' to='/how-to-play'>How To Play</Link>
            <Link className='link__item' to='/contact-us'>Contact US</Link>
            <Link className='link__item' to='/about-us'>About US</Link>
          </DrawerBody>

          <DrawerFooter>
            <Button variant='outline' mr={3} onClick={onClose}>
              Close
            </Button> 
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default DrawerExample;
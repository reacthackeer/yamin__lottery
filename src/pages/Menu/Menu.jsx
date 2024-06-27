// src/components/ResponsiveMenu.jsx
import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons';
import { Box, Flex, IconButton, useDisclosure } from '@chakra-ui/react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // or your preferred routing library
import '../../style/ResponsiveMenu.scss';

const menuItems = [
  'Home',
  'About Us',
  'Games',
  'Results',
  'Winning Numbers',
  'How to Play',
  'Promotions',
  'FAQs',
  'Contact Us'
];

const ResponsiveMenu = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <Box as="nav" className="menu-container">
      <Flex className="desktop-menu" display={{ base: 'none', md: 'flex' }}>
        {menuItems.map((item, index) => (
          <Link
            key={index}
            to={`/${item.replace(/\s+/g, '').toLowerCase()}`}
            className={`menu-item ${hoveredIndex === index ? 'hovered' : ''}`}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {item}
          </Link>
        ))}
      </Flex>
      <Flex className="mobile-menu" display={{ base: 'flex', md: 'none' }}>
        <IconButton
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label="Open Menu"
          onClick={isOpen ? onClose : onOpen}
        />
        {isOpen && (
          <Flex direction="column" className="mobile-menu-items">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                to={`/${item.replace(/\s+/g, '').toLowerCase()}`}
                className="menu-item"
                onClick={onClose}
              >
                {item}
              </Link>
            ))}
          </Flex>
        )}
      </Flex>
    </Box>
  );
};

export default ResponsiveMenu;

import {
  Box,
  Button,
  Flex,
  Image,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Stack,
  Text
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { winnerDatabase } from '../database/prizeDatabase';
import '../style/WinnerPage.scss';
  
  const WinnerPage = () => {
    const [selectedWinner, setSelectedWinner] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
  
    const openModal = (winner) => {
      setSelectedWinner(winner);
      setIsModalOpen(true);
    };
  
    const closeModal = () => {
      setSelectedWinner(null);
      setIsModalOpen(false);
    };
  
    const handleDateChange = (event) => {
      const date = event.target.value;
      setSelectedDate(date);
    };
  
    const filteredWinners = selectedDate
      ? winnerDatabase.filter((winner) => winner.winningDate === selectedDate)
      : winnerDatabase;
  
    const sortedWinners = filteredWinners.slice().sort((a, b) => b.prize.price - a.prize.price);
  
    return (
      <Box className='page__default__style'>

        <Box
          className='top__heading'
        >
          <Text fontSize="3xl" fontWeight="bold" mb={4}>
            {selectedDate ? `Winners List as on ${selectedDate}` : 'Winners list'}
          </Text>
        </Box>
        <Box className='prize__table'>
        {/* Filter Section */}
        <Flex justify="space-between" align="center" mb={4}>
          <Select
            placeholder="Select Date"
            onChange={handleDateChange}
            value={selectedDate}
          >
            {Array.from(
              new Set(winnerDatabase.map((winner) => winner.winningDate))
            ).map((date) => (
              <option key={date} value={date}>
                {date}
              </option>
            ))}
          </Select> 
        </Flex>

        <Box className='item__view__area'>
        {sortedWinners.map((winner) => (
          <Box
            key={winner.id}
            onClick={() => openModal(winner)}
            cursor="pointer"
            p={4}
            borderWidth="1px"
            borderRadius="lg"
            textAlign="center"
            maxW={'300px'}
          >
            <Image
              borderRadius="lg"
              boxSize="200px"
              src={winner.prize.img}
              alt="Prize"
              mb={4}
            />
            <Text fontSize="lg" fontWeight="semibold" mb={2}>
              {winner.prize.name}
            </Text>
            <Image
              borderRadius="full"
              boxSize="50px"
              src={'/person/person.png'}
              alt="Winner"
              mb={2}
              mx="auto"
            />
            <Text fontSize="md" color="gray.500" mb={2}>
              {winner.winnerName}
            </Text>
            <Text fontSize="sm" color="gray.400">
              Winning Day: {winner.winningDate}
            </Text>
          </Box>
        ))}
        </Box>
        </Box>
              
  
        {/* Winner Details Modal */}
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Winner Details</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Flex direction="column" align="center">
                <Image
                  borderRadius="full"
                  boxSize="150px"
                  src={'/person/person.png'}
                  alt="Winner"
                  mb={4}
                />
                <Text fontSize="lg" fontWeight="semibold" mb={2}>
                  {selectedWinner?.winnerName}
                </Text>
                <Stack mt={4} spacing={2} align="start">
                  <Text>Lottery Number: {selectedWinner?.lotteryNumber}</Text>
                  <Text>
                    Address: {selectedWinner?.winnerAddress.village},{' '}
                    {selectedWinner?.winnerAddress.union},{' '}
                    {selectedWinner?.winnerAddress.district},{' '}
                    {selectedWinner?.winnerAddress.country}
                  </Text>
                  <Text>
                    Prize:{' '}
                    <Link href={selectedWinner?.prize.link} isExternal>
                      {selectedWinner?.prize.name}
                    </Link>
                  </Text>
                  <Text>Prize Price: {selectedWinner?.prize.price} BDT</Text>
                  <Text>Winning Date: {selectedWinner?.winningDate}</Text>
                </Stack>
              </Flex>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" onClick={closeModal}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    );
  };
  
  export default WinnerPage;
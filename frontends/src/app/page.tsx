"use client"
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import { ChakraProvider } from '@chakra-ui/react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure
} from '@chakra-ui/react'

export default function App() {
  // 2. Wrap ChakraProvider at the root of your app
  return (
    <ChakraProvider>
      <Calendar />
    </ChakraProvider>
  )
}

function ManualClose() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleClick = () => {
    fetch(" http://127.0.0.1:8000").then((res) => {
      res.json().then((data) => {
        console.log(data)
      });
    });
    };
  return (
    <>
      <Button onClick={onOpen}>
       Open Modal

      </Button>
      <Button onClick={handleClick}>
        CONNECTED_TEST
      </Button>

      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create your account</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>

          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

function Calendar() {
  return (
    <div>
      <ManualClose/>
      <FullCalendar
        plugins={[ dayGridPlugin ]}
        initialView="dayGridWeek"
        weekends={false}
        events={[
          { title: 'event 1', date: '2024-03-015' },
          { title: 'event 2', date: '2024-03-16' }
        ]}
      />
    </div>
  )
}



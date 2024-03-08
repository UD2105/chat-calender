"use client"
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import { ChakraProvider } from '@chakra-ui/react'
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form"
import { sliceEvents, createPlugin } from '@fullcalendar/core';

type Inputs = {
  title: string
  date: string
  description: string
}

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Input,
  Box,
  Text,
  Center,
  Stack, 
  HStack, 
  VStack,
  Textarea,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Flex,
  Heading,
  Spacer,
} from '@chakra-ui/react'

export default function App() {
  
  return (
    <ChakraProvider>
    
      <Calendar />
    
    </ChakraProvider>
  )
}

function AddEventDialog() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { register,handleSubmit,watch,formState: { errors }} = useForm<Inputs>()
  const formData = new FormData();
  const onSubmit: SubmitHandler<Inputs> = (data) => [fetch('http://127.0.0.1:8000/users/1/events/', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
  })]
  

  const handleClick = () => {
    fetch(" http://127.0.0.1:8000").then((res) => {
      res.json().then((data) => {
        console.log(data)
      });
    });
    };
  return (
    <>
      <Flex pb = "2" minWidth='max-content' alignItems='center' gap='2'>
        <Box p = "2">
          <Heading size='md'>Chalender</Heading>
        </Box>
          <Spacer />
          <Button colorScheme='blue' onClick={onOpen}>
            イベントを追加する
          </Button>
      </Flex>
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <form onSubmit={handleSubmit(onSubmit)}>
        <ModalContent>
          <ModalHeader>
            <Center>
              <Box w ="80%">
                <Input placeholder='イベントタイトル' {...register("title", { required: true })}  />
              </Box>
            </Center>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
          <VStack>
            <Input
                placeholder="Select Date and Time"
                size="md"
                type="datetime-local"
                {...register("date", { required: true })}
              />
              <Textarea placeholder='Here is a sample placeholder' {...register("description", { required: true })}/>
              {errors.description && <span>This field is required</span>}
          </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} type = "submit">
              Add events
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
        </form>
      </Modal>
    </>
  )
}

function Calendar() {
  const [events, setEvents] = useState([]);
  const [eventdetail, setEventDetail] = useState(undefined);
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { register,handleSubmit,watch,formState: { errors }} = useForm<Inputs>()
  const date3 = new Date(eventInfo.event.startStr);
  const onSubmit: SubmitHandler<Inputs> = (data) => [fetch('http://127.0.0.1:8000/users/1/events/', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
  })]
  const handleFetch = async () => {
    const response = await fetch('http://127.0.0.1:8000/events/user/1/', {
      headers: {
        "Content-Type": "application/json",
      },
    }
    )
    const data = await response.json()
    console.log(data)
    setEvents(data);
  }

  useEffect(() => {
    handleFetch();
  }, []);


  const handleOpen = async (eventId) => {
    const response = await fetch(`http://127.0.0.1:8000/events/${eventId}/`, {
      headers: {
        "Content-Type": "application/json",
      },
    }
    )
    const data = await response.json()
    console.log(data)
    setEventDetail(data)
    onOpen()
  }

  return (
    <Box p = "2">
      <AddEventDialog/>
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <form onSubmit={handleSubmit(onSubmit)}>
        <ModalContent>
          <ModalHeader>
            <Center>
              <Box w ="80%">
              <Text fontSize='5xl'>{eventdetail ? eventdetail['title']: " " }</Text>
              </Box>
            </Center>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
          <VStack>
            <Text fontSize='3xl'>{eventdetail ? eventdetail['date']: " " }</Text>
            <Text fontSize='3xl'>{eventdetail ? eventdetail['description']: " " }</Text>

          </VStack>

          </ModalBody>

          <ModalFooter>

          </ModalFooter>
        </ModalContent>
        </form>
      </Modal>
      <FullCalendar
        plugins={[ dayGridPlugin]}
        eventContent={generateRenderEventContent(handleOpen)}
        initialView="dayGridMonth"
        weekends={false}
        events={events} 
        headerToolbar={{left:'dayGridMonth,dayGridWeek', center:"title"}}
      />
    </Box>
  )
}

function formatData(data){
  let hours = data.getHours();
  let minutes = data.getMonth();
  const ampm = hours >= 12 ? '午前' : '午後'
  hours = hours % 12;
  hours =hours ? hours : 12
  const strTime = minutes == 0 ? ampm + hours + '時' : ampm + hours + '時' + minutes + '分'
  return strTime
}

function generateRenderEventContent(handleOpen){
  function renderEventContent(eventInfo) {
    const date2 = new Date(eventInfo.event.startStr);
    return(
      <>
        <Center w = "100%">
        <Button colorScheme='blue' onClick ={ () => handleOpen(eventInfo.event.id) }>
            <i>{formatData(date2)}</i>
        </Button>
        </Center>

      </>
    )
  }

  return renderEventContent
}

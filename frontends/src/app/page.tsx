"use client"
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import { ChakraProvider } from '@chakra-ui/react'
import { useForm, SubmitHandler } from "react-hook-form"

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
      <Button onClick={onOpen}>
       Open Modal

      </Button>
      <Button onClick={handleClick}>
        CONNECTED_TEST
      </Button>

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

  return (
    <div>
      <AddEventDialog/>
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



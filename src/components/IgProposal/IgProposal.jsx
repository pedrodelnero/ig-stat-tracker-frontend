import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { CSVLink } from 'react-csv';
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Box,
  Checkbox,
  Text,
  Button,
  Editable,
  EditableInput,
  EditablePreview,
  Input,
  InputGroup,
  InputLeftElement,
  NumberInput,
  NumberInputField,
  Flex,
  Table,
  Thead,
  Tbody,
  Th,
  Tr,
  Td,
} from '@chakra-ui/react';
import { AtSignIcon } from '@chakra-ui/icons';

const initialState = { id: 0, igHandle: '', igPosts: 0, igChecked: false };

const headers = [
  { label: 'IG handle', key: 'handle' },
  { label: '# of Followers', key: 'followers' },
  { label: '# of Posts', key: 'posts' },
  { label: 'Avg # of Likes per Post', key: 'likes' },
];

const IgProposal = () => {
  const [igUser, setIgUser] = useState(initialState);
  const [listOfHandles, setListOfHandles] = useState([]);
  // const [results, setResults] = useState([]);
  const [csvData, setCsvData] = useState([]);
  const [error, setError] = useState(null);
  const csvLinkEl = useRef();

  const addHandleToList = (e) => {
    e.preventDefault();
    setListOfHandles((oldArr) => [
      ...oldArr,
      {
        id: uuidv4(),
        handle: igUser.igHandle,
        posts: igUser.igPosts,
        checked: igUser.igChecked,
      },
    ]);
    setIgUser(initialState);
  };

  const handleOnCheck = (e) => {
    e.preventDefault();
    const { id } = e.target;

    let newArr = listOfHandles.map((item) => {
      if (item.id === id) {
        item.checked = !item.checked;
      }
      return item;
    });
    setListOfHandles(newArr);
  };

  const handleChangeHandle = (e) => {
    const { value, id } = e.target;

    let newArr = listOfHandles.map((item) => {
      if (item.id === id) {
        console.log('id', item.id, ' | ', id);
        item.handle = value;
      }
      return item;
    });
    setListOfHandles(newArr);
  };

  const handleNumOfPosts = (e) => {
    const { name, value } = e.target;

    let newArr = listOfHandles.map((item) => {
      if (item.handle === name) {
        item.posts = value;
      }
      return item;
    });
    setListOfHandles(newArr);
  };

  const showSelected = async () => {
    let selectedHandles = listOfHandles.filter((item) => item.checked);
    try {
      const { data } = await axios.post('http://localhost:5000/ig-proposal', {
        selectedHandles,
      });
      if (data.message.includes('undefined')) {
        setError({
          title: 'Incorrect IG handle(s)',
          description: 'Make sure all IG handles are correct',
        });
      } else {
        console.log('data', data);
        // setCsvData(data);
        // csvLinkEl.current.link.click();
      }
    } catch (err) {
      console.log(`Error1: ${err}`);
    }
  };
  useEffect(() => {
    console.log('error');
  }, [error]);

  return (
    <Box mx={8}>
      <Text fontSize="2xl" mb={3}>
        Add IG handle
      </Text>
      <Box w="500px" mb={4}>
        <form onSubmit={addHandleToList}>
          <Flex direction="row">
            <InputGroup w="">
              <InputLeftElement
                pointerEvents="none"
                children={<AtSignIcon color="gray.800" />}
              />

              <Input
                required
                variant="filled"
                size="md"
                type="text"
                name="igHandle"
                placeholder="IG handle"
                value={igUser.igHandle}
                onChange={(e) =>
                  setIgUser({ ...igUser, [e.target.name]: e.target.value })
                }
                style={{ marginRight: '10px' }}
              />
            </InputGroup>
            <Button variant="solid" type="submit">
              Add
            </Button>
          </Flex>
        </form>
      </Box>
      {listOfHandles.length > 0 && (
        <>
          {error && (
            <Alert status="error">
              <AlertIcon />
              <AlertTitle mr={2}>{error.title}</AlertTitle>
              <AlertDescription>{error.description}</AlertDescription>
              {/* <CloseButton position="absolute" right="8px" top="8px" /> */}
            </Alert>
          )}
          <Table mb={4}>
            <Thead>
              <Tr>
                <Th>-</Th>
                <Th>IG user</Th>
                <Th>Posts</Th>
              </Tr>
            </Thead>
            <Tbody>
              {listOfHandles.map((listItem) => (
                <Tr key={listItem.id}>
                  <Td>
                    <Checkbox
                      id={listItem.id}
                      checked={listItem.checked}
                      onChange={handleOnCheck}
                      size="lg"
                    />
                  </Td>
                  <Td>
                    <Editable defaultValue={listItem.handle}>
                      <EditablePreview />
                      <EditableInput
                        px={2}
                        id={listItem.id}
                        value={listItem.handle}
                        onChange={handleChangeHandle}
                      />
                    </Editable>
                  </Td>
                  <Td>
                    <NumberInput w="50px">
                      <NumberInputField
                        // placeholder="Num of posts"
                        // id={listItem.id}
                        name={listItem.handle}
                        value={listItem.posts}
                        onChange={handleNumOfPosts}
                      />
                    </NumberInput>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
          <Button variant="outline" onClick={showSelected}>
            Download CSV
          </Button>
          <CSVLink
            headers={headers}
            filename="Proposal.csv"
            data={csvData}
            target="_blank"
            ref={csvLinkEl}
          />
        </>
      )}
    </Box>
  );
};

export default IgProposal;

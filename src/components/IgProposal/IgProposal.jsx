import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Flex,
  Text,
} from '@chakra-ui/react';
import { AtSignIcon } from '@chakra-ui/icons';

import IgTable from './IgTable/IgTable';

const initialState = {
  id: 0,
  igHandle: '',
  igPosts: 0,
  isChecked: false,
};

const IgProposal = () => {
  const [igUser, setIgUser] = useState(initialState);
  const [listOfHandles, setListOfHandles] = useState([]);

  const addHandleToList = (e) => {
    e.preventDefault();
    setListOfHandles((oldArr) => [
      ...oldArr,
      {
        id: uuidv4(),
        handle: igUser.igHandle,
        posts: igUser.igPosts,
        checked: igUser.isChecked,
      },
    ]);
    setIgUser(initialState);
  };

  return (
    <Box mx={8} p={5} bg="" w="100%">
      <Text fontSize="2xl" mb={3}>
        Add IG handle
      </Text>
      <Box w="500px" mb={4}>
        <form onSubmit={addHandleToList}>
          <Flex direction="row">
            <InputGroup w="">
              <InputLeftElement
                pointerEvents="none"
                children={<AtSignIcon />}
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
        <IgTable list={listOfHandles} setList={setListOfHandles} />
      )}
    </Box>
  );
};

export default IgProposal;

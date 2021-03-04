import React, { useCallback, useEffect, useState } from 'react';
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
import { createHandle, getHandles } from '../../actions/ighandles';
import Error from '../Error/Error';

const initialState = {
  igHandle: '',
  igPosts: 0,
  isChecked: false,
};

const IgProposal = () => {
  const [error, setError] = useState(null);
  const [igUser, setIgUser] = useState(initialState);
  const [listOfHandles, setListOfHandles] = useState([]);

  const addHandleToList = async (e) => {
    e.preventDefault();
    const data = await createHandle(igUser);

    if (!data.success) {
      console.log({ title: data.message });
      setError({ title: data.message });
    } else {
      setListOfHandles((oldArr) => [
        ...oldArr,
        {
          id: data.id,
          handle: igUser.igHandle,
          posts: igUser.igPosts,
          checked: igUser.isChecked,
        },
      ]);
      setIgUser(initialState);
    }
  };

  const loadIgList = useCallback(async () => {
    try {
      const { data } = await getHandles();
      let newList = data.map((dataItem) => ({
        id: dataItem.id,
        handle: dataItem.handle,
        posts: 0,
        checked: false,
      }));
      setListOfHandles(newList);
    } catch (err) {
      console.log(`Err load list: ${err}`);
    }
  }, []);

  useEffect(() => {
    loadIgList();
  }, [loadIgList]);

  return (
    <Box mx={8} p={5} bg="" w="100%">
      {error && <Error error={error} />}
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
        <IgTable
          list={listOfHandles}
          setList={setListOfHandles}
          loadList={loadIgList}
        />
      )}
    </Box>
  );
};

export default IgProposal;

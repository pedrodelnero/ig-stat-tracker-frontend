import React, { useRef, useState } from 'react';
import axios from 'axios';
import { CSVLink } from 'react-csv';
import {
  Box,
  Text,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Flex,
} from '@chakra-ui/react';
import { AtSignIcon } from '@chakra-ui/icons';

const headers = [
  { label: 'IG handle', key: 'handle' },
  { label: '# of Followers', key: 'followers' },
  { label: '# of Posts', key: 'posts' },
  { label: 'Avg # of Likes per Post', key: 'likes' },
];

const IgProposal = () => {
  const initialState = { igHandle: '', igPosts: 0, igChecked: false };
  const [igUser, setIgUser] = useState(initialState);
  const [listOfHandles, setListOfHandles] = useState([]);
  // const [results, setResults] = useState([]);
  const [csvData, setCsvData] = useState([]);
  const csvLinkEl = useRef();

  const addHandleToList = (e) => {
    e.preventDefault();
    setListOfHandles((oldArr) => [
      ...oldArr,
      {
        handle: igUser.igHandle,
        posts: igUser.igPosts,
        checked: igUser.igChecked,
      },
    ]);
    setIgUser(initialState);
  };

  const handleOnCheck = (e) => {
    e.preventDefault();
    const { name } = e.target;

    let newArr = listOfHandles.map((item) => {
      if (item.handle === name) {
        item.checked = !item.checked;
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
    // console.log('selected', selectedHandles)
    const { data } = await axios.post('http://localhost:5000/ig-proposal', {
      selectedHandles,
    });
    console.log('data', data);
    setCsvData(data);
    csvLinkEl.current.link.click();
  };

  return (
    <Box mx={8}>
      <Text fontSize="2xl" mb={3}>
        Add IG handle
      </Text>
      <Box w="500px">
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
              {/* <Button variant="solid" type="button" onClick={addHandleToList}> */}
              Add
            </Button>
          </Flex>
        </form>
      </Box>
      {listOfHandles.length > 0 && (
        <>
          <ul>
            {listOfHandles.map((listItem, ind) => (
              <li
                key={ind}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  border: '1px solid red',
                }}
              >
                <input
                  type="checkbox"
                  name={listItem.handle}
                  checked={listItem.checked}
                  onChange={handleOnCheck}
                  style={{ marginRight: '10px' }}
                />
                <p
                  style={{
                    border: '1px dashed blue',
                    margin: '10px',
                    width: '140px',
                  }}
                >
                  {listItem.handle}
                </p>
                <input
                  type="number"
                  name={listItem.handle}
                  placeholder="Num of posts"
                  value={listItem.posts}
                  onChange={handleNumOfPosts}
                  style={{ marginLeft: '10px' }}
                />
              </li>
            ))}
          </ul>
          <button onClick={showSelected}>Upload</button>
          <CSVLink
            headers={headers}
            filename="Proposal.csv"
            data={csvData}
            target="_blank"
            ref={csvLinkEl}
          />
        </>
      )}
      {/* {(results.length > 0) && (
        results.map((item, ind) => (
          <div key={ind} style={{marginLeft: "50px"}}>
            <h1>Stats</h1>
            <div>
              <h4>Handle:</h4>
              <p>{item.username}</p>
            </div>
            <div>
              <h4>Followers:</h4>
              <p>{item.followers}</p>
            </div>
            <div>
              <h4>Avg Likes:</h4>
              <p>{item.likes}</p>
            </div>
          </div>

        ))
      )} */}
    </Box>
  );
};

export default IgProposal;

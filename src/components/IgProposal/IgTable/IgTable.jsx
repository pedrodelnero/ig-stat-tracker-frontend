import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { CSVLink } from 'react-csv';
import {
  Checkbox,
  Button,
  Editable,
  EditableInput,
  EditablePreview,
  NumberInput,
  NumberInputField,
  Table,
  Thead,
  Tbody,
  Th,
  Tr,
  Td,
} from '@chakra-ui/react';

import Error from '../../Error/Error';

const headers = [
  { label: 'IG handle', key: 'handle' },
  { label: '# of Followers', key: 'followers' },
  { label: '# of Posts', key: 'posts' },
  { label: 'Avg # of Likes per Post', key: 'likes' },
  { label: 'Engagement Rate', key: 'engRate' },
];

const IgTable = ({ list, setList }) => {
  const [error, setError] = useState(null);
  const [csvData, setCsvData] = useState([]);
  const csvLinkEl = useRef();

  const handleChange = (e) => {
    const { id, name, value } = e.target;

    if (value && id) {
      let newArr = list.map((item) => {
        if (item.id === id) {
          item.handle = value;
        }
        return item;
      });
      setList(newArr);
    } else if (id) {
      e.preventDefault();
      let newArr = list.map((item) => {
        if (item.id === id) {
          item.checked = !item.checked;
        }
        return item;
      });
      setList(newArr);
    } else {
      let newArr = list.map((item) => {
        if (item.handle === name) {
          item.posts = +value;
        }
        return item;
      });
      setList(newArr);
    }
  };

  const getData = async () => {
    let selectedHandles = list.filter((item) => item.checked);
    try {
      const { data } = await axios.post('http://localhost:5000/ig-proposal', {
        selectedHandles,
      });

      setCsvData(data);
      csvLinkEl.current.link.click();
    } catch (err) {
      console.log(`Error1: ${err}`);
      if (err.response.data.message.includes('undefined')) {
        setError({
          title: 'Incorrect IG handle(s)',
          description: 'Make sure all IG handles are correct',
        });
      } else if (
        err.response.data.message.toLowerCase().includes('no handles selected')
      ) {
        setError({
          title: 'No user(s) selected',
          description: 'Make sure to select at least 1 user',
        });
      } else if (
        err.response.data.message.toLowerCase().includes('0 posts selected')
      ) {
        setError({
          title: 'User(s) selected with 0 posts',
          description:
            'Make sure num of posts of selected user(s) is at least 1',
        });
      }
    }
  };

  useEffect(() => {
    setError(null);
  }, [list]);

  return (
    <>
      {error && <Error error={error} />}
      <Table mb={4}>
        <Thead>
          <Tr>
            <Th>-</Th>
            <Th>IG user</Th>
            <Th>Posts</Th>
          </Tr>
        </Thead>
        <Tbody>
          {list.map((listItem) => (
            <Tr key={listItem.id}>
              <Td>
                <Checkbox
                  id={listItem.id}
                  checked={listItem.checked}
                  onChange={handleChange}
                  size="lg"
                />
              </Td>
              <Td>
                <Editable w="200px" defaultValue={listItem.handle}>
                  <EditablePreview />
                  <EditableInput
                    px={2}
                    id={listItem.id}
                    value={listItem.handle}
                    onChange={handleChange}
                  />
                </Editable>
              </Td>
              <Td>
                <NumberInput w="45px">
                  <NumberInputField
                    name={listItem.handle}
                    value={listItem.posts}
                    onChange={handleChange}
                  />
                </NumberInput>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Button variant="outline" onClick={getData}>
        Download Data
      </Button>
      <CSVLink
        headers={headers}
        filename="IG-data.csv"
        data={csvData}
        target="_blank"
        ref={csvLinkEl}
      />
    </>
  );
};

export default IgTable;

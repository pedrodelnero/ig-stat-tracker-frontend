import React from 'react';
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';

const Error = ({ error }) => {
  console.log(`Error comp: ${error.title}`);
  return (
    <Alert status="error">
      <AlertIcon />
      <AlertTitle mr={2}>{error.title}</AlertTitle>
      {error.description && (
        <AlertDescription>{error.description}</AlertDescription>
      )}
    </Alert>
  );
};

export default Error;

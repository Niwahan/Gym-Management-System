import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Typography } from '@mui/material';

export default function LoginRequired() {
  return (
    <div style={{ textAlign: 'center', paddingTop: 100 }}>
      <Typography variant="h1" gutterBottom>
        You need to login
      </Typography>
      <Typography variant="body1" gutterBottom>
        You need to be logged in to access this page.
      </Typography>
      <Button component={Link} to="/" variant="contained" color="primary">
        Login
      </Button>
    </div>
  );
}
import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Typography } from '@mui/material';

export default function Unauthorized() {
  return (
    <div style={{ textAlign: 'center', paddingTop: 100 }}>
      <Typography variant="h1" gutterBottom>
        401 - Unauthorized
      </Typography>
      <Typography variant="body1" gutterBottom>
        You are not authorized to access this page.
      </Typography>
      <Button component={Link} to="/" variant="contained" color="primary">
        Go back to the homepage
      </Button>
    </div>
  );
}
import React from 'react';
import { Grid } from '@mui/material';
import TraderCard from './TraderCard';

const TopTraders = ({ topTraders }) => (
  <Grid container spacing={2} justifyContent="center">
    {topTraders.map((trader, index) => (
      <Grid item xs={12} sm={4} key={trader.Name}>
        {/* Pass rank as a prop to TraderCard */}
        <TraderCard trader={trader} rank={index + 1} />
      </Grid>
    ))}
  </Grid>
);

export default TopTraders;

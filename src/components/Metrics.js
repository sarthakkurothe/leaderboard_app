import React from 'react';
import { Grid, Paper, Typography } from '@mui/material';

const Metrics = ({ metrics }) => (
  <Grid container spacing={2} justifyContent="center">
    {metrics.map((metric, idx) => (
      <Grid item xs={6} sm={3} key={idx}>
        <Paper elevation={3} sx={{ padding: '16px', textAlign: 'center' }}>
          <Typography variant="h6">{metric.label}</Typography>
          <Typography variant="h4">{metric.value}</Typography>
          <Typography color="textSecondary">{metric.score}</Typography>
        </Paper>
      </Grid>
    ))}
  </Grid>
);

export default Metrics;

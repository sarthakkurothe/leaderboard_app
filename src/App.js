import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Paper, Avatar } from '@mui/material';
import TopTraders from './components/TopTraders';
import LeaderboardTable from './components/LeaderboardTable';
import { fetchTradersData } from './services/api';
import BoltIcon from '@mui/icons-material/Bolt';
import PersonIcon from '@mui/icons-material/Person';
import StackedLineChartIcon from '@mui/icons-material/StackedLineChart';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

const iconMapping = {
  'Most Tips Given': <BoltIcon fontSize="large" style={{ color: '#28a745' }} />,
  'Most Active': <PersonIcon fontSize="large" style={{ color: '#28a745' }} />,
  'Longest Streak': <StackedLineChartIcon fontSize="large" style={{ color: '#28a745' }} />,
  'Rank Change': <TrendingUpIcon fontSize="large" style={{ color: '#28a745' }} />,
};

const App = () => {
  const [topTraders, setTopTraders] = useState([]);
  const [traders, setTraders] = useState([]);
  const [metrics, setMetrics] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetchTradersData();
    if (Array.isArray(data)) {
      const sortedTraders = data.sort((a, b) => b.Xscore - a.Xscore);
      setTopTraders(sortedTraders.slice(0, 3));
      setTraders(sortedTraders);
      setMetrics([
        { label: 'Most Tips Given', value: 'Cristofer G.', score: 129 },
        { label: 'Most Active', value: 'Roger K.', score: 37 },
        { label: 'Longest Streak', value: 'Dane P.', score: 12 },
        { label: 'Rank Change', value: 'Nolan F.', score: 7 }
      ]);
    } else {
      console.error("Data is not in the expected array format.");
    }
  };

  return (
    <Container maxWidth="lg" sx={{ position: 'relative', overflow: 'hidden' }}>
      {/* Background "Champions" text positioned above metric boxes */}
      <Box
        sx={{
          position: 'absolute',
          top: '1%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: '10rem',
          fontWeight: 'bold',
          color: 'rgba(200, 200, 200, 0.2)',
          zIndex: 0,  // Positioned behind the metric boxes
          whiteSpace: 'nowrap',
          userSelect: 'none',
        }}
      >
        Champions
      </Box>

      {/* Foreground "Champions" heading */}
      <Box sx={{ textAlign: 'center', color: 'grey', mb: 4, position: 'relative', zIndex: 1 }}>
        <Typography variant="h3" fontWeight="bold">
          LEADERBOARD
        </Typography>
      </Box>

      <TopTraders topTraders={topTraders} />

      {/* Metrics Section */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: 2,
          mt: 4,
          flexWrap: 'wrap',
          position: 'relative', // Ensures metric boxes are above the background text
          zIndex: 1, // Ensures they appear above the "Champions" background text
        }}
      >
        {metrics.map((metric, index) => (
          <Paper
            key={index}
            elevation={3}
            sx={{
              flex: '1 1 20%',
              maxWidth: 200,
              padding: '16px',
              borderRadius: '12px',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <Avatar
              sx={{
                backgroundColor: '#e0f7fa',
                width: 50,
                height: 50,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 1
              }}
            >
              {iconMapping[metric.label]}
            </Avatar>
            <Typography variant="caption" fontWeight="bold" color="textSecondary">
              {metric.label}
            </Typography>
            <Typography variant="h5" fontWeight="bold">
              {metric.value}
            </Typography>
            <Typography variant="h6" color="textPrimary">
              {metric.score}
            </Typography>
          </Paper>
        ))}
      </Box>

      <Box mt={4}>
        <LeaderboardTable traders={traders} />
      </Box>
    </Container>
  );
};

export default App;

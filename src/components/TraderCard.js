import React from 'react';
import { Avatar, Typography, Paper, Button, Box } from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import NotificationsIcon from '@mui/icons-material/Notifications';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import BarChartIcon from '@mui/icons-material/BarChart';
import PersonIcon from '@mui/icons-material/Person';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import * as AvatarLibrary from '@dicebear/avatars';
import * as Bottts from '@dicebear/avatars-bottts-sprites';

const TraderCard = ({ trader, rank }) => {
  // Generate a random avatar SVG using DiceBear
  const avatarSvg = new AvatarLibrary.createAvatar(Bottts, {
    seed: trader.Name || 'default-seed',
    dataUri: true,
    size: 80
  });

  // Determine rank label and style dynamically
  let rankLabel;
  let rankColor;

  if (rank === 1) {
    rankLabel = '1st';
    rankColor = '#FFD700'; // Gold color
  } else if (rank === 2) {
    rankLabel = '2nd';
    rankColor = '#C0C0C0'; // Silver color
  } else if (rank === 3) {
    rankLabel = '3rd';
    rankColor = '#CD7F32'; // Bronze color
  } else {
    rankLabel = `${rank}th`; // Dynamic rank label for ranks beyond 3
    rankColor = '#A9A9A9'; // Default color for ranks beyond 3
  }

  return (
    <Paper
      elevation={3}
      style={{
        padding: '20px',
        textAlign: 'center',
        maxWidth: 300,
        margin: 'auto',
        borderRadius: '16px',
        position: 'relative',
        backgroundColor: '#f4f6f8'
      }}
    >
      {/* Rank Badge */}
      <Box
        style={{
          position: 'absolute',
          top: '-10px',
          right: '-10px',
          backgroundColor: rankColor,
          borderRadius: '50%',
          width: '50px',
          height: '50px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '18px',
          fontWeight: 'bold',
          color: '#fff'
        }}
      >
        {rankLabel}
      </Box>

      {/* Avatar with DiceBear SVG */}
      <Avatar
        alt={trader.Name}
        src={avatarSvg}
        sx={{
          width: 80,
          height: 80,
          margin: 'auto',
          border: '3px solid #4caf50',
          borderRadius: '50%',
          marginBottom: '8px'
        }}
      >
        {!trader.avatarUrl && trader.Name ? trader.Name[0] : null}
      </Avatar>

      {/* Name, Trading Style, and Verification Badge */}
      <Box display="flex" alignItems="center" justifyContent="center" mt={1}>
        <Typography variant="h5" sx={{ fontWeight: '800', marginRight: '5px' }}>
          {trader.Name}
        </Typography>
        <CheckCircleIcon color="primary" fontSize="small" />
      </Box>
      <Typography color="textSecondary" variant="subtitle2">
        {trader.TradingStyle}
      </Typography>

      {/* Xscore */}
      <Box display="flex" alignItems="center" justifyContent="center" mt={2}>
        <EmojiEventsIcon color="action" />
        <Typography variant="h6" sx={{ ml: 1, fontWeight: 'bold' }}>X {trader.Xscore}</Typography>
      </Box>

      {/* Average Gain */}
      <Box display="flex" alignItems="center" justifyContent="center" mt={1}>
        <BarChartIcon color="success" />
        <Typography color="textSecondary" sx={{ ml: 1 }}>
          {Math.round(trader.AvgGain * 100)}% Avg Gain
        </Typography>
      </Box>

      {/* Alerts */}
      <Box display="flex" alignItems="center" justifyContent="center" mt={1}>
        <NotificationsIcon color="secondary" />
        <Typography color="textSecondary" sx={{ ml: 1 }}>
          Alerts: {trader.Alerts}
        </Typography>
      </Box>

      {/* Trades */}
      <Box display="flex" alignItems="center" justifyContent="center" mt={1}>
        <TrendingUpIcon color="error" />
        <Typography color="textSecondary" sx={{ ml: 1 }}>
          Trades: {trader.Trades}
        </Typography>
      </Box>

      {/* Profile Button */}
      <Button
        variant="contained"
        size="small"
        sx={{ mt: 2, backgroundColor: '#4caf50', color: '#fff' }}
        startIcon={<PersonIcon />}
      >
        Profile
      </Button>
    </Paper>
  );
};

export default TraderCard;

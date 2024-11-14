import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box } from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import NotificationsIcon from '@mui/icons-material/Notifications';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import StarIcon from '@mui/icons-material/Star';
import { green, orange, yellow } from '@mui/material/colors';

const LeaderboardTable = ({ traders }) => (
  <TableContainer component={Paper} sx={{ mt: 2, borderRadius: '12px', overflow: 'hidden' }}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Rank</TableCell>
          <TableCell>Name</TableCell>
          <TableCell>Trading Style</TableCell>
          <TableCell align="center">Streaks</TableCell>
          <TableCell align="center">Alerts</TableCell>
          <TableCell align="center">Trades</TableCell>
          <TableCell align="center">Avg Gain</TableCell>
          <TableCell align="center">Xscore</TableCell>
          <TableCell align="center">Trophies</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {traders.map((trader, index) => (
          <TableRow
            key={trader.Name}
            sx={{
              backgroundColor: index === 0 ? yellow[100] : index === 1 ? orange[100] : index === 2 ? green[100] : 'white'
            }}
          >
            {/* Rank */}
            <TableCell>
              <Box display="flex" alignItems="center">
                {index + 1 <= 3 && <StarIcon color="primary" sx={{ mr: 1 }} />}
                {index + 1}
              </Box>
            </TableCell>

            {/* Name */}
            <TableCell>
              <Typography variant="body1" fontWeight="800">
                {trader.Name}
              </Typography>
            </TableCell>

            {/* Trading Style */}
            <TableCell>
              <Box display="flex" alignItems="center">
                <TrendingUpIcon color="action" sx={{ mr: 1 }} />
                {trader.TradingStyle}
              </Box>
            </TableCell>

            {/* Streaks */}
            <TableCell align="center">
              <Box display="flex" alignItems="center" justifyContent="center">
                <EmojiEventsIcon color="action" sx={{ mr: 0.5 }} />
                {trader.Streaks}
              </Box>
            </TableCell>

            {/* Alerts */}
            <TableCell align="center">
              <Box display="flex" alignItems="center" justifyContent="center">
                <NotificationsIcon color="secondary" sx={{ mr: 0.5 }} />
                {trader.Alerts}
              </Box>
            </TableCell>

            {/* Trades */}
            <TableCell align="center">{trader.Trades}</TableCell>

            {/* Avg Gain */}
            <TableCell align="center" sx={{ color: trader.AvgGain >= 0.8 ? 'green' : 'text.primary' }}>
              {Math.round(trader.AvgGain * 100)}%
            </TableCell>

            {/* Xscore */}
            <TableCell align="center">
              <Typography variant="body2" fontWeight="bold" color="primary">
                {trader.Xscore}
              </Typography>
            </TableCell>

            {/* Trophies */}
            <TableCell align="center">
              <Box display="flex" alignItems="center" justifyContent="center">
                <EmojiEventsIcon color="error" sx={{ mr: 0.5 }} />
                {trader.Trophies}
              </Box>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export default LeaderboardTable;
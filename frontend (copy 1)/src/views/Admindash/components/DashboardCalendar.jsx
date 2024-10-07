import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import dayjs from 'dayjs';
import Box from '@mui/material/Box';
import { useState } from "react";
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

export default function DateCalendarValue() {
    const [value, setValue] = useState(dayjs('2024-01-01'));
    const Item = styled(Paper)(({ theme }) => ({
      backgroundColor: "#fff",
      ...theme.typography.body2,
      padding: theme.spacing(1),
      color: theme.palette.text.secondary,
      border: '2px solid darkblue',
      borderRadius: '21px',
      flexGrow: 1,
      maxWidth: "500px",
      maxHeight:"500px",
      ...theme.applyStyles("dark", {
        backgroundColor: "#1A2027",
        
      }),
    }));
    return (
        <Box display={'flex'} alignItems={"center"}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>          
          <Item >
            <DateCalendar value={value} onChange={(newValue) => setValue(newValue)} />
          </Item>
      </LocalizationProvider>
      </Box>
    );
  }

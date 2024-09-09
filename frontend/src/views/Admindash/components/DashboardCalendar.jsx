import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import dayjs from 'dayjs';
import Box from '@mui/material/Box';
import { useState } from "react";
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

export default function DateCalendarValue() {
    const [value, setValue] = useState(dayjs('2022-04-17'));
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        color: theme.palette.text.secondary,
        width: '100%',
        flexGrow: 1,
        marginTop: theme.spacing(3),
        marginRight: theme.spacing(2),
        ...theme.applyStyles('dark', {
            backgroundColor: '#1A2027',
        }),
    }));
  
    return (
        <Box display={'flex'} flexDirection={'row'}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>          
          <Item>
            <DateCalendar value={value} onChange={(newValue) => setValue(newValue)} />
          </Item>
      </LocalizationProvider>
      </Box>
    );
  }

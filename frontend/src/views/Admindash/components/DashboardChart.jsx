import { PieChart } from '@mui/x-charts/PieChart';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import DashboardCalendar from './DashboardCalendar';

export default function DashboardChart() {
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        color: theme.palette.text.secondary,
        flexGrow: 1,
        width: "300px",
        ...theme.applyStyles('dark', {
            backgroundColor: '#1A2027',
        }),
    }));
    return (
        <Box display={"flex"} flexDirection={"row"} flexWrap={"wrap"} flexGrow={1} marginTop={3} justifyContent={"space-around"} alignItems={"start"}>
            <Box display={'flex'} flexDirection={'row'} flexWrap={"wrap"} gap={2} >
                <Item style={{border:"2px solid blue", borderRadius:"25px"}}>
                    <Typography>
                        Egresados
                    </Typography>
                    <PieChart
                    colors={['lightgray', 'gray', 'white']}
                        series={[
                            {
                                data: [
                                    { id: 0, value: 10, label: 'Masculinos' },
                                    { id: 1, value: 15, label: 'Femeninos' },
                                ],
                            },
                        ]}
                        {...pieParams}
                    />
                </Item>
                <Item style={{border:"2px solid blue", borderRadius:"25px"}}>
                    <Typography>
                        Egresados
                    </Typography>
                    <PieChart
                    colors={['gray', 'lightgray', 'black']}
                        series={[
                            {
                                data: [
                                    { id: 0, value: 10, label: 'QA' },
                                    { id: 1, value: 30, label: 'Front' },
                                    { id: 2, value: 40, label: 'Back' },
                                    { id: 3, value: 10, label: 'UX' },
                                    { id: 4, value: 10, label: 'DevOps' },
                                ],
                            },
                        ]}
                        {...pieParams}
                    />
                </Item>
            </Box>
            <DashboardCalendar />
        </Box>
    );
}
const pieParams = {
    height: 200,
    margin: { right: 5 },
    slotProps: { legend: { hidden: true }, backgroundColor: "slategray" },
    
};

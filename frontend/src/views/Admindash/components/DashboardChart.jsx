import { PieChart } from '@mui/x-charts/PieChart';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

export default function BasicPie() {
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        color: theme.palette.text.secondary,
        width: "100%",
        flexGrow: 1,
        marginTop: theme.spacing(3),
        marginRight: theme.spacing(2),
        ...theme.applyStyles('dark', {
            backgroundColor: '#1A2027',
        }),
    }));
    return (
        <Box display={'flex'} flexDirection={'row'}>
            <Item>
                <Typography>
                    Egresados
                </Typography>
                <PieChart
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
            <Item>
                <Typography>
                    Egresados
                </Typography>
                <PieChart
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
    );
}
const pieParams = {
    height: 200,
    margin: { right: 5 },
    slotProps: { legend: { hidden: true } },
};

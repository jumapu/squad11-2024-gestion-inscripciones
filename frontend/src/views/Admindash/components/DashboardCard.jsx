import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { GiGraduateCap } from "react-icons/gi";
import { MdOutlineGroup } from "react-icons/md";
import { IoCalendar } from "react-icons/io5";
import { RiTeamFill } from "react-icons/ri";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { selectMentorCount } from "@/store/slice/mentorSlice";
// import { selectEventoCount } from "@/store/slice/eventosSlice";
// import { selectEgresadoCount } from '@/store/slice/egresadoSlice';
// import { selectTeamCount } from "@/store/slice/teamSlice";

export default function DashboardCard() {
  const eventoCount = 3;
  const egresadoCount = 150;
  const teamCount = 15;
  const mentorCount = useSelector(selectMentorCount);
  // const eventoCount = useSelector(selectEventoCount);
  // const egresadoCount = useSelector(selectEgresadoCount);
  // const teamCount = useSelector(selectTeamCount);

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: '#fff',
        ...theme.typography.body2,
        textAlign: 'center',
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        padding: theme.spacing(1),
        width: "150px",
        color: theme.palette.text.secondary,
        ...theme.applyStyles('dark', {
            backgroundColor: '#1A2027',
        }),
    }));

    const datos = [
        { icon: <GiGraduateCap />, text: "Egresados", total: egresadoCount },
        { icon: <MdOutlineGroup />, text: "Mentores", total: mentorCount },
        { icon: <IoCalendar />, text: "Eventos", total: eventoCount },
        { icon: <RiTeamFill />, text: "Squads", total: teamCount }
    ];
   
    
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Box display={"flex"} flexDirection={"row"} gap={2} flexWrap={"wrap"}>
                {datos.map((item, index) => (
                    <Box key={index} >
                        <Item >
                            <Box>
                                {item.icon }
                            </Box>
                            <Box>
                                <Typography>
                                    {item.text}
                                </Typography>
                                <Typography>
                                    {item.total}
                                </Typography>
                            </Box>
                        </Item>    
                    </Box>
                ))}
            </Box>
        </Box>
    );
}

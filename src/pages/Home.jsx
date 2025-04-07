import { useEffect, useState } from 'react';
import { Button, Container, Typography, Box } from '@mui/material';
import MusicCard from '../components/MusicCard';
import SuggestForm from '../components/SuggestForm';
import AuthButtons from '../components/AuthButtons';
import { getSongList } from '../services/api';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function Home() {
  const [page, setPage] = useState();
  const [total, setTotal] = useState();
  const [top5, setTop5] = useState([]);
  const islogged = () => {
    const cookies = document.cookie.split('; ');
    const cookie = cookies.find(c => c.startsWith('token='));
    return cookie ? cookie.split('=')[1] : null;
  };
  const isAdmin = () => {
    const cookies = document.cookie.split('; ');
    const cookie = cookies.find(c => c.startsWith('is_admin='));
    return cookie ? cookie.split('=')[1] === 'true' : false;
  };
  
  function handleVerMais() {
    const newPage = page + 1;
    getSongList(newPage).then((data) => {
      setTop5(prev => [...prev, ...data.data]);
      setPage(newPage);
    });
  }

  useEffect(() => {
    getSongList(1).then((data) => {
      setTop5(data.data);
      setPage(1);
      setTotal(data.total);
    });
  }, []);

  return (
    <Container maxWidth={false} >
      <Box className="header">
        <Box sx={{ position: 'relative', zIndex: 2 }}>
          <img src="/tiao-carreiro-pardinho.png" alt="Tião Carreiro" className="artist-img" />
          <Typography variant="h4" gutterBottom>Top 5 Músicas Mais Tocadas</Typography>
          <Typography variant="h6">Tião Carreiro & Pardinho</Typography>
        </Box>
      </Box>
      <Container className="container" maxWidth={false} >
        {islogged() ? <SuggestForm is_admin={isAdmin()} data-testid="'suggest-form'" /> : <AuthButtons />}
        <Typography variant="h5" gutterBottom>Ranking Atual</Typography>
        {top5.length === 0 ? (
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <MusicNoteIcon sx={{ fontSize: 50 }} color="disabled" />
            <Typography variant="body1">Nenhuma música cadastrada ainda</Typography>
            <Typography variant="body2" color="text.secondary">
              Seja o primeiro a sugerir uma música, faça o login e envie um link!
            </Typography>
          </Box>
        ) : (
          top5.map((item, index) => (
            <MusicCard
              id={item.id}
              key={item.youtube_id}
              rank={index + 1}
              title={item.title}
              views={item.views}
              thumb={item.thumb}
              youtube_id={item.youtube_id}
              is_admin={isAdmin()}
            />
          ))
        )}
        {total > top5.length && (
          <Box display="flex" justifyContent="center" mt={2}>
            <Button
              onClick={handleVerMais}
              startIcon={<ExpandMoreIcon />}
              sx={{
                color: 'gray',
                textTransform: 'none',
              }}
            >
              Ver mais
            </Button>
          </Box>
        )}
      </Container>
    </Container>
  );
}

import { useEffect, useState } from 'react';
import { Container, Typography, Box } from '@mui/material';
import MusicCard from '../components/MusicCard';
import SuggestForm from '../components/SuggestForm';
import AuthButtons from '../components/AuthButtons';
import { getSongList } from '../services/api';
import MusicNoteIcon from '@mui/icons-material/MusicNote';

export default function Home() {
  const [top5, setTop5] = useState([]);
  const islogged = () => {
    return false;
    const cookies = document.cookie.split('; ');
    const cookie = cookies.find(c => c.startsWith('token='));
    return cookie ? cookie.split('=')[1] : null;
  };
  const isAdmin = () => {
    return false;
    const cookies = document.cookie.split('; ');
    const cookie = cookies.find(c => c.startsWith('is_admin='));
    return cookie ? cookie.split('=')[1] === 'true' : false;
  };

  useEffect(() => {
    getSongList().then(setTop5);
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
      <Container class="container" maxWidth={false} >
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
              key={item.youtube_id}
              rank={index + 1}
              titulo={item.titulo}
              views={item.visualizacoes}
              thumb={item.thumb}
              youtube_id={item.youtube_id}
              is_admin={isAdmin()}
            />
          ))
        )}
      </Container>
    </Container>
  );
}

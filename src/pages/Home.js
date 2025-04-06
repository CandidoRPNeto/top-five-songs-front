import { useEffect, useState } from 'react';
import { Container, Typography, Box } from '@mui/material';
import MusicCard from '../components/MusicCard';
import SuggestForm from '../components/SuggestForm';
import { getTop5 } from '../services/api';
import MusicNoteIcon from '@mui/icons-material/MusicNote';

export default function Home() {
  const [top5, setTop5] = useState([]);

  useEffect(() => {
    getTop5().then(setTop5);
  }, []);

  return (
    <Container>
      <Box sx={{ textAlign: 'center', my: 4 }}>
        <img
          src="/tiao-carreiro-pardinho.png"
          alt="Tião Carreiro"
          style={{ width: 200 }}
        />
        <Typography variant="h4" gutterBottom>Top 5 Músicas Mais Tocadas</Typography>
        <Typography variant="h6">Tião Carreiro & Pardinho</Typography>
      </Box>

      <SuggestForm />

      <Typography variant="h5" gutterBottom>Ranking Atual</Typography>

      {top5.length === 0 ? (
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <MusicNoteIcon sx={{ fontSize: 50 }} color="disabled" />
          <Typography variant="body1">Nenhuma música cadastrada ainda</Typography>
          <Typography variant="body2" color="text.secondary">
            Seja o primeiro a sugerir uma música usando o formulário acima!
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
          />
        ))
      )}
    </Container>
  );
}

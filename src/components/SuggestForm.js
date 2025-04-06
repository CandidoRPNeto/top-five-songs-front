import { useState } from 'react';
import { Box, TextField, Button, Alert } from '@mui/material';
import { enviarSugestao } from '../services/api';

export default function SuggestForm() {
  const [url, setUrl] = useState('');
  const [feedback, setFeedback] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await enviarSugestao(url);
    setFeedback(res.message);
    setUrl('');
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
      <h3>Sugerir Nova Música</h3>
      {feedback && <Alert severity="success">{feedback}</Alert>}
      <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
        <TextField
          fullWidth
          type="url"
          required
          placeholder="Cole aqui o link do YouTube"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <Button type="submit" variant="contained">
          Enviar
        </Button>
      </Box>
    </Box>
  );
}

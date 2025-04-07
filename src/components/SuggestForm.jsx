import { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Alert,
  Modal,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemText
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { sendRequest } from '../services/api';

export default function SuggestForm({ is_admin }) {
  const [url, setUrl] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const mockRequests = [
    { id: 1, link: 'https://youtube.com/watch?v=abc123' },
    { id: 2, link: 'https://youtube.com/watch?v=xyz789' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await sendRequest(url);
    setFeedback(res.message);
    setUrl('');
  };

  const handleAccept = (id) => {
    console.log(`Aprovado: ${id}`);
    // Aqui vai a lógica de aprovação
  };

  const handleReject = (id) => {
    console.log(`Recusado: ${id}`);
    // Aqui vai a lógica de rejeição
  };

  return (
    <>
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
          {is_admin ? (
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button type="submit" variant="contained">
                Adicionar
              </Button>
              <Button
                type="button"
                variant="contained"
                color="secondary"
                onClick={() => setModalOpen(true)}
              >
                Ver Requests
              </Button>
            </Box>
          ) : (
            <Button type="submit" variant="contained">
              Enviar
            </Button>
          )}
        </Box>
      </Box>

      {/* Modal de Requests */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            width: 500,
            maxHeight: '80vh', // limita altura total
            borderRadius: 2,
            overflowY: 'auto', // ativa scroll se necessário
          }}
        >
          <Typography variant="h6" gutterBottom>
            Solicitações Pendentes
          </Typography>
          <List>
            {mockRequests.map((item) => (
              <ListItem
                key={item.id}
                secondaryAction={
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <IconButton
                      edge="end"
                      color="success"
                      onClick={() => handleAccept(item.id)}
                    >
                      <CheckIcon />
                    </IconButton>
                    <IconButton
                      edge="end"
                      color="error"
                      onClick={() => handleReject(item.id)}
                    >
                      <CloseIcon />
                    </IconButton>
                  </Box>
                }
              >
                <ListItemText
                  primary={
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ textDecoration: 'none', color: '#1976d2' }}
                    >
                      {item.link}
                    </a>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Modal>
    </>
  );
}

import { useEffect, useState } from 'react';
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
import { sendRequest, createSong, getRequestList, acceptRequest, refuseRequest } from '../services/api';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function SuggestForm({ is_admin }) {
  const [url, setUrl] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [requests, setRequests] = useState([]);
  const [total, setTotal] = useState();
  const [requestPage, setRequestPage] = useState();
  
  useEffect(() => {
    getRequestList(1).then((data) => {
      setRequests(data.data);
      setTotal(data.total);
      setRequestPage(1);
    });
  }, []);
    
  function handleVerMais() {
    const newPage = requestPage + 1;
    console.log(newPage);
    getRequestList(newPage).then((data) => {
      setRequests(prev => [...prev, ...data.data]);
      setRequestPage(newPage);
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    let res;
    if (is_admin) {
      res = await createSong(url);
    } else {
      res = await sendRequest(url);
    }
    setFeedback(res.message);
    setUrl('');
    window.location.reload();
  };

  const handleAccept = async (id) => {
    await acceptRequest(id);
    window.location.reload();
  };

  const handleReject = async (id) => {
    await refuseRequest(id);
    window.location.reload();
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
            maxHeight: '80vh',
            borderRadius: 2,
            overflowY: 'auto',
          }}
        >
          <Typography variant="h6" gutterBottom>
            Solicitações Pendentes
          </Typography>
          <List>
            {requests.map((item) => (
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
                      {item.link.length > 50 ? `${item.link.slice(0, 40)}...` : item.link}
                    </a>
                  }
                />
              </ListItem>
            ))}
          </List>
        {total > requests.length && (
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
        </Box>
      </Modal>
    </>
  );
}

import { Modal, Box, Typography, TextField, Button } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';

export default function RegisterModal({ onClose }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    const res = await fetch('http://localhost:8000/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();

    if (data.access_token) {
      document.cookie = `access_token=${data.access_token}`;
      document.cookie = `is_admin=${data.is_admin}`;
      onClose();
      window.location.reload();
    } else {
      alert('Erro ao registrar');
    }
  };

  return (
    <Modal open={true} onClose={onClose}>
      <Box sx={modalStyle}>
        <Typography variant="h6" gutterBottom>
          Criar Conta
        </Typography>
        <TextField
          fullWidth
          label="Nome"
          sx={{ mb: 2 }}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          fullWidth
          label="Email"
          type="email"
          sx={{ mb: 2 }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          fullWidth
          label="Senha"
          type="password"
          sx={{ mb: 2 }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
          <Button startIcon={<CloseIcon />} onClick={onClose}>
            Cancelar
          </Button>
          <Button
            variant="contained"
            endIcon={<PersonAddIcon />}
            onClick={handleRegister}
          >
            Cadastrar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  width: 400,
  borderRadius: 2,
};

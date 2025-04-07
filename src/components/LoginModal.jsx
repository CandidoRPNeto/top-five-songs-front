import { Modal, Box, Typography, TextField, Button } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import CloseIcon from '@mui/icons-material/Close';
import { login } from '../services/api';
import { useState } from 'react';

export default function LoginModal({ onClose }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const data = await login(email, password );
    if (data.status === 'success') {
      onClose();
      window.location.reload();
    } else {
      alert('Falha no login');
    }
  };

  return (
    <Modal open={true} onClose={onClose}>
      <Box sx={modalStyle}>
        <Typography variant="h6" gutterBottom>
          Login
        </Typography>
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
            endIcon={<LoginIcon />}
            onClick={handleLogin}
          >
            Entrar
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

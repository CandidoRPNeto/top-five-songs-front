import { Button, Box } from '@mui/material';
import { useState } from 'react';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';

export default function AuthButtons() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 4 }}>
      <Button variant="contained" onClick={() => setShowLogin(true)}>
        Login
      </Button>
      <Button variant="outlined" onClick={() => setShowRegister(true)}>
        Registrar
      </Button>

      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
      {showRegister && <RegisterModal onClose={() => setShowRegister(false)} />}
    </Box>
  );
}

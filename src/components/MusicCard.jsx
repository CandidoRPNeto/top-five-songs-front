import { Card, CardContent, Typography, CardMedia, Button, Modal, Box, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';

export default function MusicCard({ id, rank, titulo, views, thumb, youtube_id, is_admin, onDelete }) {
  const [open, setOpen] = useState(false);
  const [titleEdit, setTitleEdit] = useState(titulo);
  const [cardsVisible, setCardsVisible] = useState(true);

  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/songs/${id}`, {
        method: 'DELETE',
      });
  
      if (res.ok) {
        setCardsVisible(false);
        if (typeof onDelete === 'function') {
          onDelete(); // <-- isso aqui vai ativar o mock no teste!
        }
      }
    } catch (err) {
      console.error('Erro ao deletar:', err);
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`/api/songs/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ titulo: titleEdit }),
      });

      if (res.ok) {
        setOpen(false);
        // pode disparar algo pra atualizar a UI externa, se precisar
      }
    } catch (err) {
      console.error('Erro ao editar:', err);
    }
  };

  if (!cardsVisible) return null;

  return (
    <>
      <a
        href={`https://www.youtube.com/watch?v=${youtube_id}`}
        target="_blank"
        rel="noopener noreferrer"
        style={{ textDecoration: 'none' }}
        id={id}
      >
        <Card sx={{ display: 'flex', mb: 2 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
            <CardContent>
              <Typography variant="h6">
                #{rank} - {titulo}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {views.toLocaleString()} visualizações
              </Typography>

              {is_admin && (
                <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<EditIcon />}
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      setOpen(true)
                    }}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="outlined"
                    size="small"
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      handleDelete();
                    }}
                  >
                    Deletar
                  </Button>
                </Box>
              )}
            </CardContent>
          </Box>

          <CardMedia
            component="img"
            sx={{ width: 120 }}
            image={thumb}
            alt={`Thumbnail de ${titulo}`}
          />
        </Card>
      </a>

      {/* Modal de edição */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            width: 400,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" gutterBottom>Editar Música</Typography>
          <form onSubmit={handleEdit}>
            <TextField
              fullWidth
              label="Título"
              value={titleEdit}
              onChange={(e) => setTitleEdit(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
              <Button onClick={() => setOpen(false)}>Cancelar</Button>
              <Button type="submit" variant="contained">Salvar</Button>
            </Box>
          </form>
        </Box>
      </Modal>
    </>
  );
}

import { Card, CardContent, Typography, CardMedia, Button, Modal, Box, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
import { deleteSong, updateSong } from '../services/api';

export default function MusicCard({ id, rank, title, views, thumb, youtube_id, is_admin, onDelete }) {
  const [open, setOpen] = useState(false);
  const [titleEdit, setTitleEdit] = useState(title);
  const [viewsEdit, setViewsEdit] = useState(views);
  const [thumbEdit, setThumbEdit] = useState(thumb);
  const [youtubeIdEdit, setYoutubeIdEdit] = useState(youtube_id);
  const [cardsVisible, setCardsVisible] = useState(true);

  const handleDelete = async () => {
    try {
      const res = await deleteSong(id);
      if (res.status === 'success') {
        setCardsVisible(false);
        if (typeof onDelete === 'function') {
          onDelete(); 
        }
      }
    } catch (err) {
      console.error('Erro ao deletar:', err);
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const res = await updateSong(id, titleEdit, views, youtube_id, thumb);
      if (res.status === 'success') {
        setOpen(false);
      }
    } catch (err) {
      console.error('Erro ao editar:', err);
    }
  };

  if (!cardsVisible) return null;

  function formatViews(views) {
    if (views >= 1_000_000) {
      return (views / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
    } else if (views >= 1_000) {
      return (views / 1_000).toFixed(1).replace(/\.0$/, '') + 'K';
    }
    return views.toString();
  }

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
                {rank} - {title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {formatViews(Number(views))} visualizações
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
            alt={`Thumbnail de ${title}`}
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
            <TextField
              fullWidth
              label="Visualizações"
              value={viewsEdit}
              onChange={(e) => setViewsEdit(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Link da Thumb"
              value={thumbEdit}
              onChange={(e) => setThumbEdit(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Id do Youtube"
              value={youtubeIdEdit}
              onChange={(e) => setYoutubeIdEdit(e.target.value)}
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

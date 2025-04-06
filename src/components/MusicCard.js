import { Card, CardContent, Typography, CardMedia, Box } from '@mui/material';

export default function MusicCard({ rank, titulo, views, thumb, youtube_id }) {
  return (
    <a
      href={`https://www.youtube.com/watch?v=${youtube_id}`}
      target="_blank"
      rel="noopener noreferrer"
      style={{ textDecoration: 'none' }}
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
  );
}

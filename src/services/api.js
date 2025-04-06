// src/services/api.js
export const getTop5 = () => {
    return Promise.resolve([
      {
        youtube_id: "abc123",
        titulo: "Pagode em Brasília",
        visualizacoes: 123456,
        thumb: "https://img.youtube.com/vi/abc123/mqdefault.jpg",
      },
      {
        youtube_id: "def456",
        titulo: "Boi Soberano",
        visualizacoes: 987654,
        thumb: "https://img.youtube.com/vi/def456/mqdefault.jpg",
      },
      // ...até 5
    ]);
  };
  
  export const enviarSugestao = (url) => {
    // Aqui você pode fazer um POST com axios para seu PHP futuramente
    return Promise.resolve({ success: true, message: "Link enviado com sucesso!" });
  };
  
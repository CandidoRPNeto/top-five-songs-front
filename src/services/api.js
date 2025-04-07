export const login = async (email, password) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (response.ok) {
      document.cookie = `token=${data.access_token}; path=/; max-age=${7 * 24 * 60 * 60}`;
      document.cookie = `is_admin=${data.is_admin}; path=/; max-age=${7 * 24 * 60 * 60}`;
    }
    return data;
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    throw error;
  }
};

export const getSongList = () => {
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

export const deleteSong = async (songId) => {
  const token = getCookieValue('token'); 
  const is_admin = getCookieValue('is_admin'); 
    try {
      if(token == null) throw new Error('need login');
      if(!is_admin) throw new Error('not admin');
      const response = await fetch(`${process.env.REACT_APP_API_URL}/songs/${songId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }
      });
      return await response.json();
    } catch (error) {
      console.error('Erro no deleteSong:', error);
      throw error;
    }
  };

export const sendRequest = async () => {
  const token = getCookieValue('token'); 
    try {
      if(token == null) throw new Error('need login');
      const response = await fetch(`${process.env.REACT_APP_API_URL}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }
      });
      return await response.json();
    } catch (error) {
      console.error('Erro no deleteSong:', error);
      throw error;
    }
  };

export const getRequestList = async () => {
  const token = getCookieValue('token'); 
    try {
      if(token == null) throw new Error('need login');
      const response = await fetch(`${process.env.REACT_APP_API_URL}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }
      });
      return await response.json();
    } catch (error) {
      console.error('Erro no deleteSong:', error);
      throw error;
    }
  };

export const acceptRequest = async () => {
  const token = getCookieValue('token'); 
    try {
      if(token == null) throw new Error('need login');
      const response = await fetch(`${process.env.REACT_APP_API_URL}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }
      });
      return await response.json();
    } catch (error) {
      console.error('Erro no deleteSong:', error);
      throw error;
    }
  };

export const refuseRequest = async () => {
  const token = getCookieValue('token'); 
    try {
      if(token == null) throw new Error('need login');
      const response = await fetch(`${process.env.REACT_APP_API_URL}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }
      });
      return await response.json();
    } catch (error) {
      console.error('Erro no deleteSong:', error);
      throw error;
    }
  };












function getCookieValue(name) {
  const cookies = document.cookie.split('; ');
  const cookie = cookies.find(c => c.startsWith(name + '='));
  return cookie ? cookie.split('=')[1] : null;
}
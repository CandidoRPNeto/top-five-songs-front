export const login = async (email, password) => {
  const data = await fetchRequest('login','POST',{ email, password },false);
  document.cookie = `token=${data.access_token}; path=/; max-age=${7 * 24 * 60 * 60}`;
  document.cookie = `is_admin=${data.is_admin}; path=/; max-age=${7 * 24 * 60 * 60}`;
  return data;
};

export const register = async (name, email, password) => {
  const data = await fetchRequest('register','POST',{ name, email, password },false);
  document.cookie = `token=${data.access_token}; path=/; max-age=${7 * 24 * 60 * 60}`;
  document.cookie = `is_admin=${data.is_admin}; path=/; max-age=${7 * 24 * 60 * 60}`;
  return data;
};

export const getSongList = async (page) => {
  const data = await fetchRequest(`songs/index?page=${page}`,'GET',{},false);
  return data;
};

export const deleteSong = async (songId) => {
  const data = await fetchRequest(`songs/${songId}`,'DELETE',{});
  return data;
};

export const createSong = async (link) => {
  const data = await fetchRequest(`songs`,'POST',{ link });
  return data;
};

export const updateSong = async (songId, title, views, youtube_id, thumb) => {
  const data = await fetchRequest(`songs/${songId}`,'PUT',{title, views, youtube_id, thumb});
  return data;
};

export const sendRequest = async (link) => {
  const data = await fetchRequest('request','POST',{ link });
  return data;
};

export const getRequestList = async (page) => {
  const data = await fetchRequest(`request?page=${page}`,'GET',{});  
  return data;
};

export const acceptRequest = async (id) => {
  const data = await fetchRequest(`request/${id}/accept`,'PATCH',{});
  return data;
};

export const refuseRequest = async (id) => {
  const data = await fetchRequest(`request/${id}/refuse`,'PATCH',{});
  return data;
};

function getCookieValue(name) {
  const cookies = document.cookie.split('; ');
  const cookie = cookies.find(c => c.startsWith(name + '='));
  return cookie ? cookie.split('=')[1] : null;
}

async function fetchRequest(route,method,body,need_token = true) {
  let headers = {};
  
  if(need_token){
    const token = getCookieValue('token'); 
    if(token == null) throw new Error('need login');
    headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    };
  }else {
    headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };
  }
  const config = {
    method,
    headers
  };

  if (method !== 'GET') {
    config.body = JSON.stringify(body);
  }
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/${route}`, config);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    throw error;
  }
}
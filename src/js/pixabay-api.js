import axios from 'axios';


export async function getImages(query,currentPage){
  const BASE_URL = 'https://pixabay.com/api/';
  const url = BASE_URL;

  const params= {
    key: '43036736-59573289802154025d43bab67',
    q: query,
    lang: 'en',
    per_page: 15,
    page: currentPage,

  };
  const apiRes = await axios.get(url,{params});
  return apiRes.data;
};


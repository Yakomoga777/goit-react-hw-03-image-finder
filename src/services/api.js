import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api';
// const KEY_API = '34395621-a4ae5341feaa95111ecdda581';
// const search = 'yellow+flower';
// const perPage = '5';

// export const fetchImages = async (search, perPage, KEY_API) => {
//   const response = await axios.get(
//     `/?key=${KEY_API}&q=${search}&image_type=photo&per_page=${perPage}`
//   );
//   console.log('пошуковий запит');
//   //   console.log(response);
//   return response;
// };

// export const onLoagMorefetch = async (search, perPage, KEY_API) => {
//   const response = await axios.get(
//     `/?key=${KEY_API}&q=${search}&image_type=photo&per_page=${perPage}&page=${
//       this.state.page + 1
//     }`
//   );
//   console.log('пошуковий запит');
//   //   console.log(response);
//   return response;
// };

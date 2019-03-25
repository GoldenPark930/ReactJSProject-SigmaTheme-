import { URL } from 'src/constants/api';

export const getImageUrl = id =>
  `${URL}/Images/${id}/download`;

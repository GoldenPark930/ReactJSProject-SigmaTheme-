import Config from 'react-native-config';
import * as APIROUTES from './api.routes';
import * as MANAGEGROUPROUTES from './manageGroup.routes';
import * as BANKANDCCROUTES from './bankAndCC.routes';
import * as AUTHROUTES from './auth.routes';
import ImageRoutes from './image.routes';

export const URL = Config.API_URL;

export const JSON_HEADERS = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

export default {
  URL,
  APIROUTES,
  MANAGEGROUPROUTES,
  BANKANDCCROUTES,
  AUTHROUTES,
  JSON_HEADERS,
  ImageRoutes,
};

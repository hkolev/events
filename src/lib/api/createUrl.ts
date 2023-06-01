import { CLIENT_ID, CLIENT_SECRET, DOMAIN } from '../../constants';

export const constructUrl = (
  path: string,
  urlParams?: {
    key: string;
    value: string | number;
  }[]
) => {
  const url = new URL(`${DOMAIN}/${path}`);

  if (urlParams) {
    urlParams.forEach((el) => {
      url.searchParams.append(String(el.key), String(el.value));
    });
  }

  url.searchParams.append('client_id', CLIENT_ID);
  url.searchParams.append('client_secret', CLIENT_SECRET);

  return url;
};

import { constructUrl } from '../lib/api/createUrl';

export async function getEvents(query: string | undefined) {
  if (!query) return;

  const urlWithParams = constructUrl('events', [
    {
      key: 'q',
      value: query,
    },
    {
      key: 'per_page',
      value: '25',
    },
  ]);

  const response = await fetch(urlWithParams, {
    method: 'GET',
  });

  return await response.json();
}

export async function getEvent(id: string) {
  const response = await fetch(constructUrl(`/events/${id}`), {
    method: 'GET',
  });

  return await response.json();
}

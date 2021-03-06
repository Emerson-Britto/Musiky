import type { NextApiRequest, NextApiResponse } from 'next';
import cache from "memory-cache";
import { PlaylistProps } from 'common/types';
import { istatic } from 'services';
import { verifyUnavailable } from 'common/utils';
import { twoHour } from "consts";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PlaylistProps | null>
) {
  const KEY = `playlist:${req.query.id}`;
  const cachedResponse = cache.get(KEY);
  if (cachedResponse) {
    res.status(200).json(cachedResponse);
    return;
  };

  const id = String(req.query.id);

  const wasCache = id.split('-')[0] === 'qp' || id.split('-')[0] === 'last';
  if (wasCache) {
    res.status(200).send(null);
    return;
  }

  const playlist = await istatic.playlistData({ id }).then(r => r.data);;
  if (playlist) {
    playlist.list = await verifyUnavailable(playlist.list);
  }

  cache.put(KEY, playlist, twoHour);
  res.status(200).json(playlist);
}

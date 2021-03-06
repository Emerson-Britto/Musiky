import { useContext } from 'react';
import { Music, PlaylistProps } from 'common/types';
import { PlaylistContext } from './providers/Playlist-provider';


export function usePlaylistContext(){

	const {
		playlist,
		setPlaylist,
		playingIndex,
		setPlayingIndex,
		musiclist,
		setMusiclist,
		playlistId,
		setPlaylistId,
		playlistLoop,
		setPlaylistLoop,
		playListShuffle,
		setPlayListShuffle,
		on
	} = useContext(PlaylistContext);


// ==================================================================


	const startPlaylist = ({
		playIndex,
		playlist,
		onEnded
	}: {
		playIndex: number,
		playlist: PlaylistProps,
		onEnded?: () => Promise<PlaylistProps>
	}) => {
		setPlaylist(playlist);
		setPlayingIndex(playIndex);
		setPlaylistId(playlist.id);
		setMusiclist(playlist.list);
		if (onEnded) {
			on.ended.current = onEnded;			
		}
	}

	const stopPlaylist = () => {
		setPlaylistId('');
		setMusiclist([]);
	};

	const changeMusic = async(action: number): Promise<Music | null> => {

		if(!musiclist) return null;
		let next = playingIndex + action;

		while (musiclist[next] && musiclist[next].unavailable) {
			next++;
		}

	    setPlayingIndex(
	    	playListShuffle
                ? ~~(Math.random() * musiclist.length - 1)
                : next
        );

        let playlistFinished = false;

        if (playingIndex === (musiclist.length -1)){
            if(playlistLoop){
                setPlayingIndex(0);
            } else {
                setPlayingIndex(musiclist.length - 1);
                playlistFinished = true;
            }
        }

        if (playlistFinished && on.ended.current) {
        	let {list} = await on.ended.current();
        	let listUpdated = [ ...musiclist, ...list ];
        	setMusiclist(listUpdated);
        	return listUpdated[musiclist.length]; // go to last song
        };

        return playlistFinished ? null : musiclist[next];
	}


    const togglePlaylistShuffle = (): void => {
        setPlayListShuffle((playListShuffle: boolean) => !playListShuffle)
    }

    const togglePlaylistLoop = (): void => {
        setPlaylistLoop((playlistLoop: boolean) => !playlistLoop)
    }

    const isPlayingIndex = (id: string, index: number): boolean => {
    	return id === playlistId && index === playingIndex
    }


	return {
		playlistInfor: {
			playingIndex,
			playlistId,
			musiclist,
			playlistLoop,
			playListShuffle
		},
		startPlaylist,
		stopPlaylist,
		changeMusic,
		togglePlaylistShuffle,
		togglePlaylistLoop,
		isPlayingIndex
	}
}
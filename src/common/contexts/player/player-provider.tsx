import React, { createContext, useState } from 'react';
import { PlayerContextData, Music } from 'common/types';
import {
	PlayerProgressProvider,
	PlayerFlowProvider
} from 'common/contexts/player';


interface LayoutProps {
	children: React.ReactNode;
}

export const PlayerContext = createContext<PlayerContextData>({} as PlayerContextData);
PlayerContext.displayName = 'Player';

export const PlayerProvider: React.FC<LayoutProps> = ({ children }) => {
	
	const [music, setMusic] = useState<null | Music>(null);
	const [playing, setPlaying] = useState(false);
	const [volume, setVolume] = useState(1);
	const [lastVolume, setLastVolume] = useState(0);
	const [loop, setLoop] = useState(false);
	const [duration, setDuration] = useState(0);
	const [seeking, setSeeking] = useState(false);
	const [buffer, setBuffer] = useState(false);
	const [muted, setMuted] = useState(false);

	var playerRef = null;

	return (
		<PlayerProgressProvider>
			<PlayerFlowProvider>
				<PlayerContext.Provider value={{
					ref: {
						playerRef
					},
					music,
					setMusic,
					playing,
					setPlaying,
					volume,
					setVolume,
					lastVolume,
					setLastVolume,
					loop,
					setLoop,
					duration,
					setDuration,
					seeking,
					setSeeking,
					buffer,
					setBuffer,
					muted,
					setMuted
				}}>
					{ children }
				</PlayerContext.Provider>
			</PlayerFlowProvider>
		</PlayerProgressProvider>
	)
}
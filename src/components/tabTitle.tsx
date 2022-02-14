import React from 'react';
import Head from 'next/head';
import { usePlayerContext } from 'common/contexts/Player';

interface TabTitleProps {
    name: string;
}

const TabTitle: React.FC<TabTitleProps> = ({ name }) => {
	const { prop } = usePlayerContext();

	const PlayerStatus = (): string => {
		if (prop.playing) {
			return 'Playing';
		} else if (prop.buffer) {
			return 'Loading';
		}
		return 'Paused';
		//The player does not seem to be in this dimension
	}

	if (prop.music) {
		name = `${PlayerStatus()}: ${ prop.music.title }`;
	}

	return (
		<Head>
			<title>{ name }</title>
		</Head>
	)
}



export default TabTitle;
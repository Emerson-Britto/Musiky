import React from 'react';
import Styled from 'styled-components';
import { useFeaturedContext } from 'contexts/Featured';
import istatic from 'services/istatic';

const SwiperBtnStyle = Styled.img`
  position: absolute;
  z-index: 15;
  bottom: 6%;
  width: 28px;
  border-radius: 50%;
  background-color: ${(props: {active: boolean}) => (props.active ? "#022579" : "#060512")};
  padding: 8px;
  cursor: pointer;
  box-shadow: 0 0 20px #000;
`
const RightBtn = Styled(SwiperBtnStyle)`
  right: 10%;
`
const LeftBtn = Styled(SwiperBtnStyle)`
  right: 15%;
`

const FeaturedControl = () => {
	const {
		playingAud,
		playing,
	  resumeAndPauseAudio,
    resumeAndPauseVideo
	} = useFeaturedContext();

	return (
		<>
			<RightBtn
				onClick={resumeAndPauseAudio}
				active={!playingAud}
				src={istatic.iconUrl({ name: "volume_off" })}
				alt='stop background audio'
			/>
			<LeftBtn
				onClick={resumeAndPauseVideo}
				active={!playing}
				src={istatic.iconUrl({ name: "play_disabled" })} alt='stop video'
			/>
		</>
	);
}

export default FeaturedControl;

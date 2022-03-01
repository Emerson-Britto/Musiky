import React from 'react';
import Link from 'next/link';
import { EventTarget, SyntheticEvent } from 'common/types';
import { usePlayerContext } from 'common/contexts/player';
import { useLyricContext } from 'common/contexts/Lyric';
import { PlayerProgressControl } from 'components';
import { istatic } from "api/istatic";

import {
    ViewPort, MusicInfor, OtherSetting, MusicImg, 
    SectionTitles, MusicTitleInControl, MusicSubTitle, 
    BtnPlayerControl, IconPlay, VolumeControl,
    BtnIconVolume, BtnLyrics, BtnRepeat
} from './playerStyles';

const PlayerControl: React.FC = () => {

    const {
        prop,
        toggleLoop,
        changeVolumeTo,
        toggleMuted
    } = usePlayerContext();
    const { lyricProp, toggleLyrics } = useLyricContext();

    const handlelyrics = (): void => {
        toggleLyrics();
    }
    const handlelyricsMobile = (e: React.SyntheticEvent<EventTarget>): void => {
        if(window.innerWidth < 570){
            toggleLyrics();
        }
    }
    const handleLoop = (): void => {
        toggleLoop();
    }
    const handleVolumeChange = (e: React.SyntheticEvent<EventTarget>): void => {
        let target = e.target as HTMLInputElement;
        changeVolumeTo(parseFloat(target.value));
    }
    const handleToggleMuted = (): void => {
        toggleMuted();
    }

    function getVolumeIconStatus() {
        if(prop.muted) return istatic.iconVolumeOff()
        if(prop.volume < 0.4) return istatic.iconVolumeDown()
        return istatic.iconVolume()
    }

    return (
        <ViewPort
            onClick={e =>{handlelyricsMobile(e)}}
            style={{ display: `${prop.music ? '' : 'none'}`}}
            >
            {prop.music && <MusicInfor>
                <MusicImg 
                    src={prop.music.thumbnails[1].url}
                    alt="musicImg"
                    />
                <SectionTitles>
                    <MusicTitleInControl>
                        {prop.music.title}
                    </MusicTitleInControl>


                    <MusicSubTitle>
                        {prop.music.artists.map((artist, index) => {
                            let space='';
                            if(index > 0){ space = ',  ' }
                            return(
                                <p key={index}>
                                    {space + artist}
                                </p>
                            )
                        })}
                    </MusicSubTitle>
                </SectionTitles>
            </MusicInfor>}

            <PlayerProgressControl/>

            <OtherSetting>
                {lyricProp.hasLyric &&
                <BtnLyrics lyrics={lyricProp.showLyrics} onClick={()=> handlelyrics()}>
                    <img src={istatic.iconLyric()} alt="Lyric" />
                </BtnLyrics>}

                <BtnRepeat loop={prop.loop} onClick={()=>{handleLoop()}}>
                    <img src={istatic.iconRepeat()} alt="Repeat" />
                </BtnRepeat>

                <VolumeControl 
                    type='range' 
                    min={0} 
                    max={1} 
                    step='any'
                    value={prop.volume}
                    onChange={e => {handleVolumeChange(e)}}
                />

                <BtnIconVolume onClick={()=>{handleToggleMuted()}}>
                    <img src={getVolumeIconStatus()} alt="Volume Icon"/>
                </BtnIconVolume>

            </OtherSetting>
        </ViewPort>
    )
}

export default PlayerControl;
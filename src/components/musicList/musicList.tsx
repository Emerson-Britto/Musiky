import React from 'react';
import { AppProps } from 'next/app';
import Link from 'next/link';

import { usePlayerContext } from 'common/contexts/Player';
import { usePlaylistContext } from 'common/contexts/Playlist';

import { istatic } from "api/istatic";

import PausedAnim from 'assets/playingCompAnim.jsx';

import { BoxIconPLayHover, MusicOptionBox, BoxImgMusic, 
BoxNumMusic, NumMusic, DataMusic, Titles, MusicTitle, ChannelName, MusicTime} from './musicListStyles';


const MusicList: React.FC<AppProps> = ({ list, listId }) => {

    const { prop, load } = usePlayerContext();
    const { isPlayingIndex } = usePlaylistContext();


    const clickOnMusic = (targetIndex, targetList, playlistId) => {
        load(targetIndex, targetList, playlistId);
    }

    //Component:
    function BoxDurationOrPLayingNow({duration, index}){

        var iconPlaying = <img src={istatic.icon_playing()} alt="playingNow"/>;
        var durationComp = <p className="MusicTime">{duration}</p>;

        let match = isPlayingIndex(listId, index);

        if(!prop.playing && match) return <PausedAnim/>;

        return match ? iconPlaying : durationComp
    }

    return (
        <>
        {list.map((music, index) => {
            return (
                <MusicOptionBox 
                    hoverOff={isPlayingIndex(listId, index)} 
                    onClick={() => { clickOnMusic(index, list, listId) }} 
                    key={music.id}
                    >
                    <BoxNumMusic>
                        <NumMusic>{index + 1}.</NumMusic>
                    </BoxNumMusic>
                    <DataMusic>
                        <BoxImgMusic src={music.thumbnails.medium.url} alt="imgMusic" />
                        <Titles>
                            <MusicTitle>{music.title}</MusicTitle>
                            <section>
                                {music.artist.map((artist, index) => {
                                    let space='';
                                    if(index > 0){ space = ',  ' }
                                    return(
                                        <Link 
                                            href={`/artist/${artist.replace(/ /g, '-')}`}
                                            key={index}>
                                            <ChannelName onClick={(e)=>{e.stopPropagation()}}>
                                                {space + artist}
                                            </ChannelName>
                                        </Link>
                                    )
                                })}
                            </section>
                        </Titles>
                    </DataMusic>
                    <MusicTime>
                        <BoxDurationOrPLayingNow duration={music.duration} index={index}/>
                        <BoxIconPLayHover className="iconPlayHover" src={istatic.iconPlay()} alt="iconPlay" />
                    </MusicTime>
                </MusicOptionBox>
            )
        })}
        {!list.length && <p>Nothing</p>}
        </>
    )
}

export default MusicList
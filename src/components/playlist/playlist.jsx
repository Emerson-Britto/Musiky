import React, {useState, useEffect} from 'react'
import { useParams, useHistory } from 'react-router-dom'
import Styled from 'styled-components'

import {S, Ss} from './playlistStyles'

import {getPLaylists} from '../../api'

import { player } from '../../controllers'

import iconPlay from '../../assets/icons/play_arrow_black_24dp.svg'
import icon_playing from '../../assets/icons/AnimatedSvg/playing.svg'
import iconBack from '../../assets/icons/back_icon.svg'


const ViewPort = Styled.section`
    display: flex;
    justify-content: flex-end;
    width: 66%;
    margin: 20vh 0vw 20vh 0vw;
`

const Playlist = ({ loadingStates }) => {

    let history = useHistory()

    const { id } = useParams()

    const [playingIndex, setPLayingIndex] = useState(null)
    const [playlist, setPlaylist] = useState({
        img: null,
        title: null,
        totalMusic: null,
        musicList: []
    })

    const clickOnMusic = (targetIndex, targetList, playlistId) => {
        player.load(targetIndex, targetList, playlistId)
        setPLayingIndex(targetIndex)
    }

    const updateIndex = index => {
        if (id === player.playingInplaylist){
            setPLayingIndex(index)
        }
    }

    useEffect(() => {

        async function getData() {
            let listType = id.split('cs50', 1)
            let data = await getPLaylists('Details', listType[0])

            if(data[id] === undefined){history.push('/404')}

            setPlaylist(data[id])

            if(loadingStates!==undefined){
                loadingStates.appLoading(false)
            }
        }
        getData()

        player.setPlaylistFunction(updateIndex)

        if (id === player.playingInplaylist){
            setPLayingIndex(player.playingIndex)
        }

    },[])

    //Component:
    function BoxDurationOrPLayingNow({music, index}){

        var iconPlaying = <img src={icon_playing} alt="playingNow"/>
        var duration = <p className="MusicTime">{music.contentDetails.duration}</p>

        var playing = playingIndex === index;

        return playing ? iconPlaying : duration
    }

    return (
        <ViewPort>
            <S.PlaylistInfor>
                <S.BackIcon onClick={()=> {history.go(-1)}} src={iconBack} alt='back'/>
                <S.PlayListImg src={playlist.playListImg} alt="PlayList Img"/>
                <S.PlaylistTitle>{playlist.playListTitle}</S.PlaylistTitle>
                <Ss.PlaySubTitle>{playlist.totalMusic} Musics</Ss.PlaySubTitle>                    
            </S.PlaylistInfor>
            <S.MusicList>
            {playlist.musicList.map((music, index) => {
                return (
                    <S.BoxMusic hoverOff={playingIndex === index} 
                                onClick={() => { clickOnMusic(index, playlist.musicList, id) }} 
                                key={index}
                                >
                        <S.BoxNumMusic>
                            <S.NumMusic>{index + 1}.</S.NumMusic>
                        </S.BoxNumMusic>

                        <S.MusicImg src={music.snippet.thumbnails.medium.url} alt="Music img"/>

                        <S.MusicInfor>
                            <S.MusicTitle>{music.snippet.title}</S.MusicTitle>
                            <section>
                                {music.Artist.map((artist, index) => {
                                    let space='';
                                    if(index > 0){ space = ',  ' }
                                    return(
                                        <Ss.ChannelName 
                                            to={`/artist/${artist.replaceAll(' ', '_')}`}
                                            onClick={(e)=>{e.stopPropagation()}}
                                            >
                                            {space + artist}
                                        </Ss.ChannelName>
                                    )
                                })}
                            </section>
                        </S.MusicInfor>

                        <Ss.MusicTime>
                            <BoxDurationOrPLayingNow music={music} index={index}/>
                            <S.BoxIconPLayHover className="iconPlayHover" src={iconPlay} alt="iconPlay" />
                        </Ss.MusicTime>

                    </S.BoxMusic>
                )
            })}
            </S.MusicList>
        </ViewPort>
    )
}

export default Playlist
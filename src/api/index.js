const musikyAPI_Base = 'https://api-musiky.herokuapp.com'

const randomSongs = `${musikyAPI_Base}/randomSongs?totalList=1&totalPerList=10&valueExact=true`
const uri_Mixs = `${musikyAPI_Base}/randomSongs?totalList=5&totalPerList=12&valueExact=false`
const diskList = `${musikyAPI_Base}/diskList?totalDisk=5`


const api = async (uri, options = {}) => {
    return await fetch(uri, options).then(async(res) =>{
        var response = await res.json();
        console.log(response);
        return response;
    }).catch((rej)=> console.log(rej))
}

var lastQuickPicks =[];
export const quickPicks = async (setMusicList) => {
    if(lastQuickPicks.length !== 0){ setMusicList(lastQuickPicks); return}
    let list = await api(randomSongs)
    lastQuickPicks = list['playListDetails']['mix01eMeb-msk-mU51ky4'].musicList;
    setMusicList(lastQuickPicks);
};

var playLists ={};
export const getPLaylists = async (filter) => {
    if(Object.keys(playLists).length !== 0){return playLists[`${filter}`]}
    playLists = await api(uri_Mixs);
    return playLists[`${filter}`];
};

var ambienceSongs =[];
export const getDiskList = async (setDiskList) => {
    if(ambienceSongs.length !== 0){ setDiskList(ambienceSongs); return}
    ambienceSongs = await api(diskList);
    console.log(ambienceSongs)
    setDiskList(ambienceSongs);
};

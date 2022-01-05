import axios from 'axios';
import { Music } from 'common/types';

export const musicDownload = async(music: Music): Promise<void> => {
    if (!music) return
    await axios({
        url:`https://musiky-listen.herokuapp.com/${music.id}`,
        method:'GET',
        responseType: 'blob'
    })
    .then((response) => {
        const url = window.URL
            .createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${music.artists[0]} - ${music.title}.mp3`);
        document.body.appendChild(link);
        link.click();
    })
}

export const multiDownloads = async(list: Array<Music>): Promise<void> => {
    for (let i=0; i < list.length; i++) {
        await musicDownload(list[i]);
    }
}

export const copyContent = (): void => {
    navigator.clipboard.writeText(location.href).then(()=> alert('copied'))
}


export const fromSecondsToTime = (secondsRaw: number): string => {
    let sec_num = Number(secondsRaw.toFixed(0)); //parseInt(secondsRaw, 10);
    let hours: number | string = Math.floor(sec_num / 3600);
    let minutes: number | string = Math.floor((sec_num - (hours * 3600)) / 60);
    let seconds: number | string = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = 0 + hours;}
    if (minutes < 10) {minutes = "0" + minutes;}
    if (seconds < 10) {seconds = "0" + seconds;}
    return `${(hours ? (hours + ':') : '') + minutes + ':' + seconds}`;
}
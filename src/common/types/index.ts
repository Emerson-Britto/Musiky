export interface EventTarget {
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
    dispatchEvent(evt: Event): boolean;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
}
export interface SyntheticEvent {
    bubbles: boolean;
    cancelable: boolean;
    currentTarget: EventTarget;
    defaultPrevented: boolean;
    eventPhase: number;
    isTrusted: boolean;
    nativeEvent: Event;
    preventDefault(): void;
    stopPropagation(): void;
    target: EventTarget;
    timeStamp: Date;
    type: string;
}
export interface Music {
    id: string;
    target: string;
    unavailable?: boolean;
    title: string;
    originTitle: string;
    sourceBy: {
        id: string;
        name: string;
        thumbnails: Array<{ url: string }>;
        subscriber_count: number;
    };
    thumbnails: Array<{ url: string }>;
    duration: string;
    durationSec: number;
    viewCount: number;
    artists: Array<string>;
    comments: {
        list: Array<{
            author: string;
            time: string;
            text: string;
            authorThumb: Array<{url: string}>;
        }>;
        continuation: string;
    } | null;
}
export interface UnavailableMusic {
    id: string;
    unavailable: boolean;
    reason: string;
}
export interface PlaylistProps {
    id: string,
    infors: {
        playlistId: string;
        img: string;
        title: string;
        description: string;
        length: number;
        totalDuration: string;
        startWith?: Music;
    };
    key: string;
    list: Array<Music>;
}
export interface ArtistDataProps {
    name: string;
    id: string;
    images: Array<{ url: string }>;
    followers: {
        total: number;
    };
    genres: Array<string>;
}
export interface PlayerContextData {
    ref: {
        playerRef: any;
    };
    music: Music | null;
    setMusic: (s: Music | null) => void;
    playing: boolean;
    setPlaying: (s: boolean | ((s: boolean) => boolean)) => void;
    volume: number;
    setVolume: (s: number) => void;
    lastVolume: number;
    setLastVolume: (s: number) => void;
    loop: boolean;
    setLoop: (s: boolean | ((s: boolean) => boolean)) => void;
    duration: number;
    setDuration: (s: number) => void;
    seeking : boolean;
    setSeeking: (s: boolean) => void;
    buffer: boolean;
    setBuffer: (s: boolean) => void;
    muted: boolean;
    setMuted: (s: boolean) => void;
}
export interface SplashContextData {
    splash: boolean;
    setSplash: (s: boolean) => void;
}
export interface FeaturedContextData {
    playing: boolean;
    setPlaying: (s: boolean | ((s: boolean) => boolean)) => void;
    AudId: string;
    setAudId: (s: string) => void;
    playingAud: boolean;
    setPlayingAud: (s: boolean | ((s: boolean) => boolean)) => void;
    AudVol: number;
    setAudVol: (s: number) => void;
}
export interface PlaylistContextData {
    playingIndex: number;
    setPlayingIndex: (s: number) => void;
    musiclist: Array<Music>;
    setMusiclist: (s: Array<Music>) => void;
    playlistId: string;
    setPlaylistId: (s: string) => void;
    playlistLoop: boolean;
    setPlaylistLoop: (s: boolean | ((s: boolean) => boolean)) => void;
    playListShuffle: boolean;
    setPlayListShuffle: (s: boolean | ((s: boolean) => boolean)) => void;
    on: {
        ended: {
            current: null | (() => Promise<PlaylistProps>);
        };
    };
}
interface Lyric {
  [key: string]: string;
}
export interface LyricContextData {
    lyric: Lyric;
    setLyric: (s: Lyric) => void;
    currentLine: string;
    setCurrentLine: (s: string) => void;
    currentIndex: number;
    setCurrentIndex: (s: number) => void;
    showLyrics: boolean;
    setShowLyrics: (s: boolean | ((s: boolean) => boolean)) => void;
    hasLyric: boolean;
    setHasLyric: (s: boolean | ((s: boolean) => boolean)) => void;
}
export interface DataHistory {
    id: string;
    type: string;
    time: number;
    playlist?: {
        id: string | null;
        link: string | null;
    };
}
export interface AccountContextData {
    auth: string;
    setAuth: (s: string) => void;
    displayName: string;
    setDisplayName: (s: string) => void;
    profileImg: string;
    setProfileImg: (s: string) => void;
    history: DataHistory[];
    setHistory: (s: DataHistory[]) => void;
}

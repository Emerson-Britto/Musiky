class playerModule {
	constructor(){
        this._playerComponent = null
        this._playerSubscribe = null

        this._backgroundSubscribe = null

        this._playerControlSubscribe = null

        this._playlistSubscribe = null

        this._headerSubscribe = null

		this.musicId = null
		this.indexOnPlaylist = 0
		this.playlistId = null
		this.musicList = []
		this.playing = false
		this.volume = 1
		this.lastVolume = 0
		this.showLyrics = false
		this.loop = false
		this.currentTime = 0
		this.duration = 0
		this.seeking = false
		this.buffer = false
		this.muted = false
	}


    setPlayerComponent(player, functionToNotify){
        this._playerComponent = player
        this._playerSubscribe = functionToNotify
    }

    setBackgroundFunction(functionToNotify){
        this._backgroundSubscribe = functionToNotify
    }

    setPlayerControlFunction(functionToNotify){
        this._playerControlSubscribe = functionToNotify
    }

    setPlaylistFunction(functionToNotify){
        this._playlistSubscribe = functionToNotify
    }

    setHeaderFunction(functionToNotify) {
        this._headerSubscribe = functionToNotify
    }


    notify(){
        this._playerSubscribe({ musicId: this.musicId, playing: this.playing, volume: this.volume, showLyrics: this.showLyrics, loop: this.loop })
        this._playerControlSubscribe({ indexOnPlaylist: this.indexOnPlaylist, playing: this.playing, musicList: this.musicList, currentTime: this.currentTime, volume: this.volume, lyricMode: this.showLyrics, buffer: this.buffer, muted: this.muted })
        //this._headerSubscribe(this.showLyrics)
        //this._playlistSubscribe(this.indexOnPlaylist)
        //this._backgroundSubscribe( this.indexOnPlaylist, this.musicList )
    }


	load(targetIndex, targetList, playlistId='') {
		this.musicList = targetList
		this.indexOnPlaylist = targetIndex
        this.playlistId = playlistId
		this.musicId = targetList[targetIndex].id
		this.playing = true
        this.notify()
    }

    set changeBufferStatusTo(status) {
        this.Buffer = status
        this.notify()
    }

    nextMusic(action) {
        if (this.indexOnPlaylist === this.musicList.length -1){
            this.indexOnPlaylist = 0;
            this.notify()
            return
        }
	    this.indexOnPlaylist = this.indexOnPlaylist + action
	    this.playing = true
        this.notify()
    }

    lyricsScreen() {
    	this.showLyrics = !this.showLyrics
        this.notify()
    }

    closeLyrics() {
        this.showLyrics = false
        this.notify()
    }

    toggleLoop() {
    	this.loop = !this.loop
        this.notify()
    }

    play_Pause() {
    	this.playing = !this.playing
        this.notify()
    }

    seekTo(value) {
        this.seeking = false
        this._playerComponent.seekTo(parseFloat(value));
    }

    setSeekingStatesTo(states) {
    	this.seeking = states
    }

    setCurrentTimeTo(played) {
        console.log(played)
    	if (!this.seeking) {
            console.log(played)
            this.currentTime = played
            this.notify()
        }
    }

    set setDuration(duration) {
    	this.duration = duration
        this.notify()
    }

    set setVolumeTo(value) {
    	if(this.muted){ this.muted = false }
        if(value === 0){ this.muted = true }
        this.volume = value
        this.notify()
    }

    toggleMuted() {
        if(this.muted){
            this.volume = this.lastVolume 
            this.muted = false
            this.notify()
            return
        }
        this.lastVolume = this.volume
        this.volume = 0
        this.muted = true
        this.notify()
    }
}

export const player = new playerModule()
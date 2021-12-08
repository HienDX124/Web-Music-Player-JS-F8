//  Music player 3 (redo)

/*
    1.  Render songs
    2.  Scroll top
    3.  Play / pause / seek
    4.  CD rotate
    5.  Next / prev
    6.  Random
    7.  Next / Repeat when ended
    8.  Active song
    9.  Scroll active song into view
    10.  Play song when click
*/

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const PLAYER_STORAGE_KEY = 'F8_PLAYER';

const playlist = $(".playlist");
const cd = $(".cd");
const cdWidth = cd.offsetWidth;
const heading = $("header h2");
const cdThumb = $(".cd-thumb");
const audio   = $("#audio");
const playBtn = $(".btn-toggle-play");
const player  = $(".player");
const progress = $(".progress");
const dashboard = $(".dashboard");
const nextBtn = $(".btn-next");
const prevBtn = $(".btn-prev");
const randomBtn = $(".btn-random");
const repeatBtn = $(".btn-repeat");
const volumeElement = $(".volume");

const app ={
    currentIndex : 0,
    isPlaying: false,
    valueWhenChange:0,
    isRandom: false,
    isRepeat: false,
    prevSongIndex:null,
    newVolumeValue: 1,
    songs : [
        {
            name: "Em dạo này",
            singer: "Ngọt",
            path: "./music/Em Dao Nay - Ngot.mp3 ",
            image: "./img/emDaoNay.png"
        },
        {
            name: "Sài Gòn đau lòng quá",
            singer: "Ngô Lan Hương (Cover)",
            path: "./music/SaiGonDauLongQua-HuaKimTuyenHoangDuyen-6992977.mp3",
            image: "./img/SaiGonDauLongQua.png"
        },
        {
            name: "At my worst",
            singer: "Pink Sweat",
            path: "./music/At My Worst - Pink Sweat_.mp3",
            image: "./img/At_my_worst.png"
        },
        {
            name:"Lemon tree",
            singer: "DJ DESA",
            path: "./music/Lemon_tree_DJ_DESA.mp3",
            image:"./img/Lemon_tree_DJ_DESA.png"
        },
        {
            name:"Legendary (Nightcore)",
            singer:"Syrex",
            path: "./music/Nightcore - Legendary.mp3",
            image: "./img/legendary_nightcore.png"
        },
        {
            name:"We don't sleep at night (Nightcore)",
            singer:"Syrex",
            path: "./music/Nightcore - We Don't Sleep At Night - (Lyrics).mp3",
            image: "./img/we_dont_sleep_at_night.png"
        },
        {
            name:"Rise",
            singer:"The Glitch Mob, Mako, and The Word Alive",
            path: "./music/RISE - LOL.mp3",
            image: "./img/RISE_LOL.png"
        },
        {
            name:"Nothing stopping me",
            singer: "Vicetone",
            path: "./music/Notthing stopping me - NightCore.mp3",
            image:"./img/Notthing_stopping_me_NightCore.png"
        },
        {
            name: "Save me",
            singer: "DEAMN",
            path: "./music/Save Me - Nightcore.mp3",
            image: "./img/Save_Me_Nightcore.png"
        },
        {
            name:"Legend never die",
            singer:"Alan Walker",
            path: "./music/Legend_never_die_LOL.mp3",
            image: "./img/Legend_never_die_LOL.png"
        },
        {
            name:"Ignite",
            singer:"Zedd",
            path: "./music/Ignite (ft. Zedd)LOL.mp3",
            image: "./img/ignite-LOL.png"
        },
        {
            name: "Còn lại gì sau cơn mưa",
            singer: "Hồ Quang Hiếu",
            path: "./music/[MV] Còn Lại Gì Sau Cơn Mưa - Hồ Quang Hiếu (Lyrics).mp3",
            image: "./img/clgscm.png"
        },
        {
            name: "Haru Haru",
            singer: "Big Bang",
            path: "./music/BIGBANG - HARU HARU.mp3",
            image: "./img/haru_haru.png"
        },
        {
            name: "Con bướm xuân (Remix)",
            singer: "Hồ Quang Hiếu",
            path: "./music/Con Bướm Xuân - Hồ Quang Hiếu [Remix].mp3",
            image: "./img/Con_buom_xuan.png"
        },
        {
            name: "Con Đường Mưa",
            singer: "Cao Thái Sơn",
            path: "./music/Con Đường Mưa - Cao Thái Sơn [Lyric].mp3",
            image: "./img/Con_duong_mua.png"
        },
        {
            name: "Dấu mưa",
            singer: "Trung Quân idol",
            path: "./music/Dấu mưa _ Trung Quân Idol.mp3",
            image: "./img/Dau_mua.png"
        },
        {
            name: "Day by day",
            singer: "T-Ara",
            path: "./music/day_by_day.mp3",
            image: "./img/day_by_day.png"
        },
        {
            name: "Đôi mắt",
            singer: "Wanbi Tuấn Anh",
            path: "./music/Đôi Mắt _ Wanbi Tuấn Anh .mp3",
            image: "./img/doi_mat.png"
        },
        {
            name: "Khi người lớn cô đơn",
            singer: "Phạm Hồng Phước",
            path: "./music/Khi Người Lớn Cô Đơn _ Phạm Hồng Phước _ Official MV.mp3",
            image: "./img/Khi_nguoi_lon_co_don.png"
        },
        {
            name: "Ngã tư đường",
            singer: "Hồ Quang Hiếu",
            path: "./music/NGÃ TƯ ĐƯỜNG _ Hồ Quang Hiếu.mp3",
            image: "./img/Nga_tu_duong.png"
        },
        {
            name: "Nụ hồng mong manh",
            singer: "Hi anh trai",
            path: "./music/Nu_hong_mong_manh.mp3",
            image: "./img/Nu_hong_mong_manh.png"
        },
        {
            name: "Phai dấu cuộc tình",
            singer: "Quang Vinh cover",
            path: "./music/Quang Vinh - Phai Dấu Cuộc Tình (黄昏 Cover).mp3",
            image: "./img/phai_dau_cuoc_tinh.png"
        },
        {
            name: "Roly poly",
            singer: "T-Ara",
            path: "./music/T-ara-Roly Poly (Dance Ver.).mp3",
            image: "./img/roly_poly.png"
        },
        {
            name: "Teen vọng cổ",
            singer: "Vĩnh Thuyên Kim",
            path: "./music/Teen Vọng Cổ   Vĩnh Thuyên Kim - 2010.mp3",
            image: "./img/vong_co_teen.png"
        },
        {
            name: "Thất tình",
            singer: "Trịnh Đình Quang",
            path: "./music/Thất Tình   Trịnh Đình Quang.mp3",
            image: "./img/that_tinh.png"
        },
        {
            name: "Tình đơn phương",
            singer: "Dương Edward Nguyễn",
            path: "./music/TÌNH ĐƠN PHƯƠNG ACOUSTIC COVER - Edward Duong Nguyen Ft Tùng Acoustic.mp3",
            image: "./img/Tinh_don_phuong.png"
        },
        {
            name: "Chocolate",
            singer: "Trang Pháp",
            path: "./music/Trang Pháp - Chocolate.mp3",
            image: "./img/Chocolate.png"
        },
        {
            name: "Vết mưa",
            singer: "Vũ Cát Tường",
            path: "./music/Vết mưa - Vũ Cát Tường.mp3",
            image: "./img/Vet_mua.png"
        },
    ],
    renderNormal: function() {
        var htmls = this.songs.map(function(song, index) {
            //  Lưu ý xịn xò:
            return `
                <div class="song index-${index}" index="${index}" data-index="${index}" >
                    <div class="thumb"
                        style="background-image:url('${song.image}')">
                    </div>
                    <div class="body">
                        <h3 class="title" >${index}. ${song.name}</h3>
                        <p  class="author">${song.singer}</p>
                    </div>
                    <div class="option">
                        <i class="fas fa-ellipsis-h"></i>
                    </div>
                </div>`
        });
        var html = htmls.join("");
        playlist.innerHTML = html;
        this.setActiveSong();
    },

    handleEvents:function() {
        const _this = this;
        //  Xử lý lăn chuột, làm mờ và thu nhỏ CD
        document.onscroll = function() {
            const scrollTop = document.documentElement.scrollTop || window.scrollY ;
            var newCdWidth = cdWidth - scrollTop;
            if (newCdWidth <= 0) {
                newCdWidth = 0;
            }
        cd.style.width = newCdWidth +'px';
        cd.style.opacity = newCdWidth / cdWidth;
        };

        //  Xử lý CD quay
        const cdThumbAnimate = cdThumb.animate([
            { transform: "rotate(360deg)"}  //  chuyển dạng: quay 360 độ
        ], {
            duration: 10000,    //  Thời gian để quay hết 1 vòng
            iterations: Infinity   //  Số vòng quay: vô hạn
        });
        cdThumbAnimate.pause(); //  Mặc định khi bắt đầu, CD đang pause

        //  Xử lý click nút play
        playBtn.onclick = function () {
            if (_this.isPlaying) {
                audio.pause();
            }
            else {
                audio.play();
            }
        };

        //  Khi bài hát được play
        audio.onplay = function () {
            _this.isPlaying = true;
            player.classList.add("playing");
            cdThumbAnimate.play();
            _this.setActiveSong();
        };


        //  Khi bài hát được pause
        audio.onpause = function () {
            cdThumbAnimate.pause();
            _this.isPlaying = !_this.isPlaying;
            player.classList.remove("playing");
        };



        //  Nhóm lệnh xử lý thanh progress và tiến trình thực:
            //  Update thanh tiến trình hiện tại của bài hát
            //  Người dùng tua bài hát

        //  Lắng nghe sự kiện khi người dùng bắt đầu tua (nhấn chuột xuống, giữ và kéo)
        progress.oninput= function () {
            var progressChange = (progress.value / 100)*audio.duration; //  Chuyển đổi từ giá trị của progress (giá trị %) về sang số giây tương ứng
            _this.valueWhenChange = progressChange; //  Gán số giây vừa tìm được vào 1 biến ở ngoài hàm này để sử dụng ở ngoài hàm
            audio.ontimeupdate = null;  //  Cho ngưng timeupdate để không update thanh progress (không ảnh hưởng đến tiến trình thực), tạo sự dễ chịu cho người dùng
            
        };

        //  Lắng nghe sự kiện khi kết thúc tua (nhả chuột ra)
        progress.onmouseup = function () {
            //  Khi người dùng đã tua xong (thể hiện bằng việc nhả chuột ra)
            _this.updateRealProgerss(); //  Sẽ update tiến trình thực của bài hát
            _this.updateProgress();     //  Và update luôn thanh progress
        }

        //  Xử lý khi nhấn nút next (chuyển đến bài kế tiếp)
        nextBtn.onclick = function () {
            _this.removeActiveSong();
            if (_this.isRandom) {
                // _this.prevSongIndex = _this.currentIndex;
                _this.setRandomSong();
                _this.setActiveSong();
                _this.scrollToActiveSong();
                _this.loadCurrentSong();
                audio.play();
            }
            else {
                _this.toNextSong();
                _this.setActiveSong();
            }            
        };

        //  Xử lý khi nhấn nút prev (chuyển đến bài trước đó)
        prevBtn.onclick = function () {
            _this.removeActiveSong();
            _this.scrollToActiveSong();
            _this.toPrevSong();
            _this.setActiveSong();
        };

        //  Xử lý bật / tắt nút random song
        randomBtn.onclick = function () {
            _this.isRandom = !_this.isRandom;
            randomBtn.classList.toggle("active", _this.isRandom);
        };

        //  Xử lý bật / tắt nút repeat ( khi hết bài hát )
        repeatBtn.onclick = function () {
            _this.isRepeat = !_this.isRepeat;
            repeatBtn.classList.toggle("active",_this.isRepeat);
        };

        //  Lắng nghe sự kiện khi bài hát kết thúc
        audio.onended = function () {
            _this.removeActiveSong();
            if (_this.isRepeat) {
                _this.setRepeatSong();
                _this.loadCurrentSong();
                audio.play();
            }
            else {
                if (_this.isRandom) {
                    _this.prevSongIndex = _this.currentIndex;
                    _this.setRandomSong();
                    _this.loadCurrentSong();
                    audio.play();
                }
                else {
                    _this.toNextSong();
                }
            }
        };
        //  Xử lý điều chỉnh âm lượng bằng cách lăn chuột trên dashboard
        dashboard.onmousewheel = function (mouseEvent) {
            mouseEvent.preventDefault();
            if (mouseEvent.deltaY < 0) {
                _this.newVolumeValue += 0.1;
                if (_this.newVolumeValue > 1) {
                    _this.newVolumeValue = 1;
                }
                audio.volume = _this.newVolumeValue;
                volumeElement.value = _this.newVolumeValue *100;
            }
            else {
                _this.newVolumeValue -= 0.1;
                if (_this.newVolumeValue < 0) {
                    _this.newVolumeValue = 0;
                }
                audio.volume = _this.newVolumeValue;
                volumeElement.value = _this.newVolumeValue *100;
            }
            _this.showVolume(Math.floor(volumeElement.value))
        };

        //  Xử lý điều chỉnh âm lượng bằng cách chọn trên thanh progress
        volumeElement.onchange = function () {
            _this.newVolumeValue = volumeElement.value/100;
            audio.volume = _this.newVolumeValue;
            _this.showVolume(Math.floor(volumeElement.value));
        }

        //  Xử lý khi nhấn vào bài hát trên playlist
        playlist.onclick = function (mouseEvent) {
            var songNotActive = mouseEvent.target.closest(".song:not(.active)")
            var optionElement = mouseEvent.target.closest('.option')
            if ( songNotActive || optionElement ) 
            {
                if (mouseEvent.target.closest(".option")) {
                    console.log(optionElement);
                }
                else{
                    _this.removeActiveSong();
                    _this.currentIndex = Number(songNotActive.dataset.index);   // Dòng lệnh này có chức năng tương tụ dòng kế tiếp
                    // _this.currentIndex = songNotActive.getAttribute("index");
                    _this.setActiveSong();
                    _this.loadCurrentSong()
                    audio.play();
                }
            }        
        };

    },
    defineProperties: function() {
        Object.defineProperty(this,'currentSong', {
            get: function() {9
                return this.songs[this.currentIndex];
            }
        });
    },

    loadCurrentSong: function() {
        heading.textContent = `${this.currentIndex}. ${this.currentSong.name}`;
        cdThumb.style.backgroundImage = `url(${this.currentSong.image})`
        audio.src = `${this.currentSong.path}`

    },
    
    updateRealProgerss: function () {    //  Hàm update tiến trình thực (tiến trình bài hát)
        audio.currentTime = this.valueWhenChange ;  //  Gán tiến trình bài hát thành giá trị được tua đến
    },

        //  Sở dĩ có phải tách làm 2, để khi người dùng mới chỉ đang tua mà chưa nhả chuột
        //  Thì thanh progress sẽ không update, nhưng nhạc vẫn sẽ phát tiếp
        //  Tới khi người dùng nhả chuột (mouseup) thì mới update tiến trình thực của bài hát
    updateProgress: function () {    //  Hàm update tiến trình để hiển thị cho user (hiển thị trên thanh progress)
        audio.ontimeupdate = function (mouseEvent) {    //  Khi bài hát đang phát, thời gian thay đổi, nhận giá trị thay đổi đó và update lên thanh progress
            const newProcess = ((Math.floor(mouseEvent.target.currentTime / audio.duration*100)));  //  Gán tiến trình được thay đổi mỗi khi bài hát update tiến trình (1 giây update khoảng 4 lần) vào 1 biến mới
            progress.value = newProcess;    //  Gán giá trị thanh progress cho biến mới trên
        };
    },

    toNextSong: function () {
            this.prevSongIndex = this.currentIndex;
            this.currentIndex += 1;
            if (this.currentIndex >= this.songs.length) {this.currentIndex = 0;}; 
            this.loadCurrentSong();
            audio.play();
    },

    toPrevSong: function () {
        this.currentIndex -= 1;
        if (this.currentIndex < 0) {this.currentIndex = this.songs.length-1;};     
        this.loadCurrentSong();
        audio.play();
    },

    setRandomSong: function () {
        do var newIndex = (Math.floor(Math.random() * (this.songs.length-1)));
        while (newIndex == this.currentIndex) {
        }
        this.currentIndex = newIndex;

    },

    setRepeatSong: function () {
        audio.currentTime = 0;
    },

    setActiveSong: function () {
        var songActive = $(`.song.index-${this.currentIndex}`);
        songActive.classList.add("active");
        this.scrollToActiveSong();
    },

    removeActiveSong: function () {
        var songActive = $(`.song.index-${this.currentIndex}`);
        songActive.classList.remove("active");
    },


    scrollToActiveSong: function () {
        var songActive = $(`.song.index-${this.currentIndex}`);
        songActive.scrollIntoView({
            block : "center",
            behavior : "smooth"
        });
    },

    showVolume: function (volumeValue) {
        var showVolumeE = $(".volume-show");
        showVolumeE.innerHTML = volumeValue;
        setTimeout(function () {
            showVolumeE.innerHTML = `&nbsp;`;            
        },2000);
    },

    start: function() {
        this.renderNormal();
        this.setActiveSong();
        this.updateProgress(); //  Mặc định khi nhạc phát, tiến trình sẽ được cập nhật
        this.defineProperties();
        this.handleEvents();
        this.loadCurrentSong();

    }
}

app.start();

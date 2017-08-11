/*!
 *
 * Created by chenjie on 2017/8/9.
 */
$(function() {
    var self;
    var CanvasTool = window.CanvasTool = null;
    console.log(window);
    CanvasTool = window.CanvasTool = function(options) {
        this.$el = $(
            '<div class="canvas_tool" style="background-color:rgba(0,0,0,0.8);position:relative;border: 1px solid #ddd;"></div>'
        );
        this.$canvasWrapper = $(
            '<div class="canvas-wrapper" style="display:inline-block;overflow:hidden;position:relative;width:100%;height:100%;"></div>'
        );
        this.$_text = $(
            '<span style="visibility:hidden;font:18px weiruanyahei;"></span>'
        );
        this.$canvas = $(
            '<canvas id="canvas"></canvas>'
        );
        this.$bak_canvas = $(
            '<canvas id="bak_canvas"></canvas>'
        );
        this.$switch_left = $(
            '<div class="switch switch_prev" style="position: absolute;top: 50%;left: 20px;z-index: 999;">' +
                '<img src="image/arrow-left.png" alt="">' +
            '</div>'
        );
        this.$switch_right = $(
            '<div class="switch switch_next" style="position: absolute;top: 50%;right: 20px;z-index: 999;">' +
                '<img src="image/arrow-right.png" alt="">' +
            '</div>'
        );
        this.$image_labeler = $(
            '<div class="image-labeler" style="display: inline-block;position: absolute;top: 20px;left: 20px;color: #999;z-index: 1000;">' +
                '<span>1</span>' +
                '/' +
                '<span>3</span>' +
            '</div>'
        );
        this.$tools = $(
            '<div class="canvas-tools" style="z-index: 999;">'+
                '<a href="javascript:void(0)" class="line"></a>'+
                '<a href="javascript:void(0)" class="text"></a>'+
                '<a href="javascript:void(0)" class="yes"></a>'+
                '<a href="javascript:void(0)" class="cancel"></a>'+

                '<a href="javascript:void(0)" class="large-and-small large"></a>'+
                /*'<a href="javascript:void(0)" class="large"></a>'+
                 '<a href="javascript:void(0)" class="small"></a>'+*/
                '<a href="javascript:void(0)" class="rotate-right"></a>'+
                '<a href="javascript:void(0)" class="move"></a>'+
                '<a href="javascript:void(0)" class="fullscreen"></a>'+
                /*'<a href="javascript:void(0)" class="exitfullscreen"></a>'+*/


                /*'<a href="javascript:void(0)" class="rotate-left">左旋转</a>'+

                 '<a href="javascript:void(0)" class="scrawl">涂鸦</a>'+

                 '<a href="javascript:void(0)" class="rect">矩形</a>'+
                 '<a href="javascript:void(0)" class="circle">园</a>'+
                 '<a href="javascript:void(0)" class="no">×</a>'+



                 '<a href="javascript:void(0)" class="redo">重做下一步</a>'+
                 '<a href="javascript:void(0)" class="download">下载</a>'+*/

            '</div>'
        );
        this.defaults = {
            imgSrc: null,
            width: 800,
            height: 400,
            srcArr: []
        };
        this.status = {
            url:[],
            deg: 0,
            percent: 1,
            type: '',
            beginClientX: null,
            beginClientY: null,
            beginX: null,
            beginY: null,
            cancelList: [],
            cancelIndex: 0,
            isDown: false,
            isDrag: false,
            scrollTop: null,
            scrollLeft: null,
            $currentText: null,
            currentText: '',
            textX: null,
            textY: null,
            fullScreen: false
        };
        this.setting = $.extend({},this.defaults,options);
        self = this;
        /*$.extend(this.setting, setting || {});*/
        console.log(this.setting)
        this.init();
    };
    $.extend(CanvasTool.prototype, {
        init: function() {
            this.$el.width(this.setting.width);
            this.$el.height(this.setting.height);
            var that = this;
            this.$el.append(that.$tools).append(that.$_text).append(that.$switch_left).append(that.$switch_right).append(that.$image_labeler);
            self.initPicture();
            setTimeout(function(){
                self.switch();
            },500);
        },
        initPicture:function(){
            self.status.cancelList= [];
            self.status.cancelIndex= 0;
            console.log(self.setting.srcArr);
            var canvas = this.$canvas[0];
            var context = canvas.getContext('2d');
            var bak_canvas = this.$bak_canvas[0];
            var bak_context = bak_canvas.getContext('2d');
            if(this.setting.srcArr.length !== 0) {
                var img = new Image();
                img.crossOrigin = "*";
                img.src = this.setting.srcArr[0];
                img.onload = function(e){
                    //var img = e.currentTarget;
                    canvas.width = img.width;
                    canvas.height = img.height;
                    bak_canvas.width = img.width;
                    bak_canvas.height = img.height;
                    context.drawImage(img , 0 ,0);
                    self.status.cancelList.push(canvas.toDataURL());
                    self.$el.append(
                        self.$canvasWrapper
                            .append($('<div style="position: absolute;border:1px solid #eee;">').append(self.$canvas))
                            .append($('<div style="position: absolute;border:1px solid #eee;">').append(self.$bak_canvas))
                    );
                    self.reSetPosition();
                    self.initEvents();
                };
            }
        },
        switch:function(){
            if(self.setting.srcArr.length === 0)return;
            var index = 0;
            $('.switch_prev').off('click').on('click',function(){
                if($('.large-and-small').hasClass('small')){
                    $('.large-and-small').click();
                }
                self.setting.srcArr[index] = self.status.cancelList[self.status.cancelList.length-1];
                self.status.url[index] = self.setting.srcArr[index];
                index--;
                if(index<0){
                    index = self.setting.srcArr.length-1;
                }
                self.switchPicture(self.setting.srcArr[index]);
            });
            $('.switch_next').off('click').on('click',function(){
                if($('.large-and-small').hasClass('small')){
                    $('.large-and-small').click();
                }
                self.setting.srcArr[index] = self.status.cancelList[self.status.cancelList.length-1];
                self.status.url[index] = self.setting.srcArr[index];
                index++;
                if(index >= self.setting.srcArr.length){
                    index = 0;
                }
                /*console.log(self.status.url);*/
                self.switchPicture(self.setting.srcArr[index]);
            });
        },
        switchPicture:function(src){
            /*setTimeout(function(){*/
            self.clearCanvas();
            var canvas = this.$canvas[0];
            var context = canvas.getContext('2d');
            var bak_canvas = this.$bak_canvas[0];
            var img = new Image();
            self.status.cancelList= [];
            self.status.cancelIndex= 0;
            self.status.percent = 1;
            img.src = src;
            img.onload = function(e){
                canvas.width = img.width;
                canvas.height = img.height;
                bak_canvas.width = img.width;
                bak_canvas.height = img.height;
                $('#canvas').css({
                    'width': img.width,
                    'height': img.height
                });
                $('#bak_canvas').css({
                    'width': img.width,
                    'height': img.height
                });
                console.log($('#canvas').css('width'));
                context.drawImage(img , 0 ,0);
                self.status.cancelList.push(canvas.toDataURL());
                self.reSetPosition();
            };
        },
        clearCanvas:function(){
            var canvas = this.$canvas[0];
            var context = canvas.getContext('2d');
            var bak_canvas = this.$bak_canvas[0];
            var bak_context = bak_canvas.getContext('2d');
            context.clearRect(0, 0, canvas.width, canvas.height);
            bak_context.clearRect(0, 0, bak_canvas.width, bak_canvas.width);
        },
        initEvents: function() {
            var that = this,
                canvas = this.$canvas[0],
                bak_canvas = this.$bak_canvas[0];
            this.$el.find('.large-and-small').off('click').click(function() {
                if(that.status.percent==0.5) {
                    that.status.type = 'small';
                    $(this).addClass('large').removeClass('small');
                }else {
                    that.status.type = 'large';
                    $(this).addClass('small').removeClass('large');
                }
                that.size(that.status.type);
                bak_canvas.style.cursor = 'default';
            });
            /*this.$el.find('.large').click(function() {
             that.status.type = 'large';
             that.size('large');
             bak_canvas.style.cursor = 'default';
             });
             this.$el.find('.small').click(function() {
             that.status.type = 'small';
             that.size('small');
             bak_canvas.style.cursor = 'default';
             });*/
            this.$el.find('.move').off('click').on('click',function() {
                that.status.type = 'move';
                bak_canvas.style.cursor = 'url(image/drag-02.png), move';
            });
            this.$el.find('.rotate-left').off('click').on('click',function() {
                that.status.type = 'rotate-left';
                that.rotate('left');
                bak_canvas.style.cursor = 'default';
            });
            this.$el.find('.rotate-right').off('click').on('click',function() {
                that.status.type = 'rotate-right';
                that.rotate('right');
                bak_canvas.style.cursor = 'default';
            });
            this.$el.find('.scrawl').off('click').on('click',function() {
                that.status.type = 'scrawl';
                bak_canvas.style.cursor = 'default';
            });
            this.$el.find('.line').off('click').on('click',function() {
                that.status.type = 'line';
                bak_canvas.style.cursor = 'url(image/13-2.png), crosshair';
            });
            this.$el.find('.rect').off('click').on('click',function() {
                that.status.type = 'rect';
                bak_canvas.style.cursor = 'default';
            });
            this.$el.find('.circle').off('click').on('click',function() {
                that.status.type = 'circle';
                bak_canvas.style.cursor = 'default';
            });
            this.$el.find('.yes').off('click').on('click',function() {
                that.status.type = 'yes';
                bak_canvas.style.cursor = 'url(image/15-1.png), default';
            });
            this.$el.find('.no').off('click').on('click',function() {
                that.status.type = 'no';
                bak_canvas.style.cursor = 'default';
            });
            this.$el.find('.text').off('click').on('click',function() {
                that.status.type = 'text';
                bak_canvas.style.cursor = 'url(image/14-1.png), default';
            });
            this.$el.find('.cancel').off('click').on('click',function() {
                that.status.type = 'cancel';
                that.cancel(that);
                bak_canvas.style.cursor = 'default';
            });
            this.$el.find('.redo').off('click').on('click',function() {
                that.status.type = 'cancel';
                that.redo(that);
                bak_canvas.style.cursor = 'default';
            });
            this.$el.find('.fullscreen').off('click').on('click',function() {
                that.status.fullScreen ? that.exitfullscreen() : that.fullscreen();
                bak_canvas.style.cursor = 'default';
            });
            this.$el.find('.exitfullscreen').off('click').on('click',function() {
                that.exitfullscreen();
                bak_canvas.style.cursor = 'default';
            });

            this.$bak_canvas.off('mousedown').on('mousedown', that.mousedown.bind(that));
            this.$bak_canvas.off('mousemove').on('mousemove', that.mousemove.bind(that));
            this.$bak_canvas.off('mouseup').on('mouseup', that.mouseup.bind(that));
            this.$bak_canvas.off('mouseout').on('mouseout', that.mouseout.bind(that));
            document.addEventListener("fullscreenchange", function () {
                that.$el.height('100%').width('100%');
                that.reSetPosition();
            });
            document.addEventListener("mozfullscreenchange", function () {
                that.$el.height('100%').width('100%');
                that.reSetPosition();
            });
            document.addEventListener("webkitfullscreenchange", function () {
                that.$el.height('100%').width('100%');
                that.reSetPosition();
            });
            document.addEventListener("msfullscreenchange", function () {
                that.$el.height('100%').width('100%');
                that.reSetPosition();
            });
        },
        mousedown: function(e) {
            var that = this,
                canvas = this.$canvas[0],
                context = canvas.getContext('2d'),
                bak_canvas = this.$bak_canvas[0],
                bak_context = bak_canvas.getContext('2d'),
                currentX = e.offsetX,
                currentY = e.offsetY,
                currentClientX = e.clientX,
                currentClientY = e.clientY,
                percent = this.status.percent,
                width = this.$canvas.width(),
                height = this.$canvas.height(),
                offsetLeft = this.$canvas.parent()[0].offsetLeft,
                offsetTop = this.$canvas.parent()[0].offsetTop,
                positionXO = width<height ? (height-width)/2 : (width-height)/2,
                positionYO = width<height ? (width-height)/2 : (height-width)/2,
                deg = this.status.deg;
            this.status.beginClientX = currentClientX;
            this.status.beginClientY = currentClientY;
            this.status.beginX = currentX;
            this.status.beginY = currentY;
            this.status.isDown = true;
            if(this.status.type!=='text') {
                this.status.$currentText && this.status.$currentText.remove();
            }
            if(this.status.type==='large') {

            }else if(this.status.type==='small') {

            }else if(this.status.type==='move') {
                this.status.isDrag = true;
            }else if(this.status.type==='line') {

            }else if(this.status.type=='rect') {

            }else if(this.status.type=='circle') {

            }else if(this.status.type=='yes') {
                bak_context.save();
                bak_context.beginPath();
                this.clearBakCanvas();
                bak_context.lineWidth=2;
                bak_context.strokeStyle = 'red';
                bak_context.translate(currentX*percent, currentY*percent);
                bak_context.rotate(-deg*Math.PI/180);
                bak_context.moveTo(0, 0);
                bak_context.lineTo((20/percent)*Math.sin(30*Math.PI/180), (20/percent)*Math.cos(30*Math.PI/180));
                bak_context.lineTo(20/percent*Math.cos(30*Math.PI/180)/Math.tan(30*Math.PI/180), -20/percent*Math.sin(30*Math.PI/180)/Math.tan(30*Math.PI/180));
                bak_context.stroke();
                bak_context.restore();
            }else if(this.status.type=='no') {
                context.save();
                context.lineWidth=2;
                context.translate(currentX*percent, currentY*percent);
                context.rotate(-deg*Math.PI/180);
                context.moveTo(0, 0);
                context.lineTo(-15/percent*Math.tan(45*Math.PI/180), 15/percent*Math.tan(45*Math.PI/180));
                context.moveTo(0, 0);
                context.lineTo(15/percent*Math.tan(45*Math.PI/180), 15/percent*Math.tan(45*Math.PI/180));
                context.moveTo(0, 0);
                context.lineTo(15/percent*Math.tan(45*Math.PI/180), -15/percent*Math.tan(45*Math.PI/180));
                context.moveTo(0, 0);
                context.lineTo(-15/percent*Math.tan(45*Math.PI/180), -15/percent*Math.tan(45*Math.PI/180));
                context.stroke();
                context.restore();
                this.saveCancelList();
            }else if(this.status.type=='scrawl') {
                bak_context.beginPath();
                bak_context.moveTo(currentX*percent, currentY*percent);
            }else if(this.status.type==='text') {
                this.$el.find('#canvas-text').focus();
                if(this.status.$currentText) {
                    var $currentText = this.status.$currentText,
                        currentText = this.status.currentText;
                    currentText&&currentText.forEach(function(v, i) {
                        context.save();
                        context.font = '18px weiruanyahei';
                        context.fillStyle = 'red';
                        context.translate(that.status.textX*percent, that.status.textY*percent);
                        context.rotate(-deg*Math.PI/180);
                        v && context.fillText(v, 0, 18*(i+1));
                        context.restore();
                    });
                    this.status.$currentText.remove();
                    this.status.$currentText = null;
                    this.status.currentText = null;
                    this.saveCancelList();
                }else {
                    this.status.textX = currentX;
                    this.status.textY = currentY;
                    var fontSize = 18/percent,
                        css = {
                            'font': fontSize+'px weiruanyahei',
                            'position': 'absolute',
                            'background': 0,
                            'overflow-y': 'hidden',
                            'resize': 'none',
                            'padding': 0,
                            'width': '18px'
                        },
                        $text = $('<textarea id="canvas-text"></textarea>'),
                        maxWidth = 0;
                    if (deg % 360 == 0) {
                        $.extend(css, {
                            'left': currentX + offsetLeft,
                            'top': currentY + offsetTop,
                            /*'max-width': width - currentX,*/
                            'max-height': height - currentY
                        });
                        maxWidth = width-currentX;
                    } else if (deg % 180 == 0) {
                        $.extend(css, {
                            'left': width - currentX + offsetLeft,
                            'top': height - currentY + offsetTop,
                            /*'max-width': currentX,*/
                            'max-height': currentY
                        });
                        maxWidth = currentX;
                    } else if ((deg / 270 > 0 && deg % 270 == 0) || (deg / 270 < 0 && deg % 270 != 0 && deg % 90 == 0)) {
                        if (width < height) {
                            $.extend(css, {
                                'left': positionYO + currentY + offsetLeft,
                                'top': positionXO + width - currentX + offsetTop,
                                /*'max-width': height - currentY,*/
                                'max-height': currentX
                            });
                        } else {
                            $.extend(css, {
                                'left': (width - height) / 2 + currentY + offsetLeft,
                                'top': width - currentX + offsetTop - positionXO,
                                /*'max-width': height - currentY,*/
                                'max-height': currentX
                            });
                        }
                        maxWidth = height - currentY;
                    } else if ((deg / 90 > 0 && deg % 270 != 0 && deg % 90 == 0) || (deg / 90 < 0 && deg % 270 == 0)) {
                        if (width < height) {
                            $.extend(css, {
                                'left': height - currentY + offsetLeft + positionYO,
                                'top': (height - width) / 2 + currentX + offsetTop,
                                /*'max-width': currentY,*/
                                'max-height': width - currentX
                            });
                        } else {
                            $.extend(css, {
                                'left': (width + height) / 2 - currentY + offsetLeft,
                                'top': currentX + offsetTop - positionXO,
                                /*'max-width': currentY,*/
                                'max-height': width - currentX
                            });
                        }
                        maxWidth = width - currentX;
                    }
                    $text.keyup(function (e) {
                        that.resizeTextarea(e, maxWidth);
                    }).css(css).appendTo(this.$canvasWrapper);
                    this.status.$currentText = $text;
                }
            }
        },
        mousemove: function(e) {
            var canvas = this.$canvas[0],
                context = canvas.getContext('2d'),
                bak_canvas = this.$bak_canvas[0],
                bak_context = bak_canvas.getContext('2d'),
                beginClientX = this.status.beginClientX,
                beginClientY = this.status.beginClientY,
                beginX = this.status.beginX,
                beginY = this.status.beginY,
                currentClientX = e.clientX,
                currentClientY = e.clientY,
                currentX = e.offsetX,
                currentY = e.offsetY,
                deg = this.status.deg,
                percent = this.status.percent;
            if(this.status.isDown) {
                if (this.status.type === 'line') {
                    bak_context.save();
                    bak_context.beginPath();
                    this.clearBakCanvas();
                    bak_context.lineWidth=2;
                    bak_context.strokeStyle = 'red';
                    bak_context.moveTo(beginX * percent, beginY * percent);
                    bak_context.lineTo(currentX * percent+9, currentY * percent+23);
                    bak_context.stroke();
                    bak_context.restore();
                }else if(this.status.type==='scrawl') {
                    bak_context.strokeStyle = '#ff0000';
                    bak_context.fillStyle  = '#ff0000';
                    bak_context.lineTo(currentX*percent, currentY*percent);
                    bak_context.stroke();
                }else if(this.status.type==='rect') {
                    bak_context.save();
                    var startX = beginX*percent,
                        startY = beginY*percent,
                        rectWidth,
                        rectHeight;
                    bak_context.beginPath();
                    this.clearBakCanvas();
                    if(e.shiftKey) {
                        if(currentX<beginX&&currentY>beginY) {
                            rectWidth = currentX-beginX;
                            rectHeight = currentY-beginY;
                            -rectWidth>rectHeight ? (rectHeight=-rectWidth) : (rectWidth=-rectHeight);
                        }else if(currentX>beginX&&currentY<beginY) {
                            rectWidth = currentX-beginX;
                            rectHeight = currentY-beginY;
                            rectWidth>-rectHeight ? (rectHeight=-rectWidth) : (rectWidth=-rectHeight);
                        }else {
                            rectWidth = rectHeight = (currentX>currentY?currentX-beginX:currentY-beginY)*percent;
                        }
                    }else {
                        rectWidth = (currentX-beginX)*percent;
                        rectHeight = (currentY-beginY)*percent;
                    }
                    bak_context.rect(startX, startY, rectWidth, rectHeight);
                    bak_context.stroke();
                    bak_context.restore();
                }else if(this.status.type==='circle') {
                    bak_context.save();
                    var startX = beginX*percent,
                        startY = beginY*percent,
                        _currentX = currentX*percent,
                        _currentY = currentY*percent;
                    bak_context.beginPath();
                    this.clearBakCanvas();
                    bak_context.arc(startX,startY,Math.sqrt((_currentX-startX)*(_currentX-startX)+(_currentY-startY)*(_currentY-startY)),0,2*Math.PI);
                    bak_context.stroke();
                    bak_context.restore();
                }
                if(this.status.type === 'move'&&this.status.isDrag) {
                    this.$canvasWrapper.scrollTop(this.status.scrollTop+beginClientY-currentClientY)
                        .scrollLeft(this.status.scrollLeft+beginClientX-currentClientX);
                }
            }
        },
        mouseup: function(e) {
            var status = this.status,
                type = status.type;
            if(type==='line'||type==='rect'||type==='circle'||type==='scrawl'||type==='yes') {
                this.drawToCanvas();
            }else if(type==='text'){
                $('#canvas-text').focus();
            }
            this.status.isDown = false;
            this.status.isDrag = false;
            this.status.scrollTop = this.$canvasWrapper[0].scrollTop;
            this.status.scrollLeft = this.$canvasWrapper[0].scrollLeft;
        },
        mouseout: function(e) {
            this.clearBakCanvas();
            this.status.isDrag = false;
            this.status.isDown = false;
            this.status.scrollTop = this.$canvasWrapper[0].scrollTop;
            this.status.scrollLeft = this.$canvasWrapper[0].scrollLeft;
        },
        // ---------------------
        clearBakCanvas: function() {
            var bak_canvas = this.$bak_canvas[0];
            var bak_context = bak_canvas.getContext('2d');
            bak_context.clearRect(0, 0, bak_canvas.width, bak_canvas.height);
        },
        saveCancelList: function() {
            this.status.cancelList.push(this.$canvas[0].toDataURL());
            this.status.cancelIndex = this.status.cancelList.length-1;
        },
        drawToCanvas: function() {
            var that = this,
                status = this.status,
                type = status.type,
                canvas = this.$canvas[0],
                context = canvas.getContext('2d'),
                bak_canvas = this.$bak_canvas[0],
                bak_context = bak_canvas.getContext('2d'),
                percent = this.status.percent,
                image = new Image();
            image.src = bak_canvas.toDataURL();
            image.onload = function(){
                context.drawImage(image , 0 ,0);
                that.clearBakCanvas();
                if(type==='line'||type==='rect'||type==='circle'||type==='scrawl'||type==='yes') {
                    that.saveCancelList();
                }
            }
        },
        size: function(flag) {
            var width = this.$canvas.width(),
                height = this.$canvas.height(),
                _width,
                _height,
                css;
            if(flag=='large') {
                _width = width ? width*2 : this.$canvas.attr('width')*2;
                _height = height ? height*2 : this.$canvas.attr('height')*2;
            }else if(flag=='small') {
                _width = width ? width/2 : this.$canvas.attr('width')/2;
                _height = height ? height/2 : this.$canvas.attr('height')/2;
            }
            css = {
                width: _width,
                height: _height
            };
            this.$canvas.css(css);
            this.$bak_canvas.css(css);
            this.reSetPosition();
        },
        rotate: function(flag) {
            var that = this,
                canvas = this.$canvas[0],
                width = this.$canvas.width(),
                height = this.$canvas.height(),
                context = canvas.getContext('2d'),
                bak_canvas = this.$bak_canvas[0],
                bak_context = bak_canvas.getContext('2d');
            flag=='right' ? this.status.deg += 90 : this.status.deg -= 90;
            this.$canvas.parent().css({
                transform: "rotate(" + this.status.deg + "deg)"
            });
            this.$bak_canvas.parent().css({
                transform: "rotate(" + this.status.deg + "deg)"
            });
            this.reSetPosition();
        },
        reSetPosition: function() {
            var width = this.$canvas.width(),
                height = this.$canvas.height(),
                wrapperWidth = this.$canvasWrapper.width(),
                wrapperHeight = this.$canvasWrapper.height(),
                css = {},
                positionXO = 0,
                positionYO = 0;
            if(this.status.deg%180==0) {
                css = {
                    left: width<wrapperWidth ? (wrapperWidth-width)/2 : 0,
                    top: height<wrapperHeight ? (wrapperHeight-height)/2 : 0
                };
            }else {
                positionXO = (height-width)/2;
                positionYO = (width-height)/2;
                css = {
                    left: height<wrapperWidth ? (wrapperWidth-height)/2+positionXO : positionXO,
                    top: width<wrapperHeight ? (wrapperHeight-width)/2+positionYO : positionYO,
                };
            }
            this.$canvas.parent().css(css);
            this.$bak_canvas.parent().css(css);
            this.status.percent = this.$canvas[0].width/width;
            /*var $canvas = this.$canvas,
             canvas = $canvas[0],
             $canvasWrapper = this.$canvasWrapper,
             width = $canvas.width(),
             height = $canvas.height(),
             wrapperWidth = $canvasWrapper.width(),
             wrapperHeight = $canvasWrapper.height(),
             left = (wrapperWidth - width) /2,
             top = (wrapperHeight - height)/2;
             css = {
             left: left,
             top: top
             };
             this.$canvas.parent().css(css);
             this.$bak_canvas.parent().css(css);*/
            this.$canvasWrapper.scrollTop(0).scrollLeft(0);
        },
        redo: function() {
            var canvas = this.$canvas[0],
                context = canvas.getContext('2d'),
                image = new Image(),
                url;
            if(this.status.cancelIndex<this.status.cancelList.length-1) {
                this.status.cancelIndex += 1;
                url = this.status.cancelList[this.status.cancelIndex];
                if(url) {
                    context.clearRect(0, 0, canvas.width, canvas.height);
                    image.src = url;
                    image.onload = function() {
                        context.drawImage(image , 0 ,0);
                    };
                }
            }
        },
        cancel: function() {
            var canvas = this.$canvas[0],
                context = canvas.getContext('2d'),
                image = new Image(),
                url;
            if(this.status.cancelIndex>0) {
                this.status.cancelIndex -= 1;
                url = this.status.cancelList[this.status.cancelIndex];
                if(url) {
                    //context.clearRect(0, 0, canvas.width, canvas.height);
                    image.src = url;
                    image.onload = function() {
                        context.drawImage(image , 0 ,0);
                    };
                }
            }
        },
        resizeTextarea: function(e, maxWidth) {
            var that = this,
                $el = $(e.currentTarget),
                val = $el.val(),
                content = val.split('\n'),
                contentCopy = [],
                maxContentWidth = 0,
                percent = this.status.percent;
            /*console.log('val: '+val);*/
            this.$_text.css({'font-size': 18/percent});
            for(var i=0,len=content.length; i<len; i++) {
                var row = content[i],
                    rowSplit = '',
                    perRow = '';
                this.$_text.html(row);
                if(this.$_text.outerWidth()>maxWidth) {
                    for(var j=0,rowLen=row.length; j<rowLen; j++) {
                        var c = row.charAt(j);
                        perRow += c;
                        this.$_text.html(perRow);
                        if(this.$_text.outerWidth()>maxWidth) {
                            rowSplit += '\n'+c;
                            perRow = c;
                        }else {
                            rowSplit += c;
                        }
                    }
                }else {
                    rowSplit = row;
                }
                rowSplit.split('\n').forEach(function(v, i) {
                    contentCopy.push(v);
                });
            }
            for(var i=0; i<contentCopy.length; i++) {
                var rowWidth = this.$_text.html(contentCopy[i]).outerWidth();
                maxContentWidth = rowWidth>maxContentWidth&&rowWidth<maxWidth ? rowWidth : maxContentWidth;
            }
            this.status.currentText = contentCopy;
            $el.width(maxContentWidth+1);
            $el[0].rows = contentCopy.length;
            this.$_text.html('');
        },
        fullscreen: function() {
            this.status.fullScreen = true;
            var docElm = document.documentElement;
            if (docElm.requestFullscreen) {
                docElm.requestFullscreen();
            }else if (docElm.msRequestFullscreen) {
                docElm.msRequestFullscreen();
            }else if (docElm.mozRequestFullScreen) {
                docElm.mozRequestFullScreen();
            }else if (docElm.webkitRequestFullScreen) {
                docElm.webkitRequestFullScreen();
            }
            self.$el.css({
                'position': 'fixed',
                'top' : '0px',
                'left' :'0px'
            })
            setTimeout(function(){
                $('.canvas_tool').css({
                    'width': document.body.clientWidth,
                    'height':document.body.clientHeight
                });
                self.reSetPosition();
            },200)
        },
        exitfullscreen: function() {
            this.status.fullScreen = false;
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            }else if (document.webkitCancelFullScreen) {
                document.webkitCancelFullScreen();
            }
            self.$el.css({
                'position': 'relative',
                'top' : '0px',
                'left' :'0px'
            })
            setTimeout(function(){
                $('.canvas_tool').css({
                    'width': self.setting.width,
                    'height':self.setting.height
                });
                $('.canvas-wrapper>div').css({
                    'left':'0px',
                    'top' :'0px'
                })
            },200)
        },
        initCss:function () {
            $('.canvas-wrapper>div').css({
                'left':'0px',
                'top' :'0px'
            })
        }
    });
}());

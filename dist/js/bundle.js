(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var interval = 400;
module.exports = {
    init: function init() {
        var _this = this;
        this.pages = $(".page");
        this.menubtns = $(".menu-btn");
        this.activePage = 0;
        this.doc = $("html,body");
        this.pageInterval = 0;
        this.resizeTimeout = 0;
        $("#pageBtn").on('click', function () {
            var el = _this.pages.eq(++_this.activePage);
            _this.gotoSection(el);
        });
        $("#upBtn").on('click', function () {
            _this.gotoSection(_this.pages.eq(0));
        });
        $(".menu-btn").on('click', function (e) {
            e.preventDefault();
            var link = $(this).data().link;
            var el = _this.pages.filter("#" + link);
            _this.gotoSection(el);
        });
        $(window).on('resize', this.resizeHandler.bind(this));
        this.bindInterval();
    },
    bindInterval: function bindInterval() {
        var _this = this;
        this.pageInterval = setInterval(function () {
            _this.pages.each(function () {
                if (this.offsetTop < $(window).scrollTop() + $(window).height() && this.offsetTop + this.offsetHeight >= $(window).scrollTop() + $(window).height()) {
                    _this.activePage = _this.pages.index(this);
                    _this.updateMenu(this);
                    if (_this.activePage == _this.pages.length - 1) {
                        $("#pageBtn").hide();
                    } else {
                        $("#pageBtn").show();
                    }
                    if (_this.activePage == 0) {
                        $("#upBtn").hide();
                    } else {
                        $("#upBtn").show();
                    }
                }
            });
        }, interval);
    },
    unbindInterval: function unbindInterval() {
        clearInterval(this.pageInterval);
    },
    resizeHandler: function resizeHandler() {
        var _this = this;
        clearTimeout(this.resizeTimeout);
        this.unbindInterval();
        this.resizeTimeout = setTimeout(function () {
            var el = _this.pages.eq(_this.activePage);
            _this.gotoSection(el);
        }, 500);
    },
    gotoSection: function gotoSection(section) {
        var _this = this;
        this.unbindInterval();
        var top = section.offset().top;
        this.doc.animate({ scrollTop: top }, '250', function () {
            _this.bindInterval();
        });
        _this.updateMenu(section.get(0));
    },
    updateMenu: function updateMenu(section) {
        this.menubtns.removeClass('active');
        if (section.id) {
            this.menubtns.filter('[data-link=' + section.id + ']').addClass('active');
        }
    }
};

},{}],2:[function(require,module,exports){
'use strict';

var Paging = require('./paging.js');

var clickInterval = 0;
$(function () {
    setTimeout(function () {
        $("#isketch").addClass('pop');
        setTimeout(function () {
            $("#seedo").addClass('show');
        }, 600);
    }, 1200);

    $("#navbtn").on('click', function () {
        clearInterval(clickInterval);
        $("#navmenu").toggleClass('active');
        clickInterval = setTimeout(function () {
            $("body").off('click').on('click', function (e) {
                if (e.target.id != 'navbtn') {
                    $("#navmenu").removeClass('active');
                    $("body").off('click');
                }
            });
        }, 100);
    });
    console.log("Paiging > ", Paging);
    Paging.init();
});

},{"./paging.js":1}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmNcXGpzXFxwYWdpbmcuanMiLCJzcmNcXGpzXFxzY3JpcHQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBLElBQU0sV0FBVyxHQUFqQjtBQUNBLE9BQU8sT0FBUCxHQUFpQjtBQUViLFFBRmEsa0JBRUw7QUFDSixZQUFJLFFBQVEsSUFBWjtBQUNBLGFBQUssS0FBTCxHQUFhLEVBQUUsT0FBRixDQUFiO0FBQ0EsYUFBSyxRQUFMLEdBQWdCLEVBQUUsV0FBRixDQUFoQjtBQUNBLGFBQUssVUFBTCxHQUFrQixDQUFsQjtBQUNBLGFBQUssR0FBTCxHQUFXLEVBQUUsV0FBRixDQUFYO0FBQ0EsYUFBSyxZQUFMLEdBQW9CLENBQXBCO0FBQ0EsYUFBSyxhQUFMLEdBQXFCLENBQXJCO0FBQ0EsVUFBRSxVQUFGLEVBQWMsRUFBZCxDQUFpQixPQUFqQixFQUEwQixZQUFXO0FBQ2pDLGdCQUFJLEtBQUssTUFBTSxLQUFOLENBQVksRUFBWixDQUFlLEVBQUUsTUFBTSxVQUF2QixDQUFUO0FBQ0Esa0JBQU0sV0FBTixDQUFrQixFQUFsQjtBQUNILFNBSEQ7QUFJQSxVQUFFLFFBQUYsRUFBWSxFQUFaLENBQWUsT0FBZixFQUF3QixZQUFXO0FBQy9CLGtCQUFNLFdBQU4sQ0FBa0IsTUFBTSxLQUFOLENBQVksRUFBWixDQUFlLENBQWYsQ0FBbEI7QUFDSCxTQUZEO0FBR0EsVUFBRSxXQUFGLEVBQWUsRUFBZixDQUFrQixPQUFsQixFQUEyQixVQUFTLENBQVQsRUFBWTtBQUNuQyxjQUFFLGNBQUY7QUFDQSxnQkFBSSxPQUFPLEVBQUUsSUFBRixFQUFRLElBQVIsR0FBZSxJQUExQjtBQUNBLGdCQUFJLEtBQUssTUFBTSxLQUFOLENBQVksTUFBWixDQUFtQixNQUFJLElBQXZCLENBQVQ7QUFDQSxrQkFBTSxXQUFOLENBQWtCLEVBQWxCO0FBQ0gsU0FMRDtBQU1BLFVBQUUsTUFBRixF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Q2hDLHNCQUFjLGFBQWQ7QUFDQSxVQUFFLFVBQUYsRUFBYyxXQUFkLENBQTBCLFFBQTFCO0FBQ0Esd0JBQWdCLFdBQVcsWUFBVztBQUNsQyxjQUFFLE1BQUYsRUFBVSxHQUFWLENBQWMsT0FBZCxFQUF1QixFQUF2QixDQUEwQixPQUExQixFQUFtQyxVQUFTLENBQVQsRUFBWTtBQUMzQyxvQkFBSSxFQUFFLE1BQUYsQ0FBUyxFQUFULElBQWEsUUFBakIsRUFBMkI7QUFDdkIsc0JBQUUsVUFBRixFQUFjLFdBQWQsQ0FBMEIsUUFBMUI7QUFDQSxzQkFBRSxNQUFGLEVBQVUsR0FBVixDQUFjLE9BQWQ7QUFDSDtBQUVKLGFBTkQ7QUFPSCxTQVJlLEVBUWIsR0FSYSxDQUFoQjtBQVVILEtBYkQ7QUFjQSxZQUFRLEdBQVIsQ0FBWSxZQUFaLEVBQTBCLE1BQTFCO0FBQ0EsV0FBTyxJQUFQO0FBQ0gsQ0F4QkQiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiY29uc3QgaW50ZXJ2YWwgPSA0MDA7XHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG4gICAgXHJcbiAgICBpbml0KCkgIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIHRoaXMucGFnZXMgPSAkKFwiLnBhZ2VcIik7XHJcbiAgICAgICAgdGhpcy5tZW51YnRucyA9ICQoXCIubWVudS1idG5cIik7XHJcbiAgICAgICAgdGhpcy5hY3RpdmVQYWdlID0gMDtcclxuICAgICAgICB0aGlzLmRvYyA9ICQoXCJodG1sLGJvZHlcIik7XHJcbiAgICAgICAgdGhpcy5wYWdlSW50ZXJ2YWwgPSAwO1xyXG4gICAgICAgIHRoaXMucmVzaXplVGltZW91dCA9IDA7XHJcbiAgICAgICAgJChcIiNwYWdlQnRuXCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBsZXQgZWwgPSBfdGhpcy5wYWdlcy5lcSgrK190aGlzLmFjdGl2ZVBhZ2UpO1xyXG4gICAgICAgICAgICBfdGhpcy5nb3RvU2VjdGlvbihlbCk7XHJcbiAgICAgICAgfSkgIFxyXG4gICAgICAgICQoXCIjdXBCdG5cIikub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIF90aGlzLmdvdG9TZWN0aW9uKF90aGlzLnBhZ2VzLmVxKDApKTtcclxuICAgICAgICB9KSAgXHJcbiAgICAgICAgJChcIi5tZW51LWJ0blwiKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgdmFyIGxpbmsgPSAkKHRoaXMpLmRhdGEoKS5saW5rO1xyXG4gICAgICAgICAgICB2YXIgZWwgPSBfdGhpcy5wYWdlcy5maWx0ZXIoXCIjXCIrbGluayk7XHJcbiAgICAgICAgICAgIF90aGlzLmdvdG9TZWN0aW9uKGVsKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgICQod2luZG93KS5vbigncmVzaXplJywgdGhpcy5yZXNpemVIYW5kbGVyLmJpbmQodGhpcykpO1xyXG4gICAgICAgIHRoaXMuYmluZEludGVydmFsKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgICAgIFxyXG4gICAgfSxcclxuICAgIGJpbmRJbnRlcnZhbCgpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIHRoaXMucGFnZUludGVydmFsID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIF90aGlzLnBhZ2VzLmVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5vZmZzZXRUb3A8JCh3aW5kb3cpLnNjcm9sbFRvcCgpKyQod2luZG93KS5oZWlnaHQoKVxyXG4gICAgICAgICAgICAgICAgICAgJiYgdGhpcy5vZmZzZXRUb3ArdGhpcy5vZmZzZXRIZWlnaHQ+PSQod2luZG93KS5zY3JvbGxUb3AoKSskKHdpbmRvdykuaGVpZ2h0KCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy5hY3RpdmVQYWdlID0gX3RoaXMucGFnZXMuaW5kZXgodGhpcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMudXBkYXRlTWVudSh0aGlzKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoX3RoaXMuYWN0aXZlUGFnZT09X3RoaXMucGFnZXMubGVuZ3RoLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJChcIiNwYWdlQnRuXCIpLmhpZGUoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoXCIjcGFnZUJ0blwiKS5zaG93KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChfdGhpcy5hY3RpdmVQYWdlPT0wKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoXCIjdXBCdG5cIikuaGlkZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJChcIiN1cEJ0blwiKS5zaG93KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0sIGludGVydmFsKVxyXG4gICAgICBcclxuICAgIH0sXHJcbiAgICB1bmJpbmRJbnRlcnZhbCgpIHtcclxuICAgICAgICBjbGVhckludGVydmFsKHRoaXMucGFnZUludGVydmFsKTtcclxuICAgIH0sXHJcbiAgICByZXNpemVIYW5kbGVyKCkge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMucmVzaXplVGltZW91dCk7XHJcbiAgICAgICAgdGhpcy51bmJpbmRJbnRlcnZhbCgpO1xyXG4gICAgICAgIHRoaXMucmVzaXplVGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGxldCBlbCA9IF90aGlzLnBhZ2VzLmVxKF90aGlzLmFjdGl2ZVBhZ2UpO1xyXG4gICAgICAgICAgICBfdGhpcy5nb3RvU2VjdGlvbihlbCk7XHJcbiAgICAgICAgfSwgNTAwKVxyXG4gICAgICAgIFxyXG4gICAgfSxcclxuICAgIGdvdG9TZWN0aW9uKHNlY3Rpb24pIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIHRoaXMudW5iaW5kSW50ZXJ2YWwoKTtcclxuICAgICAgICBsZXQgdG9wID0gc2VjdGlvbi5vZmZzZXQoKS50b3A7XHJcbiAgICAgICAgdGhpcy5kb2MuYW5pbWF0ZSh7IHNjcm9sbFRvcDogdG9wIH0sICcyNTAnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgX3RoaXMuYmluZEludGVydmFsKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgX3RoaXMudXBkYXRlTWVudShzZWN0aW9uLmdldCgwKSk7XHJcbiAgICB9LFxyXG4gICAgdXBkYXRlTWVudShzZWN0aW9uKSB7XHJcbiAgICAgICAgdGhpcy5tZW51YnRucy5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgaWYgKHNlY3Rpb24uaWQpIHtcclxuICAgICAgICAgICAgdGhpcy5tZW51YnRucy5maWx0ZXIoJ1tkYXRhLWxpbms9JytzZWN0aW9uLmlkKyddJykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ2YXIgUGFnaW5nID0gcmVxdWlyZSgnLi9wYWdpbmcuanMnKTtcclxuXHJcbnZhciBjbGlja0ludGVydmFsID0gMDtcclxuJChmdW5jdGlvbigpIHtcclxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgJChcIiNpc2tldGNoXCIpLmFkZENsYXNzKCdwb3AnKTtcclxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAkKFwiI3NlZWRvXCIpLmFkZENsYXNzKCdzaG93Jyk7XHJcbiAgICAgICAgfSwgNjAwKVxyXG4gICAgfSwgMTIwMClcclxuICAgIFxyXG4gICAgJChcIiNuYXZidG5cIikub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgY2xlYXJJbnRlcnZhbChjbGlja0ludGVydmFsKTtcclxuICAgICAgICAkKFwiI25hdm1lbnVcIikudG9nZ2xlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgIGNsaWNrSW50ZXJ2YWwgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAkKFwiYm9keVwiKS5vZmYoJ2NsaWNrJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGUudGFyZ2V0LmlkIT0nbmF2YnRuJykge1xyXG4gICAgICAgICAgICAgICAgICAgICQoXCIjbmF2bWVudVwiKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgJChcImJvZHlcIikub2ZmKCdjbGljaycpOyAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9KSAgICAgIFxyXG4gICAgICAgIH0sIDEwMClcclxuICAgICAgICBcclxuICAgIH0pXHJcbiAgICBjb25zb2xlLmxvZyhcIlBhaWdpbmcgPiBcIiwgUGFnaW5nKTtcclxuICAgIFBhZ2luZy5pbml0KCk7XHJcbn0pICJdfQ==

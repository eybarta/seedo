const interval = 400;
module.exports = {
    
    init()  {
        var _this = this;
        this.pages = $(".page");
        this.menubtns = $(".menu-btn");
        this.activePage = 0;
        this.doc = $("html,body");
        this.pageInterval = 0;
        this.resizeTimeout = 0;
        $("#pageBtn").on('click', function() {
            let el = _this.pages.eq(++_this.activePage);
            _this.gotoSection(el);
        })  
        $("#upBtn").on('click', function() {
            _this.gotoSection(_this.pages.eq(0));
        })  
        $(".menu-btn").on('click', function(e) {
            e.preventDefault();
            var link = $(this).data().link;
            var el = _this.pages.filter("#"+link);
            _this.gotoSection(el);
        })
        $(window).on('resize', this.resizeHandler.bind(this));
        this.bindInterval();
        
            
    },
    bindInterval() {
        var _this = this;
        this.pageInterval = setInterval(function() {
            _this.pages.each(function() {
                if (this.offsetTop<$(window).scrollTop()+$(window).height()
                   && this.offsetTop+this.offsetHeight>=$(window).scrollTop()+$(window).height()) {
                    _this.activePage = _this.pages.index(this);
                    _this.updateMenu(this);
                    if (_this.activePage==_this.pages.length-1) {
                        $("#pageBtn").hide();
                    }
                    else {
                        $("#pageBtn").show();
                    }
                    if (_this.activePage==0) {
                        $("#upBtn").hide();
                    }
                    else {
                        $("#upBtn").show();
                    }
                }
            })
        }, interval)
      
    },
    unbindInterval() {
        clearInterval(this.pageInterval);
    },
    resizeHandler() {
        var _this = this;
        clearTimeout(this.resizeTimeout);
        this.unbindInterval();
        this.resizeTimeout = setTimeout(function() {
            let el = _this.pages.eq(_this.activePage);
            _this.gotoSection(el);
        }, 500)
        
    },
    gotoSection(section) {
        var _this = this;
        this.unbindInterval();
        let top = section.offset().top;
        this.doc.animate({ scrollTop: top }, '250', function() {
            _this.bindInterval();
        });
        _this.updateMenu(section.get(0));
    },
    updateMenu(section) {
        this.menubtns.removeClass('active');
        if (section.id) {
            this.menubtns.filter('[data-link='+section.id+']').addClass('active');
        }
    }
}

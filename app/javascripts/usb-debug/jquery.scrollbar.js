(function(a){

    function b(b,c){

        function w(a){
            if(!(g.ratio>=1)){

                o.now=Math.min(i[c.axis]-j[c.axis],
                Math.max(0,o.start+((k?a.pageX:a.pageY)-p.start)));

                n=o.now*h.ratio;
                g.obj.css(l,-n);
                j.obj.css(l,o.now)

                c.handler(n);
            }
            return false
        }

        function v(b){
            a(document).unbind("mousemove",w);
            a(document).unbind("mouseup",v);
            j.obj.unbind("mouseup",v);
            document.ontouchmove=j.obj[0].ontouchend=document.ontouchend=null;
            return false
        }

        function u(b){
            if(!(g.ratio>=1)){
                var b=b||window.event;
                var d=b.wheelDelta?b.wheelDelta/120:-b.detail/3;n-=d*c.wheel;
                n=Math.min(g[c.axis]-f[c.axis],Math.max(0,n));

                j.obj.css(l,n/h.ratio);
                g.obj.css(l,-n);
                b=a.event.fix(b);

                b.preventDefault()

                c.handler(n);
            }
        }

        function t(b){

            p.start=k?b.pageX:b.pageY;

            var c=parseInt(j.obj.css(l));

            o.start=c=="auto"?0:c;

            a(document).bind("mousemove",w);


            document.ontouchmove=function(b){
                a(document).unbind("mousemove");

                w(b.touches[0])
            };

            a(document).bind("mouseup",v);

            j.obj.bind("mouseup",v);

            j.obj[0].ontouchend=document.ontouchend=function(b){
                a(document).unbind("mouseup");

                j.obj.unbind("mouseup");

                v(b.touches[0])
            };

            return false
        }

        function s(){

            j.obj.bind("mousedown",t);
            j.obj[0].ontouchstart=function(a){
                a.preventDefault();
                j.obj.unbind("mousedown");
                t(a.touches[0]);
                return false
            };

            i.obj.bind("mouseup",w);

            if(c.scroll&&this.addEventListener){
                e[0].addEventListener("DOMMouseScroll",u,false);

                e[0].addEventListener("mousewheel",u,false)
            }else if(c.scroll){

                e[0].onmousewheel=u
            }
        }

        function r(){

            j.obj.css(l,n/h.ratio);
            g.obj.css(l,-n);
            p["start"]=j.obj.offset()[l];

            var a=m.toLowerCase();

            h.obj.css(a,i[c.axis]);

            i.obj.css(a,i[c.axis]);

            j.obj.css(a,j[c.axis]);
        }

        function q(){
            d.update();
            s();
            return d
        }

        var d=this;
        var e=b;

        var f={
            obj:a(".view-box",b)
        };

        var g={obj:a(".overview",b)};

        var h={obj:a(".scrollbar",b)};

        var i={obj:a(".track",h.obj)};

        var j={obj:a(".thumb",h.obj)};

        var k=c.axis=="x",l=k?"left":"top",m=k?"Width":"Height";

        var n,o={start:0,now:0},
            p={};

        this.update=function(a){
                f[c.axis]=f.obj[0]["offset"+m];
                g[c.axis]=g.obj[0]["scroll"+m];
                g.ratio=f[c.axis]/g[c.axis];
                h.obj.toggleClass("disable",g.ratio>=1);
                i[c.axis]=c.size=="auto"?f[c.axis]:c.size;

                j[c.axis]=Math.min(i[c.axis],Math.max(0,c.sizethumb=="auto"?i[c.axis]*g.ratio:c.sizethumb));

                h.ratio=c.sizethumb=="auto"?g[c.axis]/i[c.axis]:(g[c.axis]-f[c.axis])/(i[c.axis]-j[c.axis]);

                n=a=="relative"&&g.ratio<=1?Math.min(g[c.axis]-f[c.axis],Math.max(0,n)):0;

                n=a=="bottom"&&g.ratio<=1?g[c.axis]-f[c.axis]:isNaN(parseInt(a))?n:parseInt(a);r()
        };

        this.getRatio = function () {
            return h.ratio;
        };

        this.updateN = function (left) {
            n = left;
        }

        return q();
    }


    //入口
    $.fn.scrollbar=function(opts){

        opts = $.extend({},$.fn.scrollbar.defaults,opts);

        var scrollbar = new b(a(this),opts)
        this.each(function(){
            $(this).data("mms-scroll",scrollbar);
        });

        return scrollbar;
    };


    //默认配置
    $.fn.scrollbar.defaults = {
        axis: "y",
        wheel: 40,
        scroll: true,
        size: "auto",
        sizethumb: "auto",
        handler : function () {}
    };

})(jQuery);
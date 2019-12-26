/*! Petslider.js v1.1
Author Juphet Vitualla
 */
(function ($, window, i) {
    $.fn.petslider = function (options) {
        // Default settings
        var settings = $.extend({
            "auto": true,             // Boolean: Animate automatically, true or false
            "speed": 500,             // Integer: Speed of the transition, in milliseconds
            "timeout": 4000,          // Integer: Time between slide transitions, in milliseconds
            "pager": false,          // pager nav set false as default
                 // Function: After callback
        }, options);
        return this.each(function () {
            var $this = $(this);
            let isInitialize = false;
            $this.addClass("petslider")
            let slide = $this.children();
            let len = slide.length;
            let el = slide[0];
            $(el).show()
            let slideindex = 0;
            executeSlides(0)
            if (settings.pager){
                const pager = `<div class="petPager">
                    <a href="javascript:;" class="petPrev">Prev</a>
                    <a href="javascript:;" class="petNext">Next</a>
                </div>`;
                $(pager).insertAfter($this);
                $(".petPrev").click(function(){
                    if (slideindex <= 0){
                        slideindex = len -1
                    }else{
                        slideindex--;
                    }   
                    executeSlides(slideindex)
                })
                $(".petNext").click(function () {
                    if (slideindex >= len -1) {
                        slideindex = 0
                    } else {
                        slideindex++;
                    }
                    executeSlides(slideindex)
                })
            }
            if (settings.sidebar) {
                $(document).on("click", '.sidebarCont a', function(){
                    let idx = $(this).attr("id").replace(/sidelink/, "");
                    executeSlides(idx)
                })
            }
            if(settings.auto){
                setInterval(() => {
                    if (slideindex == len) { slideindex = 0; }
                    executeSlides(slideindex)
                   
                    slideindex++;
                }, settings.timeout);
            }
            // execute slide function
            function executeSlides(idx){
                slide.hide()
                generateSidebar(idx)
                let el = slide[idx];
                $(el).fadeIn()
            }

            function generateSidebar(sindex){
                // has sidebar
                if (settings.sidebar) {
                    const genSideLink = function () {
                        let elm = '';
                        slide.map((idx, sl) => {
                            $imgSrc = $(sl).children("img").attr("src");
                            let isCurrent = (idx == sindex ? 'petsideCurrent' : '')
                            elm += `<a href='javascript:;' id="sidelink${idx}" class="${isCurrent}"" ><img src='${$imgSrc}' /></a>`
                        })
                        return elm;
                    }

                    let sidebar = `<div class="petSidebar">
                        <div class="sidebarCont">
                            ${genSideLink()}
                        </div>
                    </div>`;

                    if (!isInitialize) {
                        $(sidebar).insertAfter($this);
                        isInitialize = true;
                    }
                    else {

                        $(".petSidebar .sidebarCont").html(genSideLink());
                    }
                   
                }
                
            }

            // privte fn
            
        });

    };
})(jQuery, this, 0);
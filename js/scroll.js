(function() {
    var $body = document.body;
    var scrollY = 0;
    var elasticThreshold = 60;

    var velocity = 0;
    var animating = false;

    document.addEventListener('mousewheel', handleScroll);

    function handleScroll(e) {
        e.preventDefault();
        if(animating) {
            return false;
        }

        if(scrollY > 0) {
            var degrade = 1 - (scrollY / elasticThreshold);
            scrollY += e.deltaY * degrade * -1;
            if(e.deltaY === 0) {
                animating = true;
                $body.classList.add('animate');
                $body.style.transform = 'translate3d(0,0,0)';
                setTimeout(function() {
                    animating = false;
                    scrollY = 0;
                    $body.classList.remove('animate');
                }, 200);
                return false;
            }
        } else {
            scrollY += e.deltaY * -1;
        }

        $body.style.transform = 'translate3d(0,'+scrollY+'px,0)';
    }
})();

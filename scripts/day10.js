(function() {
    window.addEventListener('scroll', day10Scroll);
    function day10Scroll() {
        var today = document.querySelector('#day10');
        if (pageYOffset >= (today.offsetTop - today.offsetHeight) && pageYOffset < today.offsetTop + today.offsetHeight) {
            animateText();
        } else if (pageYOffset < (today.offsetTop - today.offsetHeight)) {
            if (today.classList.contains('animating')) {
                today.classList.remove('animating');
            }
        }
    }
    function animateText() {
        var today = document.querySelector('#day10');
        var text = today.querySelector('.text > p').innerHTML.replace(/<br>/g, '\n').split('');
        var lines = [];
        var line = 0;
        today.classList.add('animating');
        if (today.classList.contains('animated')) {
            return false;
        }
        today.classList.add('animated');
        today.querySelector('.text > p').innerHTML = '';
        for (var i = 0; i < text.length; i++) {
            var span;
            if (!text[i].match(/\n/g)) {
                span = document.createElement('span');
                span.classList.add('letter');
                span.style.animationDelay = (i/10)+'s';
                span.textContent = text[i].replace(/\s/, '\u00a0').replace(/\n/, '<br>');
                if(!lines[line]) {
                    lines[line] = document.createElement('div');
                    lines[line].classList.add('line-'+(line+1));
                }
                lines[line].appendChild(span);
                if (!text[i+1] || text[i+1].match(/\n/g)) {
                    today.querySelector('.text > p').appendChild(lines[line]);
                    line++;
                }
            }
        }
        var letters = today.querySelector('.text > p').children;
    }
})();

(function() {

    var days = document.getElementById('days').children;


    function CardStack(cards) {
        this.cards = cards;
        this.currentCard = 0;
        this.nextCard = 1;
        this.threshold = window.innerHeight / 2;
        this._animating = false;

        var self = this;
        var _cardsArr = Array.prototype.slice.call(this.cards);
        var scrollY = 0;
        var lastKnownDeltaY = 0;


        this.initViewport = function() {

            // Make the window nice and big to scroll
            var totalHeight = 0;
            _cardsArr.map(function(card) {
                totalHeight += card.offsetHeight;
            });
            document.body.style.height = totalHeight + 'px';

        }


        this.initStack = function() {

            // Set initial positions
            this.positionCards();

            // Move the first one up
            _cardsArr[0].style.top = 0;

            // Attach event handlers
            var wheelEvent = window.mousehweel ? 'mousewheel' : 'wheel';
            document.addEventListener(wheelEvent, this.handleMousewheel);
            window.addEventListener('resize', this.handleResize);

        }


        this.positionCards = function() {

            // Position cards below the fold that haven't been viewed yet
            _cardsArr.map(function(card, ix) {
                card.style.position = 'fixed';
                card.style.left = 0;
                if (ix > self.currentCard) {
                    card.style.top = window.innerHeight + 'px';
                }
            });

        }


        this.handleResize = function() {
            this.positionCards();
            this.initViewport();
        }


        this.handleMousewheel = function(e) {
            e.preventDefault();
            if (self._animating) {
                return false;
            }

            var scrollDirection;
            var nextCard = _cardsArr[self.nextCard];

            // Set scroll direction based on deltaY
            if (e.deltaY > 0) {
                scrollDirection = 'down';
            } else if (e.deltaY < 0) {
                scrollDirection = 'up';
            } else {
                return false;
            }

            // If scrolling down, move the card
            if (scrollDirection === 'down' && self.currentCard >= 0) {
                if(!nextCard) {
                    return false;
                }
                scrollY += e.deltaY * -1;
                nextCard.style.transform = 'translate3d(0,'+scrollY+'px,0)';
            }

            // If scrolling up, move the card
            if (scrollDirection === 'up' && scrollY <= 0) {
                scrollY += e.deltaY * -1;
                if(nextCard) {
                    nextCard.style.transform = 'translate3d(0,'+scrollY+'px,0)';
                }
            }

            // If the scrolling card hits the top of the window, start moving the next card
            if ((scrollY * -1) >= window.innerHeight && self.nextCard < _cardsArr.length) {
                nextCard.style.transform = 'translate3d(0,-'+window.innerHeight+'px,0)';
                self.currentCard++;
                self.nextCard++;
                scrollY = 0;
            }

            // If card is at top and next card isn't scrolled, start moving the previous card
            if (scrollY > 0 && self.currentCard > 0) {
                self.currentCard--;
                self.nextCard--;
                scrollY = window.innerHeight * -1;
            }

            // Get the end of the scroll
            console.log(e.deltaY);

            lastKnownDeltaY = e.deltaY;
        }


        this.initViewport();
        this.initStack();

    }

    var cs = new CardStack(days);

})();

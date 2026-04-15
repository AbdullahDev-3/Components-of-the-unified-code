document.addEventListener('DOMContentLoaded', function() {
            const container = document.getElementById('swipeContainer');
            const cards = Array.from(container.querySelectorAll('.swipe-card'));
            const dotsContainer = document.getElementById('swipeDots');
            let observer;

            function buildDots() {
            
                dotsContainer.innerHTML = '';
                
                const containerWidth = container.clientWidth;
                const cardWidth = cards[0].clientWidth;
                
            
                const cardsPerView = Math.max(1, Math.round(containerWidth / cardWidth));
                
              
                const totalDots = Math.max(0, cards.length - cardsPerView + 1);

              
                if (totalDots <= 1 || container.scrollWidth <= containerWidth + 10) {
                    dotsContainer.style.display = 'none';
                    return;
                } else {
                    dotsContainer.style.display = 'flex';
                }

             
                for (let i = 0; i < totalDots; i++) {
                    const dot = document.createElement('div');
                    dot.classList.add('swipe-dot');
                    if (i === 0) dot.classList.add('active');
                    
             
                    dot.addEventListener('click', () => {
                        if (cards[i]) {
                        
                            cards[i].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
                        }
                    });
                    
                    dotsContainer.appendChild(dot);
                }

                setupObserver(totalDots);
            }

            function setupObserver(totalDots) {
                if (observer) observer.disconnect();
                const dots = dotsContainer.querySelectorAll('.swipe-dot');
                let visibleCards = new Array(cards.length).fill(false);

             
                observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        const index = cards.indexOf(entry.target);
                        visibleCards[index] = entry.isIntersecting;
                    });
                    
            
                    const firstVisibleIndex = visibleCards.indexOf(true);
                    
                    if (firstVisibleIndex !== -1) {
                 
                        let activeDotIndex = firstVisibleIndex;
                        if (activeDotIndex >= totalDots) activeDotIndex = totalDots - 1;

                       
                        dots.forEach(d => d.classList.remove('active'));
                        if(dots[activeDotIndex]) dots[activeDotIndex].classList.add('active');
                    }
                }, {
                    root: container,
                   
                    threshold: 0.6 
                });

                cards.forEach(card => observer.observe(card));
            }

         
            buildDots();

           
            let resizeTimer;
            window.addEventListener('resize', () => {
                clearTimeout(resizeTimer);
                resizeTimer = setTimeout(buildDots, 150);
            });
        });
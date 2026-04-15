document.addEventListener('DOMContentLoaded', function() {
            const dropdowns = document.querySelectorAll('.ksa-custom-dropdown');
            
            dropdowns.forEach(dropdown => {
                const btnText = dropdown.querySelector('.ksa-placeholder-text');
                const items = dropdown.querySelectorAll('.dropdown-item');
                
                items.forEach(item => {
                    item.addEventListener('click', function(e) {
                        e.preventDefault(); 
                        
                        items.forEach(i => {
                            const checkIcon = i.querySelector('.ksa-check-icon');
                            if (checkIcon) checkIcon.classList.add('d-none');
                        });
                        
                        const myCheckIcon = this.querySelector('.ksa-check-icon');
                        if (myCheckIcon) myCheckIcon.classList.remove('d-none');

                        const textSpan = this.querySelector('span');
                        btnText.textContent = textSpan ? textSpan.textContent : this.textContent;
                        
                        btnText.style.color = 'var(--ksa-gray-900)';
                    });
                });
            });
        });
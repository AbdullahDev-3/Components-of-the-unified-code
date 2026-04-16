document.addEventListener('DOMContentLoaded', function() {
            
            // المتغيرات والمساعدات للتواريخ
            const today = new Date();
            const arabicMonths = ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"];

            // دالة مشتركة لتوليد وبناء قائمة السنوات المنسدلة
            function populateYearMenu(selectedYear, menuElement, onSelectCallback) {
                menuElement.innerHTML = '';
                const startYear = today.getFullYear() - 30; // من 30 سنة ماضية
                const endYear = today.getFullYear() + 20;   // إلى 20 سنة قادمة
                
                for (let y = startYear; y <= endYear; y++) {
                    const item = document.createElement('div');
                    item.className = `year-item ${y === selectedYear ? 'selected' : ''}`;
                    // النص على اليمين والصح على اليسار
                    item.innerHTML = `<span>${y}</span><i class="fas fa-check ms-2"></i>`;
                    
                    item.addEventListener('click', function(e) {
                        e.stopPropagation();
                        onSelectCallback(y);
                    });
                    
                    menuElement.appendChild(item);
                    
                    // تمرير تلقائي للسنة المحددة لتكون في منتصف القائمة
                    if (y === selectedYear) {
                        setTimeout(() => {
                            item.scrollIntoView({ block: 'center', inline: 'nearest' });
                        }, 10);
                    }
                }
            }


            // --- منتقي التاريخ المفرد ---
            const dateInput = document.getElementById('ksa-datepicker-input');
            const datePopup = document.getElementById('ksa-datepicker-popup');
            const daysGrid = document.getElementById('dp-days-grid');
            
            const dpYearBtn = document.getElementById('dp-year-btn');
            const dpYearMenu = document.getElementById('dp-year-menu');
            
            let currentMonth = today.getMonth(); 
            let currentYear = today.getFullYear();
            
            let selDate = null; 
            let selMonth = null;
            let selYear = null;

            // فتح/إغلاق التقويم
            dateInput.addEventListener('click', function(e) {
                e.stopPropagation();
                datePopup.classList.toggle('show');
                if(datePopup.classList.contains('show')) renderCalendar();
            });

            // فتح/إغلاق قائمة السنوات في التقويم المفرد
            dpYearBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                const isShowing = dpYearMenu.classList.contains('show');
                
                // إغلاق أي قائمة أخرى مفتوحة
                document.getElementById('rp-year-menu').classList.remove('show');
                
                if (!isShowing) {
                    dpYearMenu.classList.add('show');
                    populateYearMenu(currentYear, dpYearMenu, (newYear) => {
                        currentYear = newYear;
                        dpYearMenu.classList.remove('show');
                        renderCalendar(); // تحديث التقويم بناءً على السنة الجديدة
                    });
                } else {
                    dpYearMenu.classList.remove('show');
                }
            });

            // تنقل الأشهر
            document.getElementById('dp-prev').addEventListener('click', function() {
                currentMonth--;
                if(currentMonth < 0) { currentMonth = 11; currentYear--; }
                renderCalendar();
            });
            document.getElementById('dp-next').addEventListener('click', function() {
                currentMonth++;
                if(currentMonth > 11) { currentMonth = 0; currentYear++; }
                renderCalendar();
            });

            function renderCalendar() {
                document.getElementById('dp-month-name').textContent = arabicMonths[currentMonth];
                document.getElementById('dp-year').textContent = currentYear;
                
                const firstDay = new Date(currentYear, currentMonth, 1).getDay();
                const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
                const prevMonthDays = new Date(currentYear, currentMonth, 0).getDate();
                
                daysGrid.innerHTML = '';

               
        });
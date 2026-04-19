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

                // أيام من الشهر السابق
                for (let i = firstDay - 1; i >= 0; i--) {
                    const dayDiv = document.createElement('div');
                    dayDiv.className = 'dp-day muted';
                    dayDiv.textContent = prevMonthDays - i;
                    daysGrid.appendChild(dayDiv);
                }

                // أيام الشهر الحالي
                for (let i = 1; i <= daysInMonth; i++) {
                    const dayDiv = document.createElement('div');
                    dayDiv.className = 'dp-day';
                    dayDiv.textContent = i;
                    
                    if (i === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear()) {
                        dayDiv.classList.add('today');
                    }
                    
                    if (selDate !== null && i === selDate && currentMonth === selMonth && currentYear === selYear) {
                        dayDiv.classList.add('selected');
                    }

                    dayDiv.addEventListener('click', function() {
                        selDate = i;
                        selMonth = currentMonth;
                        selYear = currentYear;
                        dateInput.value = `${i} ${arabicMonths[currentMonth]} ${currentYear}`;
                        renderCalendar();
                        setTimeout(() => {
                            datePopup.classList.remove('show');
                            dpYearMenu.classList.remove('show');
                        }, 150);
                    });

                    daysGrid.appendChild(dayDiv);
                }

                // إكمال المربعات الفارغة للشهر التالي
                const totalCells = daysGrid.children.length;
                const remainingCells = 42 - totalCells; 
                for (let i = 1; i <= remainingCells; i++) {
                    const dayDiv = document.createElement('div');
                    dayDiv.className = 'dp-day muted';
                    dayDiv.textContent = i;
                    daysGrid.appendChild(dayDiv);
                }
            }
            renderCalendar();


            // --- منتقي نطاق التاريخ (الرينج) ---
            const rangeInput = document.getElementById('ksa-range-picker-input');
            const rangePopup = document.getElementById('ksa-range-picker-popup');
            const rpGrid = document.getElementById('rp-days-grid');
            
            const rpYearBtn = document.getElementById('rp-year-btn');
            const rpYearMenu = document.getElementById('rp-year-menu');
            
            let rpMonth = today.getMonth(); 
            let rpYear = today.getFullYear();
            
            let rangeStart = null; 
            let rangeEnd = null; 

            // دوال المساعدة للرينج
            function isSameDay(d1, d2) { return d1 && d2 && d1.getDate() === d2.getDate() && d1.getMonth() === d2.getMonth() && d1.getFullYear() === d2.getFullYear(); }
            function isBefore(d1, d2) { return d1 && d2 && d1.getTime() < d2.getTime(); }
            function isBetween(d, start, end) { return d && start && end && d.getTime() > start.getTime() && d.getTime() < end.getTime(); }

            // فتح/إغلاق تقويم الرينج
            rangeInput.addEventListener('click', function(e) {
                e.stopPropagation();
                rangePopup.classList.toggle('show');
                if(rangePopup.classList.contains('show')) renderRangeCalendar();
            });

            // فتح/إغلاق قائمة السنوات في تقويم الرينج
            rpYearBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                const isShowing = rpYearMenu.classList.contains('show');
                
                // إغلاق أي قائمة أخرى مفتوحة
                document.getElementById('dp-year-menu').classList.remove('show');
                
                if (!isShowing) {
                    rpYearMenu.classList.add('show');
                    populateYearMenu(rpYear, rpYearMenu, (newYear) => {
                        rpYear = newYear;
                        rpYearMenu.classList.remove('show');
                        renderRangeCalendar(); // تحديث التقويم
                    });
                } else {
                    rpYearMenu.classList.remove('show');
                }
            });

            // تنقل الأشهر
            document.getElementById('rp-prev').addEventListener('click', function() {
                rpMonth--;
                if(rpMonth < 0) { rpMonth = 11; rpYear--; }
                renderRangeCalendar();
            });
            document.getElementById('rp-next').addEventListener('click', function() {
                rpMonth++;
                if(rpMonth > 11) { rpMonth = 0; rpYear++; }
                renderRangeCalendar();
            });

            function renderRangeCalendar() {
                document.getElementById('rp-month-name').textContent = arabicMonths[rpMonth];
                document.getElementById('rp-year').textContent = rpYear;
                
                const firstDay = new Date(rpYear, rpMonth, 1).getDay();
                const daysInMonth = new Date(rpYear, rpMonth + 1, 0).getDate();
                const prevMonthDays = new Date(rpYear, rpMonth, 0).getDate();
                
                rpGrid.innerHTML = '';

                // أيام من الشهر السابق
                for (let i = firstDay - 1; i >= 0; i--) {
                    const cell = document.createElement('div');
                    cell.className = 'rp-cell';
                    const dayDiv = document.createElement('div');
                    dayDiv.className = 'rp-day muted';
                    dayDiv.textContent = prevMonthDays - i;
                    cell.appendChild(dayDiv);
                    rpGrid.appendChild(cell);
                }

                // أيام الشهر الحالي
                for (let i = 1; i <= daysInMonth; i++) {
                    const cell = document.createElement('div');
                    cell.className = 'rp-cell';
                    
                    const dayDiv = document.createElement('div');
                    dayDiv.className = 'rp-day';
                    dayDiv.textContent = i;
                    
                    const currentDate = new Date(rpYear, rpMonth, i);
                    
                    if (isSameDay(currentDate, today)) {
                        dayDiv.classList.add('today');
                    }
                    
                    if (isSameDay(currentDate, rangeStart)) {
                        dayDiv.classList.add('selected');
                        if (rangeEnd && !isSameDay(rangeStart, rangeEnd)) cell.classList.add('range-start');
                    } else if (isSameDay(currentDate, rangeEnd)) {
                        dayDiv.classList.add('selected');
                        cell.classList.add('range-end');
                    } else if (isBetween(currentDate, rangeStart, rangeEnd)) {
                        cell.classList.add('in-range');
                    }

                    dayDiv.addEventListener('click', function() {
                        const clickedDate = new Date(rpYear, rpMonth, i);

                        if (!rangeStart || (rangeStart && rangeEnd)) {
                            rangeStart = clickedDate;
                            rangeEnd = null;
                            rangeInput.value = `${i} ${arabicMonths[rpMonth]} ${rpYear} - ...`;
                        } else if (rangeStart && !rangeEnd) {
                            if (isBefore(clickedDate, rangeStart)) {
                                rangeStart = clickedDate; 
                                rangeInput.value = `${i} ${arabicMonths[rpMonth]} ${rpYear} - ...`;
                            } else {
                                rangeEnd = clickedDate; 
                                rangeInput.value = `${rangeStart.getDate()} ${arabicMonths[rangeStart.getMonth()]} ${rangeStart.getFullYear()} - ${rangeEnd.getDate()} ${arabicMonths[rangeEnd.getMonth()]} ${rangeEnd.getFullYear()}`;
                                setTimeout(() => {
                                    rangePopup.classList.remove('show');
                                    rpYearMenu.classList.remove('show');
                                }, 250);
                            }
                        }
                        renderRangeCalendar();
                    });

                    cell.appendChild(dayDiv);
                    rpGrid.appendChild(cell);
                }

                const totalCells = rpGrid.children.length;
                const remainingCells = 42 - totalCells; 
                for (let i = 1; i <= remainingCells; i++) {
                    const cell = document.createElement('div');
                    cell.className = 'rp-cell';
                    const dayDiv = document.createElement('div');
                    dayDiv.className = 'rp-day muted';
                    dayDiv.textContent = i;
                    cell.appendChild(dayDiv);
                    rpGrid.appendChild(cell);
                }
            }
            renderRangeCalendar();


            // --- إغلاق القوائم عند النقر في أي مكان آخر ---
            document.addEventListener('click', function(e) {
                // إغلاق التقويم المفرد
                if (!datePopup.contains(e.target) && e.target !== dateInput) {
                    datePopup.classList.remove('show');
                    dpYearMenu.classList.remove('show');
                }
                // إغلاق تقويم الرينج
                if (!rangePopup.contains(e.target) && e.target !== rangeInput) {
                    rangePopup.classList.remove('show');
                    rpYearMenu.classList.remove('show');
                }
                
                // إغلاق قائمة السنوات إذا تم النقر داخل التقويم ولكن خارج قائمة السنة
                if (datePopup.contains(e.target) && !dpYearBtn.contains(e.target) && !dpYearMenu.contains(e.target)) {
                    dpYearMenu.classList.remove('show');
                }
                if (rangePopup.contains(e.target) && !rpYearBtn.contains(e.target) && !rpYearMenu.contains(e.target)) {
                    rpYearMenu.classList.remove('show');
                }
            });

            // منع إغلاق التقويم عند النقر داخله
            datePopup.addEventListener('click', function(e) { e.stopPropagation(); });
            rangePopup.addEventListener('click', function(e) { e.stopPropagation(); });

        });
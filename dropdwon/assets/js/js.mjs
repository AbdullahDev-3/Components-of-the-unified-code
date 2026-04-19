document.addEventListener("click",function(t){if(t.target.classList.contains("dropdown-item")){t.target.closest(".dropdown-menu").querySelectorAll(".dropdown-item").forEach(t=>{t.classList.remove("active")}),t.target.classList.add("active");const e=t.target.closest(".dropdown").querySelector(".dropdown-toggle"),o=t.target.textContent.trim();e.querySelector(".selected-text").innerText=o}});document.addEventListener("DOMContentLoaded", function() {
    const dropdownItems = document.querySelectorAll('.custom-dropdown-menu .dropdown-item');
    const selectBtn = document.getElementById('dropdownMenuButton');

    dropdownItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            // تحديث نص الزر
            selectBtn.innerText = this.innerText.replace('✓', '').trim();
            
            // إزالة علامة الصح من الجميع وإضافتها للمختار
            dropdownItems.forEach(i => i.classList.remove('selected'));
            dropdownItems.forEach(i => {
                const check = i.querySelector('.check-mark');
                if(check) check.remove();
            });

            this.classList.add('selected');
            this.innerHTML += ' <span class="check-mark">✓</span>';
        });
    });
});
document.addEventListener("DOMContentLoaded", function() {
    const selectBox = document.getElementById('mySelectBox');
    const optionsList = document.getElementById('myOptionsList');
    const options = document.querySelectorAll('.my-option');
    const selectedText = document.getElementById('selected-text');

    // فتح وإغلاق القائمة
    selectBox.onclick = function(e) {
        e.stopPropagation();
        optionsList.classList.toggle('active');
    };

    // عند الضغط على أي خيار
    options.forEach(opt => {
        opt.onclick = function() {
            // 1. مسح علامات الصح القديمة من الكل
            options.forEach(el => {
                const check = el.querySelector('.check-mark-icon');
                if(check) check.remove();
            });

            // 2. إضافة علامة الصح للمختار فقط
            const checkSpan = document.createElement('span');
            checkSpan.className = 'check-mark-icon';
            checkSpan.innerText = '✓';
            this.appendChild(checkSpan);

            // 3. تحديث النص وإغلاق القائمة
            selectedText.innerText = this.innerText.replace('✓', '').trim();
            optionsList.classList.remove('active');
        };
    });

    // إغلاق القائمة إذا ضغطت في أي مكان بره
    document.onclick = function() {
        optionsList.classList.remove('active');
    };
});
document.addEventListener("DOMContentLoaded", function() {
    const trigger = document.getElementById('trigger');
    const menu = document.getElementById('menu');
    const items = document.querySelectorAll('.my-item');
    const textHolder = document.getElementById('text-holder');

    // فتح وإغلاق القائمة عند الضغط على المربع
    trigger.addEventListener('click', function(e) {
        e.stopPropagation();
        menu.classList.toggle('open');
    });

    // اختيار العنصر
    items.forEach(item => {
        item.addEventListener('click', function() {
            // 1. إزالة حالة النشاط من الكل (تخفي علامة الصح)
            items.forEach(i => i.classList.remove('active'));
            
            // 2. إضافة حالة النشاط للمختار (تظهر علامة الصح)
            this.classList.add('active');
            
            // 3. تحديث النص
            textHolder.innerText = this.innerText.replace('✓', '').trim();
            
            // 4. إغلاق القائمة
            menu.classList.remove('open');
        });
    });

    // إغلاق القائمة إذا ضغط المستخدم في أي مكان خارجها
    document.addEventListener('click', function() {
        menu.classList.remove('open');
    });
});// ننتظر تحميل الصفحة
document.addEventListener("DOMContentLoaded", function() {
    
    // الحصول على جميع الروابط داخل القائمة المنسدلة
    const dropdownItems = document.querySelectorAll('.dropdown-item');
    const dropdownButton = document.querySelector('.dropdown-toggle');

    dropdownItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault(); // منع الصفحة من القفز للأعلى

            // 1. إزالة حالة النشاط (علامة الصح) من الجميع
            dropdownItems.forEach(i => i.classList.remove('active'));

            // 2. إضافة حالة النشاط للعنصر المختار
            this.classList.add('active');

            // 3. تحديث نص الزر الرئيسي بنص العنصر المختار
            dropdownButton.innerText = this.innerText;
        });
    });
});
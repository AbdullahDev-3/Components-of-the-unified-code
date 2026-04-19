(function () {
    "use strict";

    // الوظيفة الأساسية لتشغيل المراقب
    const activateScrollSpy = () => {
        // 1. تحديد العنصر الذي يتم مراقبته (غالباً جسم الصفحة)
        const spyBody = document.body;
        
        // 2. تحديد القائمة الجانبية التي أرسلتها في الـ Canvas
        const targetNavId = '#sidebar-nav';
        const sidebarNav = document.querySelector(targetNavId);

        // التحقق من وجود القائمة قبل البدء لمنع الأخطاء
        if (!sidebarNav) {
            console.warn("ScrollSpy: لم يتم العثور على العنصر #sidebar-nav. تأكد من وجود الـ ID في الكود.");
            return;
        }

        // التأكد من أن مكتبة Bootstrap محملة
        if (typeof bootstrap === 'undefined') {
            console.error("ScrollSpy: مكتبة Bootstrap JS غير موجودة. يرجى التأكد من ربط ملف bootstrap.bundle.min.js أولاً.");
            return;
        }

        // 3. تهيئة بيئة العمل (يجب أن يكون الـ body بوضعية relative)
        spyBody.style.position = 'relative';

        try {
            // تنظيف أي نسخة قديمة موجودة لضمان إعادة التشغيل بشكل نظيف
            let scrollSpyInstance = bootstrap.ScrollSpy.getInstance(spyBody);
            if (scrollSpyInstance) {
                scrollSpyInstance.dispose();
            }

            // 4. إنشاء نسخة جديدة من ScrollSpy مع الإعدادات المثالية
            // الـ offset يحدد متى "يفهم" المتصفح أنك وصلت للقسم التالي (160 بكسل مسافة أمان)
            new bootstrap.ScrollSpy(spyBody, {
                target: targetNavId,
                offset: 160,
                smoothScroll: true
            });

            console.log("ScrollSpy: تم التفعيل والربط بنجاح.");
        } catch (error) {
            console.error("ScrollSpy Initialization Error:", error.message);
        }
    };

    // تشغيل الكود فور اكتمال تحميل الصفحة بالكامل لضمان دقة الأبعاد
    window.addEventListener('load', activateScrollSpy);

    // تحديث أبعاد المراقبة عند تغيير حجم النافذة (مهم للجوال)
    window.addEventListener('resize', () => {
        const instance = bootstrap?.ScrollSpy?.getInstance(document.body);
        if (instance) {
            instance.refresh();
        }
    });

})();
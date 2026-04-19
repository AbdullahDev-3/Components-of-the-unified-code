 <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>

    <script>
        // كود للتأكد من أن الـ ScrollSpy يعمل حتى لو تم تحميل الكود في بيئة معقدة
        window.addEventListener('DOMContentLoaded', () => {
            const spyElement = document.querySelector('body');
            const scrollSpy = bootstrap.ScrollSpy.getInstance(spyElement);
            if (scrollSpy) {
                scrollSpy.refresh();
            }
        });
    </script>
<script>
document.addEventListener("DOMContentLoaded", function () {

    const btn = document.querySelector(".copy-btn");
    const code = document.getElementById("code-content");

    if (btn && code) {
        btn.addEventListener("click", function () {

            const text = code.innerText;

            navigator.clipboard.writeText(text).then(() => {
                btn.innerText = "تم النسخ ✓";

                setTimeout(() => {
                    btn.innerText = "نسخ";
                }, 1500);
            });

        });
    }

});
</script>
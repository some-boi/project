$(document).ready(async function () {
    $('#login').click(async () => {
        window.location.href = 'login'
    })
    $('#join').click(async () => {
        window.location.href = 'join'
    })
    $('#verify').click(async () => {
        let method = "GET";
        let req = await fetch(`/api/verify`, {
            method,
            headers: {
                'Content-Type': 'application/json'
            },
        })
        req = await req.json();
        console.log(req)
        if (req.success && req.verified) {
            await Swal.fire({
                title: 'Success',
                icon: 'success',
                html:
                    `You were successfully Verified`,
                showCloseButton: true,
                focusConfirm: false,
                confirmButtonText: 'Close',
                confirmButtonAriaLabel: 'close',
            })
        } else if (req.success && !req.verified) {
            await Swal.fire({
                title: 'Error',
                icon: 'error',
                html:
                    `${req.message}`,
                showCloseButton: true,
                focusConfirm: false,
                confirmButtonText: 'Close',
                confirmButtonAriaLabel: 'close',
            })
        } else {
            let opts = {
                type: "error",
                text: req.message,
                theme: "sunset",
                timeout: 3500
            }
            new Noty(opts).show();
        }
    })
})
export const validEmail = async (value) => {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!value.match(mailformat)) {
        return false
    }
    else {
        return true
    }
}

export const registerWebOtp = async () => {
    if ('OTPCredential' in window) {
        window.addEventListener('DOMContentLoaded', e => {
             const input = document.querySelector('input[autocomplete="one-time-code"]');
             if (!input) return;
            const ac = new AbortController();
            navigator.credentials.get({
                otp: { transport: ['sms'] },
                signal: ac.signal
            }).then(otp => {
                input.value = otp.code;
                // alert(otp.code);
            }).catch(err => {
                alert(err);
            });
        })
    }
}

export const getQueryString =( field, url )=> {
    var href = url ? url : window.location.href;
    var reg = new RegExp( '[?&]' + field + '=([^&#]*)', 'i' );
    var string = reg.exec(href);
    return string ? string[1] : null;
}
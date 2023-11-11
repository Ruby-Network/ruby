function notifyBeta(value, functionToRun, defaulFunction) {
    Swal.fire({
        title: 'NOTICE',
        text: `${value} is currently in beta and may not work as expected.`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        color: 'var(--text-color)',
        background: 'var(--bg-color)',
        confirmButtonText: 'Continue',
    }).then((result) => {
        if (result.isConfirmed) {
        Swal.fire({
            title: 'OK!',
            text: `You are now using ${value}.`,
            icon: 'success',
            color: 'var(--text-color)',
            background: 'var(--bg-color)',
        }).then(() => {
            functionToRun();
        })
        }
        else {
            Swal.fire({
                title: 'Defaulting...',
                text: 'Defaulting to previously selected option',
                color: 'var(--text-color)',
                background: 'var(--bg-color)',
            }).then(() => {
                try {
                    defaulFunction();
                }
                catch {
                    console.log('No default function found');
                }
            })
        }
    })
}
function notifyWithConfirm(value, text, functionToRun, defaulFunction) {
    Swal.fire({
        title: 'NOTICE',
        text: `${value} ${text}`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        color: 'var(--text-color)',
        background: 'var(--bg-color)',
        confirmButtonText: 'Continue',
    }).then((result) => {
        if (result.isConfirmed) {
        Swal.fire({
            title: 'OK!',
            text: `You are now using ${value}.`,
            icon: 'success',
            color: 'var(--text-color)',
            background: 'var(--bg-color)',
        }).then(() => {
            functionToRun();
        })
        }
        else {
            Swal.fire({
                title: 'Defaulting...',
                text: 'Defaulting to previously selected option',
                color: 'var(--text-color)',
                background: 'var(--bg-color)',
            }).then(() => {
                try {
                    defaulFunction();
                }
                catch {
                    console.log('No default function found');
                }
            })
        }
    })
}

function promptCloakingNotify(defaulFunc, secFunc) {
    Swal.fire({
        title: 'About Blank/Blob Cloaking',
        text: `Select Between the two options`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        color: 'var(--text-color)',
        background: 'var(--bg-color)',
        confirmButtonText: 'About:Blank',
        cancelButtonText: 'Blob',
    }).then((result) => {
        if (result.isConfirmed) {
        Swal.fire({
            title: 'About Blank',
            text: `About Blank Cloaking is now enabled.`,
            icon: 'success',
            color: 'var(--text-color)',
            background: 'var(--bg-color)',
        }).then(() => {
            defaulFunc();
        })
        }
        else {
            Swal.fire({
                title: 'Blob',
                text: 'Blob Cloaking is now enabled',
                color: 'var(--text-color)',
                background: 'var(--bg-color)',
                icon: 'success',
            }).then(() => {
                try {
                    secFunc();
                }
                catch {
                    console.log('No default function found');
                }
            })
        }
    })
}

function settingsImportExportChoice(exportFunc, importFunc) {
    Swal.fire({
        title: 'Import/Export',
        text: `Select Between the two options`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        color: 'var(--text-color)',
        background: 'var(--bg-color)',
        confirmButtonText: 'Export',
        cancelButtonText: 'Import',
    }).then((result) => {
        if (result.isConfirmed) {
        Swal.fire({
            title: 'Export',
            text: `Exporting settings...`,
            icon: 'success',
            color: 'var(--text-color)',
            background: 'var(--bg-color)',
        }).then(() => {
            exportFunc();
        })
        }
        else {
            Swal.fire({
                title: 'Import',
                text: 'Importing settings...',
                color: 'var(--text-color)',
                background: 'var(--bg-color)',
                icon: 'success',
            }).then(() => {
                try {
                    importFunc();
                }
                catch {
                    console.log('No default function found');
                }
            })
        }
    })
}

function passwordPrompt() {
    Swal.fire({
        title: 'Password',
        input: 'password',
        inputLabel: 'Enter the password you want to set',
        inputPlaceholder: 'Enter the password you want to set',
        showCancelButton: true,
        confirmButtonText: 'Submit',
        color: 'var(--text-color)',
        background: 'var(--bg-color)',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        inputValidator: (value) => {
            if (!value) {
                return 'You need to write something!'
            }
        }
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: 'Password',
                text: `The password you set is: ${result.value} (Use ALT + L to lock)`,
                icon: 'success',
                color: 'var(--text-color)',
                background: 'var(--bg-color)',
            }).then(() => {
                localStorage.setItem('password', result.value);
            });
        }
        else { 
            Swal.fire({
                title: 'Password',
                text: `Cancelled`,
                icon: 'error',
                color: 'var(--text-color)',
                background: 'var(--bg-color)',
            })
        }
    }
    )
}

function passwordIsThere() {
    Swal.fire({
        title: 'Password',
        'text': 'Password is already set! Would you like to change it?',
        icon: 'error',
        color: 'var(--text-color)',
        background: 'var(--bg-color)',
        showCancelButton: true,
        confirmButtonText: 'Change',
        cancelButtonText: 'Cancel',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
    }).then((result) => {
        if (result.isConfirmed) {
            passwordPrompt();
        }
        else {
            Swal.fire({
                title: 'Password',
                text: `Password has not been changed`,
                icon: 'error',
                color: 'var(--text-color)',
                background: 'var(--bg-color)',
            })
        }
    })
}

function passwordLock() {
    if (localStorage.getItem('password') === null) {
        return Swal.fire({
            title: 'Password',
            text: `No password set!`,
            icon: 'error',
            color: 'var(--text-color)',
            background: 'var(--bg-color)',
            showCancelButton: true,
            confirmButtonText: 'Set a password',
            cancelButtonText: 'Cancel',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
        }).then((result) => {
            if (result.isConfirmed) {
                passwordPrompt();
            }
        })
    }
    localStorage.setItem('unlocked', false);
    Swal.fire({
        title: 'Password',
        input: 'password',
        inputLabel: 'Enter your password',
        inputPlaceholder: 'Enter your password',
        showCancelButton: false,
        confirmButtonText: 'Submit',
        color: 'var(--text-color)',
        background: 'var(--bg-color)',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        customClass: 'password-lock',
        inputValidator: (value) => {
            if (!value) {
                return 'You need to write something!'
            }
        }
    }).then((result) => {
        localStorage.setItem('unlocked', false); 
        if (result.isConfirmed && result.value === localStorage.getItem('password')) {
            Swal.fire({
                title: 'Password',
                text: `Correct Password!`,
                icon: 'success',
                color: 'var(--text-color)',
                background: 'var(--bg-color)',
            }).then(() => {
                localStorage.setItem('unlocked', true);
            });
        }
        else { 
            Swal.fire({
                title: 'Password',
                text: `Incorrect Password!`,
                icon: 'error',
                color: 'var(--text-color)',
                background: 'var(--bg-color)',
            }).then(() => {
                localStorage.setItem('unlocked', false);
                passwordLock();
            });
        }
    }
    )
}

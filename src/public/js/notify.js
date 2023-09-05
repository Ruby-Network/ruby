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

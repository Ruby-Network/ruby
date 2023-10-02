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

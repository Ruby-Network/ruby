async function getLatestRelease() {
    console.log('Fetching latest release...')
    let version = await fetch('https://api.github.com/repos/Ruby-Network/ruby/releases/latest').then((res) => res.json());
    console.log('Latest release fetched.')
    return version.tag_name;
}

export default getLatestRelease;
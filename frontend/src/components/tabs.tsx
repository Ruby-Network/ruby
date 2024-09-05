import Sortable, { MultiDrag } from "sortablejs";
import { CloseButton, AddButton } from "@components/icons";
import "@styles/tabs.scss";

interface TabsData {
    title: string;
    favicon: string;
}

const tabs = css`
    width: 100%;
    background: var(--bg-color);
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
`

const tabBar = css`
    width: 100%;
    height: 6rem;
    background: var(--text-bg-color);
    display: flex;
    flex-direction: column;
    padding: 4px 12px 0px 12px;
    overflow: hidden;
    align-items: center;
`

const tabContainer = css`
    height: 2rem;
    width: 99.99%;
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
`

const tabStyl = css`
    min-width: 2rem;
    max-width: 12rem;
    background: var(--input-bg-color);
    height: 2rem;
    border-radius: 5px;
    outline: none;
    border: none;
    display: flex;
    flex-direction: row;
    gap: 0.25rem;
    flex: 1 1 auto;
    justify-content: right;
    align-items: center;
    padding: 0.25rem 0.5rem;
    color: var(--text-color);
    white-space: nowrap;
    justify-content: flex-start;
    text-align: center;
`

const homeTabStyl = css`
    width: 2rem;
    background: var(--input-bg-color);
    height: 2rem;
    border-radius: 5px;
    outline: none;
    border: none;
    display: flex;
    flex-direction: row;
    gap: 0.25rem;
    justify-content: right;
    align-items: center;
    padding: 0.25rem 0.5rem;
    color: var(--text-color);
`

const tabClose = css`
    text-align: center;
    height: 15px;
    width: 15px;
    flex-shrink: 0;
`

const tabTitle = css`
    flex-grow: 1;
    text-align: left;
    font-size: 1rem;
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
    user-select: none;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
`

const tabFavicon = css`
    width: 15px;
    height: 15px;
`

const addTabButton = css`
    width: 15px;
    height: 15px;
`

const addTab = css`
    flex-grow: 1;
    height: 2rem;
    text-align: center;
    display: flex;
    justify-items: center;
    align-items: center;
    background: none;
    border: none;
    color: var(--text-color);
`

const tabContent = css`
    flex-grow: 1;
    width: 100%;
    height: 100%;
`

const baseButtonStyle = css`
    background: none;
    outline: none;
    border: none;
    color: var(--text-color);
`

const hideIt = css`
    visibility: hidden;
    display: none;
    width: 0;
    height: 0;
`

const iframe = css`
    width: 100%;
    height: 100%;
    border: none;
`

const navButtons = css`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`

const search = css`
    width: 80%;
    height: 2rem;
    border-radius: 1rem;
    outline: none;
    border: none;
    padding: 0 1rem;
    color: var(--text-color);
    font-size: 1rem;
    font-weight: semibold;
    background: var(--input-bg-color);
`

const searchHover = css`
    &:focus {
        border: 2px solid var(--border-color);
    }
`

const Tabs: Component<{}, {
    tabs: TabsData[], 
    createTab(title: string, favicon: string): void, 
    removeTab(idx: number): void, 
    createIframe(id: string): void,
    hideIframes(): void
}> = function() {
    this.tabs = [
        {title: "Home", favicon: "/favicon.ico"}
    ];
    this.hideIframes = () => {
        this.tabs.forEach((_tab, idx) => {
            if (idx !== 0) {
                const iframe = document.querySelector(`[data-iframe-id='${idx}']`) as HTMLIFrameElement;
                    if (!iframe.className.includes(hideIt)) {
                        iframe.classList.add(hideIt);
                    }
            }
        });
    }
    this.createIframe = (id: string) => {
        const iframeEl = document.createElement("iframe");
        const content = document.getElementById("content") as HTMLDivElement;
        iframeEl.dataset.iframeId = id;
        iframeEl.classList.add(iframe);
        iframeEl.classList.add(hideIt);
        iframeEl.src = "https://motortruck1221.com"
        content.append(iframeEl);
    }
    this.createTab = (title: string, favicon: string) => {
        this.hideIframes();
        const searchBar = document.getElementById("searchBar") as HTMLInputElement;
        console.log("Creating new tab...");
        console.log(this.tabs);
        this.createIframe(`${this.tabs.length}`);
        this.tabs = [...this.tabs, { title, favicon }];
        this.tabs = [...this.tabs];
        searchBar.value = "rh://home";
    }
    this.removeTab = (idx: number) => {
        this.tabs = this.tabs.filter((_tab, i) => i !== idx);
        this.tabs = [...this.tabs];
        if (!this.tabs.length) {
            this.createTab("New Tab", "/favicon.ico");
        }
    }
    this.mount = () => {
        const searchBar = this.root.querySelector("#searchBar") as HTMLInputElement;
        searchBar.value = "rh://home";
        Sortable.mount(new MultiDrag());
        new Sortable(this.root.querySelector("#tabs") as HTMLDivElement, {
            forceFallback: true,
            multiDrag: true,
            multiDragKey: 'CTRL',
            selectedClass: 'selectedTab',
            animation: 100,
            direction: "horizontal",
            dragClass: "drag",
            filter: '.ignore',
            draggable: '.allowDrag',
            onSort: (e) => {
                const oldI = e.oldIndex;
                const newI = e.newIndex;
                const movedI = this.tabs.splice(oldI as number, 1)[0];
                this.tabs.splice(newI as number, 0, movedI);
            },
            onChoose: (e) => {
                const iframe = document.querySelector(`[data-iframe-id='${e.item.dataset.tabId}']`) as HTMLIFrameElement;
                this.hideIframes();
                if (iframe.src) {
                    iframe.classList.remove(hideIt);
                }
            }
        });
    }
    return (
        <div class={tabs}>
            <div class={tabBar}>
                <div id="tabs" class={tabContainer}>
                    {use(this.tabs, (tabs) => tabs.map((tab: TabsData, idx: number) => (
                        <div data-tab-id={idx} class={[`${idx !== 0 ? "allowDrag" : "ignore"}`, `${idx !== 0 ? tabStyl: homeTabStyl}`]}>
                            <div class={tabTitle}>
                                <img class={tabFavicon} src={tab.favicon} />
                                {idx !== 0 ? (
                                    <p> {tab.title} </p>
                                ) : (
                                    <p class={hideIt}> This is hidden </p>
                                )}
                            </div>
                            {idx !== 0 ? (
                                <button on:click={() => this.removeTab(idx)} class={baseButtonStyle}>
                                    <CloseButton class={[tabClose, "ignore"]} />
                                </button>
                            ) : (<button class={hideIt}></button>)}
                        </div>
                        )), 
                    )}
                    <button on:click={() => this.createTab("New Tab", "/favicon.ico")} class={addTab}>
                        <AddButton class={addTabButton} />
                    </button>
                </div>
                <div class={navButtons}>
                    <input id="searchBar" placeholder="Search for something..." class={[search, searchHover]}></input>
                </div>
            </div>
            <div id="content" class={tabContent}>
            </div>
        </div>
    )
}

export default Tabs

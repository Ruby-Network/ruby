//the base style (used in the root div)
const baseStyle = css`
    width: 100%;
    height: 100%;
    min-height: 100%;
    background: #181a1b;
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    gap: 6px;
`;

//sets the styles for the dreamland logo
const img = css`
    width: 200px;
    height: 200px;
`;

//sets the styles for h1 tag ("Dreamland.js")
const title = css`
    font-size: 3.2em;
`;

//set the styles for the p tag ("edit something something to modify this page")
const getStarted = css`
    font-size: 1.2em;
`;

//sets the styles for the div the buttons are contained in
const buttonRow = css`
    display: flex;
    flex-direction: row;
    gap: 8px;
`;

//sets the styles for the button with the count in it
const counterButton = css`
    color: white;
    background: #9932b3;
    border: none;
    border-radius: 8px;
    font-size: 1em;
    padding: 0.6em 1.2em;
    cursor: pointer;
`;

//sets the styles for the link to the dreamland.js docs
const docsButton = css`
    color: white;
    background-color: #9932b3;
    border: none;
    border-radius: 8px;
    font-size: 1em;
    padding: 0.6em 1.2em;
    text-decoration: none;
`;

const Home: Component<
    {
        // component properties. if you had a component that took a property like `<Button text="..." /> you would use a type like the one in the following line
        // text: string
    },
    {
        // types for internal state
        counter: number;
    }
> = function () {
    this.counter = 0;
    return (
        <div class={baseStyle}>
            <img class={img} src="/logo.svg"></img>
            <h1 class={title}>Dreamland.js</h1>
            <p class={getStarted}>Edit src/routes/home.tsx to modfiy this page</p>
            <br />
            <div class={buttonRow}>
                <button class={counterButton} on:click={() => this.counter++}>
                    Count is: {use(this.counter)}
                </button>
                <a
                    class={docsButton}
                    href="https://dreamland.js.org/learn"
                    target="_blank"
                    rel="noreferrer noopener"
                >
                    Get Started
                </a>
            </div>
        </div>
    );
};

export default Home;

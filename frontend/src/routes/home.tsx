import Tabs from "@components/tabs";
const baseStyle = css`
    width: 100%;
    height: 100%;
`

const Home: Component<{}, {}> = function () {
    return (
        <div class={baseStyle}>
            <Tabs />
        </div>
    );
};

export default Home;

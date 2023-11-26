import { SignIn } from 'views';
import Head from 'next/head';

const Home = (): JSX.Element => {
    return (
        <div>
            <Head>
                <title>Task</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div>
            <SignIn />

            </div>
        </div>
    );
};

export default Home;

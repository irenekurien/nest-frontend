import Head from 'next/head';
import {Dashboard} from 'views';

const D = (): JSX.Element => {
    return (
        <div>
            <Head>
                <title>Task</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div>
                <Dashboard />
            </div>
        </div>
    );
};

export default D;

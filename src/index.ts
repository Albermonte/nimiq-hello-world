import type { Client, PlainStakingContract, PlainTransactionDetails } from '@nimiq/core-web';

let clientPromise: Promise<Client>;

const getNetworkClient = async () => {
    clientPromise = clientPromise || (async () => {
        const { ClientConfiguration, Client } = await import('@nimiq/core-web');

        const clientConfig = new ClientConfiguration();
        clientConfig.network('testalbatross');
        clientConfig.logLevel('debug');

        return Client.create(clientConfig.build());
    })();
    return clientPromise;
}


const client = await getNetworkClient();

client.addConsensusChangedListener((consensus) => {
    console.log('Consensus changed:', consensus);
    if (consensus === 'established') {
        // We are connected to the network and fully synced
        console.log('Consensus established!')
    }
});
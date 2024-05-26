import { WorldsProvider } from '../class/WorldsProvider';

export default (provider: WorldsProvider) => {
    provider.refresh();
};
import { CurrentPackProvider } from '../class/CurrentPackProvider';

export default (provider: CurrentPackProvider) => {
    provider.refresh();
};
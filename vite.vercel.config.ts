import config from './vite.config';

const { build, ...configWithoutBuild } = config;

export default configWithoutBuild;

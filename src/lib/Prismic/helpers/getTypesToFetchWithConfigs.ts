const getTypesToFetchWithConfigs = (types?: string[]) => ['website_config', 'website_modals', ...(types || [])];

export default getTypesToFetchWithConfigs;

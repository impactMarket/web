// -- Prismic Repo Name
const repoName = 'impact-market';

// -- Prismic API endpoint
// Determines which repository to query and fetch data from
// Configure your site's access point here
const apiEndpoint = `https://${repoName}.cdn.prismic.io/api/v2`;

// -- Access Token if the repository is not public
// Generate a token in your dashboard and configure it here if your repository is private
// eslint-disable-next-line no-process-env
const accessToken = process.env.PRISMIC_KEY;

// TODO
// -- Route Resolver rules
// Manages the url links to internal Prismic documents two levels deep (optionals)
// export const Router = {
//     routes: [
//         {
//             path: '/:uid',
//             type: 'page'
//         }
//     ]
// };
const Router = { routes: [] };

const prismicConfiguration = { accessToken, apiEndpoint, Router, repoName };

module.exports = prismicConfiguration;

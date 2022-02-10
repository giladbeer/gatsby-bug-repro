const path = require('path');

/**
 * generate breadcrumbs based on path
 * crumb label is page title
 * result is spread into createPage pageContext
 *
 * @param {*} slug (path)
 * @param {*} crumbLabelMapping - map of slugs to labels (page title)
 */
 const generateBreadcrumbs = (slug, crumbLabelMapping) => {
  let acc = '';
  let crumbs = [];
  const splitUrl = slug.split('/');

  splitUrl.forEach((split, index) => {
    if (index === 0 && split === '') {
      // root or 'home' section of path
      crumbs = [
        ...crumbs,
        {
          pathname: '/',
          label: 'Home'
        }
      ];
    } else if (index !== 0 && split !== '') {
      // remaining sections of path
      acc += `/${split}`;

      let label = split;
      // update crumbLabel for any crumbLabelMapping otherwise use path
      crumbLabelMapping.forEach((labelUpdate) => {
        if (labelUpdate.pathname === acc) {
          label = labelUpdate.label;
        }
      });

      crumbs = [
        ...crumbs,
        {
          pathname: acc,
          label
        }
      ];
    } else {
      // catch empty path sections
      crumbs = [...crumbs];
    }
  });

  const breadcrumbs = {
    location: slug,
    crumbs
  };

  return { breadcrumbs };
};

exports.createPages = async ({ actions }) => {
  const { createPage } = actions
  // discrete search results page
  createPage({
    path: '/search',
    component: path.resolve('./src/pages/Search.tsx'),
    context: {
      slug: '/search',
      pagePath: '/search',
      id: 'search',
      // inject breadcrumbs into page context with hardcoded values
      ...generateBreadcrumbs('/search', [
        { pathname: '/search', label: 'Search' }
      ])
    }
  });
}

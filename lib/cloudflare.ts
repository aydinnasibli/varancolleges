export async function getCloudflareAnalytics() {
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
  const token = process.env.CLOUDFLARE_API_TOKEN;

  if (!accountId || !token) {
    return { error: 'Cloudflare credentials not configured' };
  }

  const endpoint = `https://api.cloudflare.com/client/v4/graphql`;

  // The correct Cloudflare Web Analytics GraphQL query for visitors and pageviews
  const query = `
    query {
      viewer {
        accounts(filter: { accountTag: "${accountId}" }) {
          totals: rumPageloadEventsAdaptiveGroups(
            limit: 1,
            filter: {
              date_geq: "${new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}",
              date_leq: "${new Date().toISOString().split('T')[0]}"
            }
          ) {
            count
            sum {
              visits
            }
          }
          paths: rumPageloadEventsAdaptiveGroups(
            limit: 5,
            filter: {
              date_geq: "${new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}",
              date_leq: "${new Date().toISOString().split('T')[0]}"
            },
            orderBy: [count_DESC]
          ) {
            count
            dimensions {
              requestPath
            }
          }
          browsers: rumPageloadEventsAdaptiveGroups(
            limit: 5,
            filter: {
              date_geq: "${new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}",
              date_leq: "${new Date().toISOString().split('T')[0]}"
            },
            orderBy: [count_DESC]
          ) {
            count
            dimensions {
              userAgentBrowser
              userAgentOS
            }
          }
        }
      }
    }
  `;

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
      next: { revalidate: 3600 } // Cache for 1 hour
    });

    if (!response.ok) {
      console.error('Cloudflare API Error:', response.status, response.statusText);
      return { error: 'Failed to fetch analytics from Cloudflare' };
    }

    const data = await response.json();

    if (data.errors) {
      console.error('Cloudflare GraphQL Errors:', data.errors);
      return { error: `API Error: ${data.errors[0]?.message || 'GraphQL query failed'}` };
    }

    const account = data.data?.viewer?.accounts?.[0];

    if (!account || !account.totals || account.totals.length === 0) {
      return { data: { visits: 0, pageViews: 0, topPaths: [], topBrowsers: [] } };
    }

    const totals = account.totals[0];
    const topPaths = account.paths?.map((p: any) => ({
      path: p.dimensions.requestPath,
      views: p.count
    })) || [];

    const topBrowsers = account.browsers?.map((b: any) => ({
      browser: `${b.dimensions.userAgentBrowser} (${b.dimensions.userAgentOS})`,
      views: b.count
    })) || [];

    return {
      data: {
        visits: totals.sum?.visits || 0,
        pageViews: totals.count || 0,
        topPaths,
        topBrowsers
      }
    };
  } catch (error) {
    console.error('Error fetching Cloudflare analytics:', error);
    return { error: 'Network error fetching analytics' };
  }
}

const redirects = async () => {
  const internetExplorerRedirect = {
    destination: '/ie-incompatible.html',
    has: [
      {
        type: 'header',
        key: 'user-agent',
        value: '(.*Trident.*)', // all ie browsers
      },
    ],
    permanent: false,
    source: '/:path((?!ie-incompatible.html$).*)', // all pages except the incompatibility page
  }

  const redirects = [
    {
      destination: '/',
      permanent: true,
      source: '/home',
    },
    {
      destination: 'https://mehh.ee/:path*',
      has: [
        {
          type: 'host',
          value: 'www.mehh.ee',
        },
      ],
      permanent: true,
      source: '/:path*',
    },
    {
      destination: 'https://mehh.ee/:path*',
      has: [
        {
          key: 'x-forwarded-proto',
          type: 'header',
          value: 'http',
        },
      ],
      permanent: true,
      source: '/:path*',
    },
    internetExplorerRedirect,
  ]

  return redirects
}

export default redirects

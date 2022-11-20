import sanityClient from '@sanity/client' 

export const client = sanityClient({
  projectId: 'mv29shnl',
  dataset: 'production',
  apiVersion: '2022-03-25',
  token: 'sknPmTl7TMgApeUNqtmTWAqW9vS76JHcLR1gqx0ntlX6gm2w1cPeCgojwxNK5DRF85kXxQsvHy3mRzr9IjXDtDGWYkQXRQ5QgQAG2JIUavbVTECcsaBvG7728XELpVOI3zpxIyUl5ygXyRTMJdWEvINXPWDgNu7fSfbwINV4Sl0InmMwM0ig',
  useCdn: false,
});
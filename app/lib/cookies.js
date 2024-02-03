import cookie from 'cookie';

export const deleteAllCookies = (res) => {
  const cookies = Object.keys(res.cookies);
  cookies.forEach((cookieName) => {
    res.setHeader(
      'Set-Cookie',
      cookie.serialize(cookieName, '', {
        httpOnly: true,
        expires: new Date(0),
        path: '/',
      })
    );
  });
};
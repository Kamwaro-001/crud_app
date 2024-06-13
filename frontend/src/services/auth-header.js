export default function authHeader() {
  const user = JSON.parse(localStorage.getItem('token'))

  if (user) {
    return { Authorization: 'Bearer ' + user }
    // return { 'x-access-token': user}
  } else {
    return {
      message: `no token ${user}`
    }
  }
}

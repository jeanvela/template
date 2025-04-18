const urlBase = 'https://w3tpxmnq-3001.brs.devtunnels.ms/api/v1'

export async function  getQrClient(qrId: string | undefined) {
  let ok = false
  let data = null
  const url = `${urlBase}/${qrId}`
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })

    ok = response.status === 200
    data = await response.json()
  } catch (error) {
    console.log(error)
    ok = false
  }
  
  return { ok, data }
}

export async function updateQr (newStatus, id) {
  let ok = false
  let data = null
  const url = `${urlBase}/updateQR`
  try {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({newStatus, id}),
      headers: {
        'Content-Type': 'application/json',
      }
    })

    ok = response.status === 200
    data = await response.json()
  } catch (error) {
    console.log(error)
    ok = false
  }
  
  return { ok, data }
}
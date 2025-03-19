export async function getLatLonFromNaver(address: string) {
  const clientId = process.env.NEXT_PUBLIC_NAVER_CLIENT_ID;
  const clientSecret = process.env.NEXT_PUBLIC_NAVER_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error('네이버 API 키가 설정되지 않았습니다.');
  }

  const url = `https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode?query=${encodeURIComponent(address)}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'X-NCP-APIGW-API-KEY-ID': clientId,
      'X-NCP-APIGW-API-KEY': clientSecret
    }
  });

  const data = await response.json();

  if (data.addresses.length === 0) {
    console.warn(`${address}에 대한 좌표를 찾을 수 없음`);
    return { lat: null, lon: null };
  }

  const { y, x } = data.addresses[0];
  return { lat: parseFloat(y), lon: parseFloat(x) };
}

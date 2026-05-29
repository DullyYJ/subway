export default {
  async fetch(request) {
    const url = new URL(request.url);
    const stn = url.searchParams.get('stn') || '서울역';
    const KEY = 'fbdaeef19e93c7490ee53f87ae076ba752ff4fb89183d1e34d9798306d7b652d';
    const api = 'https://swopenapi.seoul.go.kr/api/subway/' + KEY + '/json/realtimeStationArrival/0/30/' + encodeURIComponent(stn);
    try {
      const res = await fetch(api);
      const data = await res.text();
      return new Response(data, {
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Access-Control-Allow-Origin': '*'
        }
      });
    } catch(e) {
      return new Response(JSON.stringify({error: e.message}), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }
  }
}
